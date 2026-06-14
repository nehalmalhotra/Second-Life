"""
app.py — Second Life Commerce backend (v4 contract). Person 1's deliverable.

Endpoints (all independent — the frontend decides the calling order):
    POST /analyze-product            condition + routing (the one Bedrock call)
    POST /compare                    driver fraud check (hardcoded 91/confirmed)
    POST /generate-listing           ALL pricing + listing assembly (no AI)
    POST /match-buyers               weighted buyer ranking (no AI)
    POST /notify                     mark top buyer's pending notification
    GET  /notify-status/{buyer_id}   buyer frontend polls this every 3 seconds

DEMO FLOW (frontend orchestration — backend works regardless of timing):
    Screen 2 -> /analyze-product then /generate-listing (to show grade + price)
    [Rahul confirms] -> Screen 3 -> /compare
    after Screen 3 -> /match-buyers then /notify   (notification fires here, not earlier)
    Screen 4 -> buyer was already polling /notify-status -> banner appears

Run:    uvicorn app:app --reload --port 8000
Docs:   http://localhost:8000/docs
Mock:   set USE_MOCK=true to run /analyze-product without AWS.
"""

from dotenv import load_dotenv
load_dotenv()

import json
import os
from typing import List, Optional
from enum import Enum

from fastapi import FastAPI, File, UploadFile, Form, Body
from fastapi.middleware.cors import CORSMiddleware

import matching
import bedrock_client

HERE = os.path.dirname(__file__)
ROOT = os.path.dirname(HERE)
DATA_DIR = os.path.join(ROOT, "data")

# >>> CHANGED: folder holding one original listing image per product, named by
# product_id (e.g. data/reference_images/P009.png). Private to the backend —
# the frontends never touch it.
REF_DIR = os.path.join(DATA_DIR, "reference_images")


def _load(name):
    with open(os.path.join(DATA_DIR, name)) as f:
        return json.load(f)


# Data files (lists) indexed by id for quick lookup.
PRODUCTS = {p["product_id"]: p for p in _load("products.json")}
USERS = _load("users.json")
USERS_BY_ID = {u["user_id"]: u for u in USERS}
HUBS = {h["hub_id"]: h for h in _load("hubs.json")}

USE_MOCK = os.getenv("USE_MOCK", "false").lower() == "true"

# --- Business rules: mirror config.json / contract shared_reference ----------
# Keep these in sync with config.json if it ever changes.
CONDITION_TIERS = {
    "Like New":        {"min": 85, "max": 100, "discount": 18},
    "Good":            {"min": 65, "max": 84,  "discount": 30},
    "Acceptable":      {"min": 40, "max": 64,  "discount": 45},
    "Below Threshold": {"min": 0,  "max": 39,  "discount": None},
}
ROUTING_RULES = {
    "second_life":   (60, 100),
    "refurbishment": (40, 59),
    "donation":      (20, 39),
    "recycling":     (0, 19),
}
RETURN_REASON_MODIFIER = {
    "Wrong Size": 10,
    "Gift Duplicate": 8,
    "Outgrown / No Longer Needed": 5,
    "Changed Mind": 0,
    "Not as Described": -5,
    "Defective": -20,
}
class ReturnReason(str, Enum):
    wrong_size       = "Wrong Size"
    gift_duplicate   = "Gift Duplicate"
    outgrown         = "Outgrown / No Longer Needed"
    changed_mind     = "Changed Mind"
    not_as_described = "Not as Described"
    defective        = "Defective"


def _clamp(n, lo, hi):
    return max(lo, min(hi, n))


def _round_half_up(x):
    return int(x + 0.5)


# >>> CHANGED: load the original listing image for a product, if one exists.
# Returns (filename, raw_bytes) or None. Tries common extensions so you don't
# have to standardise the file type.
def _load_reference(product_id):
    for ext in ("jpg", "jpeg", "png", "webp"):
        path = os.path.join(REF_DIR, f"{product_id}.{ext}")
        if os.path.exists(path):
            with open(path, "rb") as f:
                return (f"{product_id}.{ext}", f.read())
    return None


def tier_for_score(score):
    for name, t in CONDITION_TIERS.items():
        if t["min"] <= score <= t["max"]:
            return name
    return "Below Threshold"


