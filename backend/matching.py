"""
matching.py — The buyer-matching algorithm (v4 contract).

Pure Python. No AI. A transparent points system the judges can audit.

Scoring (from the contract's /match-buyers._scoring_logic):
    +40  category is in the buyer's wishlist
    +35  buyer's hub_id == the product's hub_id  (shown as "available near you")
    +25  discounted_price <= buyer's price_range_max
Max = 100. Buyers scoring 0 are excluded entirely. Result is sorted high to low.
"""

CATEGORY_POINTS = 40
LOCATION_POINTS = 35
PRICE_POINTS = 25


def score_buyer(category, discounted_price, hub_id, user):
    """Score ONE buyer. Returns (score, reason_string)."""
    score = 0
    parts = []

    if category in user["wishlist"]:
        score += CATEGORY_POINTS
        parts.append(f"{category} on your wishlist")

    if user["hub_id"] == hub_id:
        score += LOCATION_POINTS
        parts.append("available near you")

    if discounted_price <= user["price_range_max"]:
        score += PRICE_POINTS
        parts.append("within your price range")

    # Join only the clauses that actually matched, in the contract's fixed order.
    reason = " \u00b7 ".join(parts)
    return score, reason


def match_buyers(category, discounted_price, hub_id, users):
    """Score every buyer, drop the zeros, return ranked best-first."""
    results = []
    for user in users:
        score, reason = score_buyer(category, discounted_price, hub_id, user)
        if score == 0:
            continue  # contract: only buyers with match_score > 0 are returned
        results.append({
            "buyer_id": user["user_id"],
            "buyer_name": user["name"],
            "match_score": score,
            "match_reason": reason,
        })
    results.sort(key=lambda b: b["match_score"], reverse=True)
    return results


if __name__ == "__main__":
    import json, os
    here = os.path.dirname(__file__)
    root = os.path.dirname(here)
    users = json.load(open(os.path.join(root, "data", "users.json")))
    for r in match_buyers("Electronics", 1229, "H001", users):
        print(f"  {r['buyer_id']} {r['buyer_name']:14} {r['match_score']:3}  {r['match_reason']}")
