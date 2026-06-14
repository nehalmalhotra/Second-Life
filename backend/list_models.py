"""
list_models.py — Run this AFTER you set up AWS to see which Claude vision
models your account is actually allowed to use.

Run with:   python list_models.py

Copy a model ID that contains "claude" and "3" or higher into your .env file
as BEDROCK_MODEL_ID. If the default in bedrock_client.py gives an error, this
is how you find one that works for YOUR account.
"""

import os
import boto3

REGION = os.getenv("AWS_REGION", "us-east-1")

client = boto3.client("bedrock", region_name=REGION)
resp = client.list_foundation_models(byProvider="anthropic")

print(f"Anthropic models available in {REGION}:\n")
for m in resp["modelSummaries"]:
    # Vision models support the IMAGE input modality.
    modalities = m.get("inputModalities", [])
    can_see = "IMAGE" in modalities
    flag = "  <-- supports images (vision)" if can_see else ""
    print(f"  {m['modelId']}{flag}")

print("\nTip: pick one marked 'supports images' and put it in .env as BEDROCK_MODEL_ID")
