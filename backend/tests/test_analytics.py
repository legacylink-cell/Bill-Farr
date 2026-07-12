"""Tests for Bill Farr Photography analytics endpoints (iteration 14)."""
import os
import pytest
import requests

BASE_URL = os.environ.get(
    "REACT_APP_BACKEND_URL",
    "https://wanderlust-gallery-8.preview.emergentagent.com",
).rstrip("/")

ANALYTICS_KEY = "bill-insights-2026"


@pytest.fixture
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- POST /api/analytics/track ---
def test_track_pageview_returns_ok(api_client):
    r = api_client.post(
        f"{BASE_URL}/api/analytics/track",
        json={"type": "pageview", "path": "/", "referrer": "https://instagram.com/"},
    )
    assert r.status_code == 200, r.text
    body = r.json()
    assert body == {"ok": True}


def test_track_inquiry_returns_ok(api_client):
    r = api_client.post(
        f"{BASE_URL}/api/analytics/track",
        json={"type": "inquiry"},
    )
    assert r.status_code == 200, r.text
    assert r.json() == {"ok": True}


def test_track_defaults(api_client):
    """Empty body should still accept and use default type=pageview."""
    r = api_client.post(f"{BASE_URL}/api/analytics/track", json={})
    assert r.status_code == 200
    assert r.json() == {"ok": True}


# --- GET /api/analytics/summary ---
def test_summary_wrong_key_returns_401(api_client):
    r = api_client.get(f"{BASE_URL}/api/analytics/summary", params={"key": "totally-wrong"})
    assert r.status_code == 401
    body = r.json()
    assert "detail" in body


def test_summary_missing_key_returns_422(api_client):
    r = api_client.get(f"{BASE_URL}/api/analytics/summary")
    # key is a required query param
    assert r.status_code in (401, 422)


def test_summary_correct_key_shape(api_client):
    r = api_client.get(
        f"{BASE_URL}/api/analytics/summary", params={"key": ANALYTICS_KEY}
    )
    assert r.status_code == 200, r.text
    data = r.json()
    # Shape assertions
    assert "totals" in data and isinstance(data["totals"], dict)
    for k in ("views", "inquiries", "conversion"):
        assert k in data["totals"], f"missing totals.{k}"
    assert "last7" in data and isinstance(data["last7"], int)
    assert "last30" in data and isinstance(data["last30"], int)
    assert "topReferrers" in data and isinstance(data["topReferrers"], list)
    assert "devices" in data and isinstance(data["devices"], dict)
    assert set(data["devices"].keys()) == {"mobile", "desktop"}
    # numeric types
    assert isinstance(data["totals"]["views"], int)
    assert isinstance(data["totals"]["inquiries"], int)
    assert isinstance(data["totals"]["conversion"], (int, float))


def test_pageview_increments_totals(api_client):
    """Firing a pageview should increment views count in summary."""
    before = api_client.get(
        f"{BASE_URL}/api/analytics/summary", params={"key": ANALYTICS_KEY}
    ).json()
    v0 = before["totals"]["views"]

    # Include a unique referrer host to also verify topReferrers aggregation
    unique_host = "https://test-referrer-analytics.example.com/"
    for _ in range(3):
        r = api_client.post(
            f"{BASE_URL}/api/analytics/track",
            json={"type": "pageview", "path": "/", "referrer": unique_host},
        )
        assert r.status_code == 200

    after = api_client.get(
        f"{BASE_URL}/api/analytics/summary", params={"key": ANALYTICS_KEY}
    ).json()
    assert after["totals"]["views"] >= v0 + 3, (
        f"views did not increment: before={v0}, after={after['totals']['views']}"
    )

    # topReferrers should include our host
    hosts = [r["host"] for r in after["topReferrers"]]
    assert "test-referrer-analytics.example.com" in hosts


def test_inquiry_increments_inquiries(api_client):
    before = api_client.get(
        f"{BASE_URL}/api/analytics/summary", params={"key": ANALYTICS_KEY}
    ).json()
    i0 = before["totals"]["inquiries"]

    r = api_client.post(f"{BASE_URL}/api/analytics/track", json={"type": "inquiry"})
    assert r.status_code == 200

    after = api_client.get(
        f"{BASE_URL}/api/analytics/summary", params={"key": ANALYTICS_KEY}
    ).json()
    assert after["totals"]["inquiries"] >= i0 + 1


def test_summary_device_detection(api_client):
    """A request with a mobile UA should be attributed to devices.mobile."""
    before = api_client.get(
        f"{BASE_URL}/api/analytics/summary", params={"key": ANALYTICS_KEY}
    ).json()
    m0 = before["devices"]["mobile"]

    r = requests.post(
        f"{BASE_URL}/api/analytics/track",
        json={"type": "pageview", "path": "/", "referrer": ""},
        headers={
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Linux; Android 13; Pixel 7) Mobi Safari/537.36",
        },
    )
    assert r.status_code == 200

    after = api_client.get(
        f"{BASE_URL}/api/analytics/summary", params={"key": ANALYTICS_KEY}
    ).json()
    assert after["devices"]["mobile"] >= m0 + 1
