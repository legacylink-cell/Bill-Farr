"""Backend tests for Reviews/Testimonials + analytics image_open regression.
Each test class is self-contained (creates and cleans its own data) so tests
work under pytest-xdist loadscope scheduling.
"""
import os
import io
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://wanderlust-gallery-8.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"
KEY = "bill-insights-2026"

PNG_BYTES = bytes.fromhex(
    "89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c489"
    "0000000d49444154789c626001000000ffff03000006000557bfabd40000000049454e44ae426082"
)


def _create(name, with_photo=False):
    files = {"photo": ("t.png", io.BytesIO(PNG_BYTES), "image/png")} if with_photo else None
    data = {"name": name, "text": "TEST review body", "rating": "5", "location": "WY", "purchased": "Print"}
    r = requests.post(f"{API}/reviews", data=data, files=files, timeout=60)
    assert r.status_code == 200, r.text
    admin = requests.get(f"{API}/reviews/admin", params={"key": KEY}, timeout=30).json()
    match = [x for x in admin if x["name"] == name]
    assert match, f"created review '{name}' not found"
    return match[0]["id"]


def _delete(rid):
    try:
        requests.delete(f"{API}/reviews/{rid}", params={"key": KEY}, timeout=15)
    except Exception:
        pass


# --------------- CREATE ---------------
class TestReviewsCreate:
    def test_create_review_no_photo(self):
        rid = _create("TEST_alice_nophoto")
        try:
            admin = requests.get(f"{API}/reviews/admin", params={"key": KEY}, timeout=30).json()
            row = next(x for x in admin if x["id"] == rid)
            assert row["status"] == "pending"
            assert row["photo"] is None
            assert row["rating"] == 5
            assert row["location"] == "WY"
        finally:
            _delete(rid)

    def test_create_review_with_photo(self):
        rid = _create("TEST_bob_withphoto", with_photo=True)
        try:
            admin = requests.get(f"{API}/reviews/admin", params={"key": KEY}, timeout=30).json()
            row = next(x for x in admin if x["id"] == rid)
            assert row["photo"] == f"/api/reviews/{rid}/photo"
            # fetch photo bytes
            r = requests.get(f"{BASE_URL}{row['photo']}", timeout=30)
            assert r.status_code == 200
            assert len(r.content) > 0
            assert r.headers.get("content-type", "").startswith("image/")
        finally:
            _delete(rid)

    def test_photo_404_when_none(self):
        rid = _create("TEST_nophoto_404")
        try:
            r = requests.get(f"{API}/reviews/{rid}/photo", timeout=15)
            assert r.status_code == 404
        finally:
            _delete(rid)


# --------------- AUTH ---------------
class TestReviewsAdminAuth:
    def test_admin_wrong_key(self):
        assert requests.get(f"{API}/reviews/admin", params={"key": "wrong"}, timeout=15).status_code == 401

    def test_admin_missing_key(self):
        assert requests.get(f"{API}/reviews/admin", timeout=15).status_code == 422

    def test_admin_correct_key(self):
        r = requests.get(f"{API}/reviews/admin", params={"key": KEY}, timeout=30)
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_patch_wrong_key(self):
        rid = _create("TEST_patch_wrongkey")
        try:
            r = requests.patch(f"{API}/reviews/{rid}", json={"status": "approved"}, params={"key": "wrong"}, timeout=15)
            assert r.status_code == 401
        finally:
            _delete(rid)

    def test_delete_wrong_key(self):
        rid = _create("TEST_del_wrongkey")
        try:
            r = requests.delete(f"{API}/reviews/{rid}", params={"key": "wrong"}, timeout=15)
            assert r.status_code == 401
        finally:
            _delete(rid)


# --------------- VISIBILITY / MODERATION ---------------
class TestReviewsModeration:
    def test_public_hides_pending(self):
        rid = _create("TEST_pending_hide")
        try:
            pub = requests.get(f"{API}/reviews", timeout=15).json()
            assert rid not in {x["id"] for x in pub}
        finally:
            _delete(rid)

    def test_approve_with_reply_shows_public(self):
        rid = _create("TEST_approve_reply")
        try:
            r = requests.patch(
                f"{API}/reviews/{rid}",
                json={"status": "approved", "reply": "TEST_reply from Bill"},
                params={"key": KEY}, timeout=15,
            )
            assert r.status_code == 200
            pub = requests.get(f"{API}/reviews", timeout=15).json()
            match = [x for x in pub if x["id"] == rid]
            assert match, "approved review not visible publicly"
            assert match[0]["reply"] == "TEST_reply from Bill"
            assert match[0]["status"] == "approved"
        finally:
            _delete(rid)

    def test_reject_hides_from_public(self):
        rid = _create("TEST_reject_hide")
        try:
            requests.patch(f"{API}/reviews/{rid}", json={"status": "approved"}, params={"key": KEY}, timeout=15)
            assert rid in {x["id"] for x in requests.get(f"{API}/reviews", timeout=15).json()}
            r = requests.patch(f"{API}/reviews/{rid}", json={"status": "rejected"}, params={"key": KEY}, timeout=15)
            assert r.status_code == 200
            assert rid not in {x["id"] for x in requests.get(f"{API}/reviews", timeout=15).json()}
        finally:
            _delete(rid)

    def test_delete_removes(self):
        rid = _create("TEST_delete_ok")
        r = requests.delete(f"{API}/reviews/{rid}", params={"key": KEY}, timeout=15)
        assert r.status_code == 200
        admin = requests.get(f"{API}/reviews/admin", params={"key": KEY}, timeout=30).json()
        assert rid not in {x["id"] for x in admin}


# --------------- ANALYTICS REGRESSION ---------------
class TestAnalyticsImageOpenRegression:
    def test_image_open_and_summary_keys(self):
        label = "TEST_topimages_label_xyz"
        for _ in range(2):
            r = requests.post(f"{API}/analytics/track", json={"type": "image_open", "label": label}, timeout=15)
            assert r.status_code == 200
        summary = requests.get(f"{API}/analytics/summary", params={"key": KEY}, timeout=30)
        assert summary.status_code == 200
        j = summary.json()
        for k in ["speed", "viewsDaily", "topJournals", "topImages", "ctaClicks", "sectionReach", "inquiryTypes", "topCountries"]:
            assert k in j, f"missing key {k}"
        assert label in {x["label"] for x in j["topImages"]}
