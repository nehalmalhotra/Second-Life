from dotenv import load_dotenv
load_dotenv()
import boto3

client = boto3.client(
    "bedrock",
    region_name="us-east-1"
)

response = client.list_inference_profiles()

for p in response["inferenceProfileSummaries"]:
    print(p["inferenceProfileId"])