"""
bedrock_client.py — The ONLY part that talks to AWS (v4 contract).

In v4, Bedrock's job is narrow and clear: look at the photos and report the
RAW VISUAL condition only — a 0-100 score plus a few attribute flags and a
short description. It does NOT decide the condition tier, routing, or price.
Those are deterministic business rules applied in app.py. This is the clean
story for judges: "Bedrock judges what it can see; our auditable rules do the
rest."
"""

import json
import os

try:
    import boto3
except ImportError:
    boto3 = None

AWS_REGION = os.getenv("AWS_REGION", "us-east-1")
MODEL_ID = os.getenv("BEDROCK_MODEL_ID", "anthropic.claude-3-5-sonnet-20240620-v1:0")

GRADING_PROMPT = """You are Amazon's product condition inspector for a resale program.
Look ONLY at the photos and assess the item's visible physical condition.

Respond with ONLY a JSON object, no other text, in exactly this shape:
{
  "raw_score": <integer 0-100, how good the item looks: 100 = pristine/unused, 0 = destroyed>,
  "confidence": <integer 0-100, how confident you are in this visual assessment>,
  "scuffs_detected": <true/false>,
  "packaging_intact": <true/false>,
  "product_complete": <true/false: all parts/accessories visibly present>,
  "visible_wear": <"none" | "minor" | "moderate" | "severe">,
  "ai_description": "<1-2 sentence visual summary of the item's condition>"
}

Do not mention price or resale decisions — only what you can see in the photos.
"""


def _format_from_filename(filename):
    name = (filename or "").lower()
    if name.endswith(".png"):
        return "png"
    if name.endswith(".gif"):
        return "gif"
    if name.endswith(".webp"):
        return "webp"
    return "jpeg"


def analyze_with_bedrock(photos):
    """
    photos: list of (filename, raw_bytes).
    Returns: {raw_score, confidence, scuffs_detected, packaging_intact,
              product_complete, visible_wear, ai_description}
    """
    if boto3 is None:
        raise RuntimeError("boto3 is not installed. Run: pip install boto3")

    client = boto3.client("bedrock-runtime", region_name=AWS_REGION)

    content = [{"text": GRADING_PROMPT}]
    for filename, raw_bytes in photos:
        content.append({
            "image": {
                "format": _format_from_filename(filename),
                "source": {"bytes": raw_bytes},
            }
        })

    response = client.converse(
        modelId=MODEL_ID,
        messages=[{"role": "user", "content": content}],
        inferenceConfig={"maxTokens": 500, "temperature": 0.2},
    )

    text = response["output"]["message"]["content"][0]["text"].strip()
    if text.startswith("```"):
        text = text.strip("`")
        text = text.split("\n", 1)[1] if "\n" in text else text
        text = text.replace("json", "", 1).strip()

    r = json.loads(text)
    return {
        "raw_score": int(r.get("raw_score", 75)),
        "confidence": int(r.get("confidence", 90)),
        "scuffs_detected": bool(r.get("scuffs_detected", False)),
        "packaging_intact": bool(r.get("packaging_intact", True)),
        "product_complete": bool(r.get("product_complete", True)),
        "visible_wear": r.get("visible_wear", "minor"),
        "ai_description": r.get("ai_description", ""),
    }
