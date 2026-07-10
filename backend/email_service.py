"""
Reusable transactional email helper for the Emergent managed email proxy.

Usage:
    from email_service import send_email
    await send_email(
        to="owner@business.com",
        subject="New inquiry from Jane",
        html="<h2>Hello</h2><p>...</p>",
        reply_to="jane@example.com",   # optional -> sets Reply-To
    )

Requires in .env:
    EMERGENT_EMAIL_KEY   (provisioned per-project by Emergent)
    EMAIL_FROM_NAME      (visible sender display name, e.g. "Bill Farr Photography")
"""
import os
import logging
import httpx
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger(__name__)

# Constant on purpose (NOT an env var) so it survives deployment.
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Website")


async def send_email(to: str, subject: str, html: str, reply_to: str | None = None) -> bool:
    """Send one HTML email. Returns True on success, False otherwise (never raises)."""
    if not EMAIL_KEY:
        logger.warning("EMERGENT_EMAIL_KEY missing — email not sent")
        return False

    payload = {
        "to": [to],
        "subject": subject,
        "html": html,
        "from_name": EMAIL_FROM_NAME,   # REQUIRED on every send
    }
    if reply_to:
        payload["contact_email"] = reply_to   # maps to the Reply-To header

    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()   # success = 202 Accepted
        logger.info("Email sent to %s", to)
        return True
    except Exception as e:
        logger.error("Email send failed: %s", e)
        return False
