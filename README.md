# Second Life Commerce — Backend (Person 1)

This is your entire backend. It is already built and tested. Your job now is to
(1) get it running on your laptop, (2) connect it to AWS Bedrock, and (3) test
your photos. This guide assumes you have never coded or used AWS before.

---

## What's in here

| File | What it is | Touch it? |
|------|-----------|-----------|
| `app.py` | The server with all 5 endpoints (v4 contract) | No (unless tweaking) |
| `matching.py` | The buyer-matching algorithm (pure math) | No |
| `bedrock_client.py` | The one piece that calls AWS Bedrock | No |
| `data/products.json` | Your team's 12 products | Already your real file |
| `data/users.json` | Your team's 5 buyers | Already your real file |
| `data/hubs.json` | Your team's 3 fulfillment hubs | Already your real file |
| `data/api_contract.json` | v4 contract — the response shapes for Person 2 & 3 | No |
| `list_models.py` | Shows which AWS models you can use | Run once |
| `test_bedrock.py` | Tests your photos 20x | Run before the demo |
| `.env.example` | Settings template | Copy to `.env` |

Pricing/routing/scoring rules live as constants near the top of `app.py` and
mirror your `config.json` / the contract's `shared_reference`. If config.json
ever changes, update those constants to match.

---

## STEP 1 — Run it in MOCK mode (no AWS needed, 5 minutes)

Do this first. It proves the server works and unblocks Person 2 & 3 immediately.

1. Install Python 3.10+ from python.org if you don't have it.
2. Open a terminal **in this folder** and run:
   ```
   pip install -r requirements.txt
   ```
3. Copy `.env.example` to a new file named `.env` (keep `USE_MOCK=true` for now).
4. Start the server:
   ```
   uvicorn app:app --reload --port 8000
   ```
5. Open your browser to **http://localhost:8000/docs**

You'll see a clickable page listing all 5 endpoints. Click any one → "Try it out"
→ "Execute" to test it. **This `/docs` page is the link you send Person 2 and
Person 3** — they can see and test every endpoint without you.

You are now done with the part that blocks the rest of the team. Everything below
is the AWS part, which only affects ONE endpoint (`/analyze-product`).

---


   40/35/25 point system. You can read it out loud and defend every point. No
   black box.
2. **"What does the Bedrock call return?"** — Open `bedrock_client.py`. It sends
   the photos to Claude vision and gets back a grade + description + confidence.
   Show the `/docs` page returning a real result live.
