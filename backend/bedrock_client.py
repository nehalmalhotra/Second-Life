"""
bedrock_client.py — The ONLY part that talks to AWS (v4 contract).

In v4, Bedrock's job is narrow and clear: look at the photos and report the
RAW VISUAL condition only — a 0-100 score plus a few attribute flags and a
short description. It does NOT decide the condition tier, routing, or price.
Those are deterministic business rules applied in app.py. This is the clean
story for judges: "Bedrock judges what it can see; our auditable rules do the
rest."
"""
from dotenv import load_dotenv
load_dotenv()

import os

print("KEY FOUND:", bool(os.getenv("AWS_ACCESS_KEY_ID")))
print("REGION:", os.getenv("AWS_REGION"))

import json
import os

try:
    import boto3
except ImportError:
    boto3 = None

AWS_REGION = os.getenv("AWS_REGION", "us-east-1")
MODEL_ID = os.getenv("BEDROCK_MODEL_ID", "anthropic.claude-3-5-sonnet-20240620-v1:0")

def _build_prompt(has_reference, comment):
    if has_reference:
        intro = (
            "You are Amazon's product condition inspector for a resale program.\n"
            "The FIRST image is the original product exactly as it was listed (the reference).\n"
            "The SECOND image is that same item now, sent in by its owner.\n"
            "Compare them. Assess the CURRENT item's condition relative to the original, "
            "and note any deviation in shape, completeness, or physical integrity."
        )
    else:
        intro = (
            "You are Amazon's product condition inspector for a resale program.\n"
            "Look ONLY at the photo(s) and assess the item's visible physical condition."
        )

    comment_block = ""
    if comment:
        comment_block = (
            f'\n\nThe owner also wrote this note: "{comment}"\n'
            "Some defects are invisible in photos (e.g. 'stopped charging', 'leaks'). "
            "Factor the note in. If it describes a functional problem, set "
            "functional_defect to true even if the item looks fine."
        )

    return f"""{intro}{comment_block}

Respond with ONLY a JSON object, no other text, in exactly this shape:
{{
  "raw_score": <integer 0-100, condition NOW: 100 = as-new, 0 = unusable>,
  "confidence": <integer 0-100>,
  "scuffs_detected": <true/false>,
  "packaging_intact": <true/false>,
  "product_complete": <true/false>,
  "visible_wear": <"none" | "minor" | "moderate" | "severe">,
  "functional_defect": <true/false: a working/usability problem>,
  "ai_description": "<1-2 sentence summary of the item's current condition>"
}}

Do not mention price or resale decisions — only what the condition is.
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


def analyze_with_bedrock(photos, comment=None, has_reference=False):
    if boto3 is None:
        raise RuntimeError("boto3 is not installed. Run: pip install boto3")

    client = boto3.client("bedrock-runtime", region_name=AWS_REGION)

    content = [{"text": _build_prompt(has_reference, comment)}]
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
        "functional_defect": bool(r.get("functional_defect", False)),
        "ai_description": r.get("ai_description", ""),
    }
