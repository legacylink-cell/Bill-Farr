"""Tests for Bill Farr Photography /api/inquiries endpoints."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://wanderlust-gallery-8.preview.emergentagent.com").rstrip("/")


@pytest.fixture
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- Health / Root ---
def test_api_root(api_client):
    r = api_client.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    data = r.json()
    assert "message" in data
    assert "Bill Farr" in data["message"]


# --- POST /api/inquiries success + persistence ---
def test_create_inquiry_persists(api_client):
    unique = f"TEST_{uuid.uuid4().hex[:8]}"
    payload = {
        "name": f"{unique} Tester",
        "email": f"{unique}@example.com",
        "message": "Interested in booking a ranch shoot next spring.",
        "inquiry_type": "booking",
        "subject": "Ranch shoot inquiry",
    }
    r = api_client.post(f"{BASE_URL}/api/inquiries", json=payload)
    assert r.status_code in (200, 201), r.text
    body = r.json()

    # Assertions on returned entity
    assert "id" in body and isinstance(body["id"], str) and len(body["id"]) > 0
    assert body["name"] == payload["name"]
    assert body["email"] == payload["email"]
    assert body["message"] == payload["message"]
    assert body["inquiry_type"] == "booking"
    assert body["subject"] == "Ranch shoot inquiry"
    assert "created_at" in body
    # No mongo _id leakage
    assert "_id" not in body

    # GET list should include our record
    r2 = api_client.get(f"{BASE_URL}/api/inquiries")
    assert r2.status_code == 200
    items = r2.json()
    assert isinstance(items, list)
    assert any(i.get("id") == body["id"] and i.get("email") == payload["email"] for i in items), \
        "Created inquiry not found in list"
    # Ensure no _id in any listed item
    for it in items[:20]:
        assert "_id" not in it


def test_create_inquiry_with_phone_persists(api_client):
    """New for iteration 13: phone field is optional but must persist when supplied."""
    unique = f"TEST_{uuid.uuid4().hex[:8]}"
    phone = "+1-555-867-5309"
    payload = {
        "name": f"{unique} Phone",
        "email": f"{unique}@example.com",
        "message": "Please call me about a print order.",
        "inquiry_type": "print",
        "subject": "Print inquiry — phone",
        "phone": phone,
    }
    r = api_client.post(f"{BASE_URL}/api/inquiries", json=payload)
    assert r.status_code in (200, 201), r.text
    body = r.json()
    assert body.get("phone") == phone
    assert body["inquiry_type"] == "print"

    # Confirm via GET
    r2 = api_client.get(f"{BASE_URL}/api/inquiries")
    assert r2.status_code == 200
    items = r2.json()
    match = next((i for i in items if i.get("id") == body["id"]), None)
    assert match is not None, "Phone inquiry not found in list"
    assert match.get("phone") == phone


def test_create_inquiry_without_phone_defaults_none(api_client):
    unique = f"TEST_{uuid.uuid4().hex[:8]}"
    payload = {
        "name": f"{unique} NoPhone",
        "email": f"{unique}@example.com",
        "message": "no phone here",
    }
    r = api_client.post(f"{BASE_URL}/api/inquiries", json=payload)
    assert r.status_code in (200, 201)
    body = r.json()
    assert body.get("phone") is None


def test_create_inquiry_defaults_general(api_client):
    unique = f"TEST_{uuid.uuid4().hex[:8]}"
    payload = {
        "name": f"{unique} Default",
        "email": f"{unique}@example.com",
        "message": "General hello.",
    }
    r = api_client.post(f"{BASE_URL}/api/inquiries", json=payload)
    assert r.status_code in (200, 201), r.text
    body = r.json()
    assert body["inquiry_type"] == "general"
    assert body["subject"] is None


# --- Validation errors ---
def test_create_inquiry_invalid_email(api_client):
    payload = {
        "name": "TEST_Invalid",
        "email": "not-an-email",
        "message": "Hi",
    }
    r = api_client.post(f"{BASE_URL}/api/inquiries", json=payload)
    assert r.status_code == 422


def test_create_inquiry_missing_fields(api_client):
    r = api_client.post(f"{BASE_URL}/api/inquiries", json={"email": "a@b.com"})
    assert r.status_code == 422


def test_create_inquiry_empty_name(api_client):
    r = api_client.post(f"{BASE_URL}/api/inquiries", json={
        "name": "",
        "email": "a@b.com",
        "message": "hi",
    })
    assert r.status_code == 422


def test_create_inquiry_empty_message(api_client):
    r = api_client.post(f"{BASE_URL}/api/inquiries", json={
        "name": "TEST_x",
        "email": "a@b.com",
        "message": "",
    })
    assert r.status_code == 422


# --- GET /api/inquiries ---
def test_list_inquiries_sorted(api_client):
    r = api_client.get(f"{BASE_URL}/api/inquiries")
    assert r.status_code == 200
    items = r.json()
    assert isinstance(items, list)
    # If there are >=2 items, verify sort by created_at desc
    if len(items) >= 2:
        for a, b in zip(items, items[1:]):
            assert a["created_at"] >= b["created_at"]