def routing_for_score(score):
    for name, (lo, hi) in ROUTING_RULES.items():
        if lo <= score <= hi:
            return name
    return "recycling"


def make_routing_reason(routing, condition, visible_wear):
    """A short, human-readable sentence to read aloud to a judge."""
    if routing == "second_life":
        if condition == "Like New":
            return "No significant wear detected. Qualifies as Like New for immediate Second Life listing."
        return f"{visible_wear.capitalize()} wear detected. Product is fully functional and suitable for resale."
    if routing == "refurbishment":
        return "Condition suggests refurbishment is needed before the item can be resold."
    if routing == "donation":
        return "Condition is below resale standard but the item is still usable — routed to donation."
    return "Condition is too low for reuse — routed to recycling."


def hub_short_name(hub_id):
    """'Amazon Fulfillment Center — Bhiwandi' -> 'Bhiwandi'."""
    name = HUBS.get(hub_id, {}).get("name", hub_id)
    return name.split("\u2014")[-1].strip() if "\u2014" in name else name


# --- App --------------------------------------------------------------------
app = FastAPI(title="Second Life Commerce — Backend (Person 1, v4)")
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"],
)

# In-memory pending notifications: {buyer_id: notification_dict}
PENDING_NOTIFICATIONS = {}


@app.get("/")
def health():
    return {"status": "ok", "mock_mode": USE_MOCK, "products": len(PRODUCTS),
            "users": len(USERS), "hubs": len(HUBS)}


# --- 1. POST /analyze-product ----------------------------------------------
@app.post("/analyze-product")
async def analyze_product(
    images: List[UploadFile] = File(...),
    product_id: str = Form("P009"),
    return_reason: Optional[ReturnReason] = Form(None),
    comment: Optional[str] = Form(None),   # >>> CHANGED: optional owner note
):
    """Vision condition assessment + tier + routing. Pricing is NOT here."""
    if product_id not in PRODUCTS:
        return {"success": False, "error": f"Unknown product_id '{product_id}'"}

    # Treat empty string from form fields as "no return reason" (Entry Point B).
    if return_reason in ("", "null", "None"):
        return_reason = None
    # >>> CHANGED: same normalisation for the comment.
    if comment in ("", "null", "None"):
        comment = None

    if USE_MOCK:
        # Stable demo values. P009 (Rahul's voluntary speaker) -> Like New.
        raw = {"P009": (88, "none"), "P001": (73, "minor"),
               "P006": (78, "minor")}.get(product_id, (80, "minor"))
        vision = {
            "raw_score": raw[0], "confidence": 94,
            "scuffs_detected": False, "packaging_intact": True,
            "product_complete": True, "visible_wear": raw[1],
            "functional_defect": False,   # >>> CHANGED: keep field present in mock
            "ai_description": "Item is in clean condition with no visible damage.",
        }
    else:
        # >>> CHANGED: send the original listing image (if we have one) alongside
        # the owner's photos, plus the owner's comment, in the single Bedrock call.
        user_photos = [(img.filename, await img.read()) for img in images]
        reference = _load_reference(product_id)
        photos = ([reference] if reference else []) + user_photos
        vision = bedrock_client.analyze_with_bedrock(
            photos, comment=comment, has_reference=reference is not None
        )

    # Apply the v4 scoring chain.
    modifier = RETURN_REASON_MODIFIER.get(return_reason, 0)  # null/absent -> 0
    adjusted = _clamp(vision["raw_score"] + modifier, 0, 100)
    condition = tier_for_score(adjusted)
    routing = routing_for_score(adjusted)

    # >>> CHANGED: a reported functional problem demotes a would-be resale item
    # to refurbishment, so /generate-listing correctly refuses to list it.
    functional_defect = bool(vision.get("functional_defect", False))
    if functional_defect and routing == "second_life":
        routing = "refurbishment"

    routing_reason = make_routing_reason(routing, condition, vision["visible_wear"])
    if functional_defect:
        routing_reason = ("A functional issue was reported, so the item is routed to "
                          "refurbishment rather than direct resale.")

    return {
        "success": True,
        "product_id": product_id,
        "score": adjusted,
        "condition": condition,
        "confidence": vision["confidence"],
        "routing": routing,
        "routing_reason": routing_reason,
        "attributes": {
            "scuffs_detected": vision["scuffs_detected"],
            "packaging_intact": vision["packaging_intact"],
            "product_complete": vision["product_complete"],
            "visible_wear": vision["visible_wear"],
            "functional_defect": functional_defect,   # >>> CHANGED: extra key, no one is required to render it
        },
        "ai_description": vision["ai_description"],
    }


