from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
from bson import ObjectId
from pydantic import BeforeValidator
from typing_extensions import Annotated
import uuid
import httpx
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Bill Farr Photography")
BILL_EMAIL = "bill@billfarrphotography.com"
ANALYTICS_KEY = os.environ.get("ANALYTICS_KEY")
# Referrer hosts to exclude from analytics (internal dev/editor traffic)
EXCLUDED_REFERRERS = ("emergent",)


def _is_internal_ref(referrer: str, ref_host: str) -> bool:
    hay = f"{referrer or ''} {ref_host or ''}".lower()
    return any(x in hay for x in EXCLUDED_REFERRERS)

app = FastAPI(title="Bill Farr Photography API")
api_router = APIRouter(prefix="/api")


def _oid(v):
    if isinstance(v, ObjectId):
        return str(v)
    return v


PyObjectId = Annotated[str, BeforeValidator(_oid)]


class Inquiry(BaseModel):
    model_config = ConfigDict(populate_by_name=True, extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    message: str
    inquiry_type: str = "general"  # general | booking | print
    subject: Optional[str] = None
    phone: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class InquiryCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=4000)
    inquiry_type: str = "general"
    subject: Optional[str] = None
    phone: Optional[str] = Field(default=None, max_length=40)


async def send_inquiry_email(inquiry: "Inquiry"):
    if not EMAIL_KEY:
        logger.warning("EMERGENT_EMAIL_KEY missing — skipping inquiry email")
        return
    type_label = {"booking": "Booking", "print": "Print purchase", "general": "General"}.get(
        inquiry.inquiry_type, inquiry.inquiry_type.title()
    )
    subject = f"New {type_label} inquiry from {inquiry.name}"
    rows = [
        ("Name", inquiry.name),
        ("Email", inquiry.email),
        ("Phone", inquiry.phone or "—"),
        ("Type", type_label),
        ("Subject", inquiry.subject or "—"),
    ]
    detail = "".join(
        f'<tr><td style="padding:6px 16px 6px 0;color:#5C534D;font-size:13px;white-space:nowrap;vertical-align:top;">{k}</td>'
        f'<td style="padding:6px 0;color:#2A2421;font-size:14px;">{v}</td></tr>'
        for k, v in rows
    )
    html = f"""
    <div style="background:#F5F2EB;padding:32px;font-family:Arial,Helvetica,sans-serif;">
      <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #eee;">
        <tr><td style="padding:28px 28px 8px;">
          <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#B25E42;">Bill Farr Photography</div>
          <h2 style="margin:8px 0 20px;color:#2A2421;font-weight:normal;">{subject}</h2>
          <table role="presentation">{detail}</table>
          <div style="margin:20px 0 6px;color:#5C534D;font-size:13px;">Message</div>
          <div style="color:#2A2421;font-size:15px;line-height:1.6;white-space:pre-wrap;">{inquiry.message}</div>
          <p style="margin-top:24px;color:#8a8078;font-size:12px;">Reply to this email to respond directly to {inquiry.name}.</p>
        </td></tr>
      </table>
    </div>
    """
    payload = {
        "to": [BILL_EMAIL],
        "subject": subject,
        "html": html,
        "from_name": EMAIL_FROM_NAME,
        "contact_email": str(inquiry.email),
    }
    try:
        async with httpx.AsyncClient(timeout=30) as http_client:
            resp = await http_client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        logger.info("Inquiry email sent to %s", BILL_EMAIL)
    except Exception as e:
        logger.error("Inquiry email failed: %s", e)


@api_router.get("/")
async def root():
    return {"message": "Bill Farr Photography API"}


@api_router.post("/inquiries", response_model=Inquiry)
async def create_inquiry(payload: InquiryCreate):
    inquiry = Inquiry(**payload.model_dump())
    await db.inquiries.insert_one(inquiry.model_dump())
    logger.info("New %s inquiry from %s", inquiry.inquiry_type, inquiry.email)
    await send_inquiry_email(inquiry)
    return inquiry


@api_router.get("/inquiries", response_model=List[Inquiry])
async def list_inquiries():
    docs = await db.inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [Inquiry(**d) for d in docs]


class TrackEvent(BaseModel):
    type: str = "pageview"
    path: Optional[str] = None
    referrer: Optional[str] = None


@api_router.post("/analytics/track")
async def track_event(ev: TrackEvent, request: Request):
    from urllib.parse import urlparse
    ua = request.headers.get("user-agent", "")
    device = "mobile" if ("Mobi" in ua or "Android" in ua) else "desktop"
    ref_host = urlparse(ev.referrer or "").netloc or "direct"
    if _is_internal_ref(ev.referrer or "", ref_host):
        return {"ok": True, "skipped": True}
    await db.analytics.insert_one({
        "type": ev.type,
        "path": ev.path or "/",
        "ref_host": ref_host,
        "device": device,
        "ts": datetime.now(timezone.utc).isoformat(),
    })
    return {"ok": True}


@api_router.get("/analytics/summary")
async def analytics_summary(key: str):
    if not ANALYTICS_KEY or key != ANALYTICS_KEY:
        raise HTTPException(status_code=401, detail="Invalid access key")
    docs = await db.analytics.find({}, {"_id": 0}).to_list(200000)
    # Exclude any internal/dev referrers (e.g. the Emergent editor) retroactively
    docs = [d for d in docs if not _is_internal_ref("", d.get("ref_host", ""))]
    now = datetime.now(timezone.utc)
    views = [d for d in docs if d.get("type") == "pageview"]
    inquiries = [d for d in docs if d.get("type") == "inquiry"]

    def within(days, items):
        cutoff = now.timestamp() - days * 86400
        n = 0
        for d in items:
            try:
                if datetime.fromisoformat(d["ts"]).timestamp() >= cutoff:
                    n += 1
            except Exception:
                pass
        return n

    refs = {}
    for d in views:
        h = d.get("ref_host", "direct") or "direct"
        refs[h] = refs.get(h, 0) + 1
    top = sorted(refs.items(), key=lambda x: -x[1])[:6]

    mobile = sum(1 for d in views if d.get("device") == "mobile")
    total_views = len(views)
    conversion = round((len(inquiries) / total_views) * 100, 1) if total_views else 0.0

    return {
        "totals": {"views": total_views, "inquiries": len(inquiries), "conversion": conversion},
        "last7": within(7, views),
        "last30": within(30, views),
        "topReferrers": [{"host": h, "count": c} for h, c in top],
        "devices": {"mobile": mobile, "desktop": total_views - mobile},
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
