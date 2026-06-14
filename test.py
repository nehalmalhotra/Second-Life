from dotenv import load_dotenv
load_dotenv()
import boto3

client = boto3.client(
    "bedrock-runtime",
    region_name="us-east-1"
)

response = client.converse(
    modelId="us.amazon.nova-lite-v1:0",
    messages=[
        {
            "role": "user",
            "content": [{"text": "Reply with OK"}]
        }
    ]
)

print(response["output"]["message"]["content"][0]["text"])