# --- 2. POST /compare -------------------------------------------------------
@app.post("/compare")
async def compare(
    customer_images: List[UploadFile] = File(default=[]),
    driver_images: List[UploadFile] = File(default=[]),
    product_id: str = Form("P009"),
):
    """Driver fraud check. Hardcoded to 91/confirmed for the demo photos."""
    score = 91
    return {
        "success": True,
        "consistency_score": score,
        "verdict": "confirmed" if score >= 70 else "flagged",
        "mismatch_reason": None,
    }


# --- 3. POST /generate-listing (ALL pricing lives here) ---------------------
@app.post("/generate-listing")
def generate_listing(payload: dict = Body(...)):
    product_id = payload.get("product_id", "P009")
    product = PRODUCTS.get(product_id)
    if not product:
        return {"success": False, "error": f"Unknown product_id '{product_id}'"}

    condition = payload.get("condition", "Good")
    routing = payload.get("routing", "second_life")
    return_reason = payload.get("return_reason")
    if return_reason in ("", "null", "None"):
        return_reason = None

    # Eligibility: only second_life items get a listing.
    if condition == "Below Threshold" or routing != "second_life":
        return {
            "success": False,
            "error": f"Item condition '{condition}' is not eligible for a Second Life listing. "
                     f"Routed to: {routing}.",
        }

    discount = CONDITION_TIERS[condition]["discount"]
    original = product["original_price"]
    discounted = _round_half_up(original * (1 - discount / 100))

    return {
        "success": True,
        "listing": {
            "product_id": product_id,
            "listing_title": f"{product['name']} \u2014 {condition}",
            "condition_badge": condition,
            "ai_description": payload.get("ai_description", ""),
            "original_price": original,
            "discount_percent": discount,
            "discounted_price": discounted,
            "return_reason_display": return_reason,  # null => frontend shows "Listed by Owner"
            "amazon_verified": True,
            "hub_id": product["hub_id"],
            "estimated_delivery": "Same Day",  # demo default; all buyers within coverage
            "entry_point": "A" if return_reason else "B",
        },
    }


# --- 4. POST /match-buyers --------------------------------------------------
@app.post("/match-buyers")
def match_buyers_endpoint(payload: dict = Body(...)):
    matches = matching.match_buyers(
        category=payload["category"],
        discounted_price=payload["discounted_price"],
        hub_id=payload["hub_id"],
        users=USERS,
    )
    return {"success": True, "product_id": payload.get("product_id"), "matches": matches}


# --- 5. POST /notify + GET /notify-status -----------------------------------
@app.post("/notify")
def notify(payload: dict = Body(...)):
    buyer_id = payload["buyer_id"]
    listing = payload["listing"]

    buyer = USERS_BY_ID.get(buyer_id)
    listing_hub = listing.get("hub_id")
    if buyer and buyer.get("hub_id") == listing_hub:
        distance_label = f"Same hub \u2014 {hub_short_name(listing_hub)}"
    else:
        distance_label = f"Ships from {hub_short_name(listing_hub)}"

    PENDING_NOTIFICATIONS[buyer_id] = {
        "product_id": listing["product_id"],
        "listing_title": listing["listing_title"],
        "condition_badge": listing["condition_badge"],
        "discounted_price": listing["discounted_price"],
        "distance_label": distance_label,
        "estimated_delivery": listing.get("estimated_delivery", "Same Day"),
    }
    return {"success": True, "notified": True, "buyer_id": buyer_id}


@app.get("/notify-status/{buyer_id}")
def notify_status(buyer_id: str):
    note = PENDING_NOTIFICATIONS.pop(buyer_id, None)
    return {"success": True, "notification": note}  # note is None when nothing pending