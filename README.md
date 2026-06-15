# Second Life Commerce

An AI-powered re-commerce platform that gives returned and pre-owned products a second life through Amazon's ecosystem. The system uses AWS Bedrock vision models to assess product condition, automatically prices items, matches them to nearby buyers, and delivers real-time notifications — turning reverse logistics costs into revenue.

---

## Architecture

The project is a monorepo with three independent apps:

```
secondlife/
├── backend/          Python (FastAPI) — AI grading, pricing, matching, notifications
├── frontend/         Next.js — Seller-side app (returns flow + voluntary listings)
├── buyer-app/        Next.js — Buyer-side app (marketplace, notifications, purchase)
├── data/             Shared JSON data (products, users, hubs, transactions)
└── assets/           Shared static assets (hero banner, etc.)
```

### Demo Flow

1. **Seller** uploads product photos → Bedrock vision grades condition → item gets priced and listed
2. **Backend** matches the listing to the best nearby buyer (weighted algorithm)
3. **Buyer** receives a real-time notification and can browse/purchase on the marketplace

---

## Quick Start

### Prerequisites

- Python 3.10+
- Node.js 18+
- AWS credentials with Bedrock access (optional — mock mode works without AWS)

### 1. Backend

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in the project root (see `.env` for the template):

```env
USE_MOCK=true           # Set false when AWS is configured
AWS_REGION=us-east-1
BEDROCK_MODEL_ID=us.amazon.nova-pro-v1:0
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
```

Start the server:

```bash
cd backend
python -m uvicorn app:app --reload --port 8000
```

API docs available at http://localhost:8000/docs

### 2. Seller App (frontend)

```bash
cd frontend
npm install
npm run dev
```

Runs on http://localhost:3000

### 3. Buyer App

```bash
cd buyer-app
npm install
npm run dev
```

Runs on http://localhost:3001

---

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/analyze-product` | POST | Vision-based condition assessment (Bedrock AI) |
| `/compare` | POST | Driver fraud check — verifies photos match |
| `/generate-listing` | POST | Pricing + listing assembly |
| `/match-buyers` | POST | Weighted buyer ranking by proximity, budget, interests |
| `/notify` | POST | Push notification to matched buyer |
| `/notify-status/{buyer_id}` | GET | Buyer polls for pending notifications |
| `/notify-ack/{buyer_id}` | POST | Acknowledge/dismiss notification |

### Mock Mode

With `USE_MOCK=true`, the `/analyze-product` endpoint returns stable demo values without calling AWS. All other endpoints work normally without any cloud dependencies.

---

## Business Logic

### Condition Scoring

Products are scored 0–100 by the vision model, then adjusted by return reason:

| Return Reason | Score Modifier |
|---------------|---------------|
| Wrong Size | +10 |
| Gift Duplicate | +8 |
| Outgrown / No Longer Needed | +5 |
| Changed Mind | 0 |
| Not as Described | -5 |
| Defective | -20 |

### Condition Tiers & Pricing

| Tier | Score Range | Discount |
|------|------------|----------|
| Like New | 85–100 | 18% |
| Good | 65–84 | 30% |
| Acceptable | 40–64 | 45% |
| Below Threshold | 0–39 | Not eligible |

### Routing Rules

| Destination | Score Range |
|-------------|------------|
| Second Life (resale) | 60–100 |
| Refurbishment | 40–59 |
| Donation | 20–39 |
| Recycling | 0–19 |

---

## Entry Points

The platform supports two seller entry points:

- **Entry Point A (Returns):** A customer returns an item through the normal return flow. AI grades it and routes it to Second Life instead of the standard return pipeline. This is the self-funding path — it redirects costs Amazon already pays.

- **Entry Point B (Voluntary Listings):** A customer voluntarily lists an item they own via "Give it a Second Life." The item never enters Amazon's reverse-logistics pipeline. This is pure incremental upside at zero additional cost.

---

## Data Files

Located in `/data`:

| File | Contents |
|------|----------|
| `products.json` | 12 products with pricing, categories, hub assignments |
| `users.json` | 5 buyer profiles with budgets, interests, locations |
| `hubs.json` | 3 fulfillment hubs |
| `transactions.json` | 50 historical transactions for dashboard metrics |
| `config.json` | All business rules, scoring, and pricing configuration |
| `reference_images/` | Original listing photos for comparison grading |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python, FastAPI, Uvicorn |
| AI/ML | AWS Bedrock (Claude vision via Nova Pro) |
| Seller Frontend | Next.js 16, React 19, Tailwind CSS, Framer Motion |
| Buyer Frontend | Next.js 16, React 19, Tailwind CSS, Framer Motion |
| Data | JSON flat files (prototype) |

---

## Seller App Screens

| Route | Screen |
|-------|--------|
| `/orders` | Order history (entry point A starts here) |
| `/return-flow` | Return reason selection |
| `/upload` | Photo upload for AI grading |
| `/second-life` | Voluntary listing flow (entry point B) |
| `/verify` | Driver verification screen |

## Buyer App Screens

| Route | Screen |
|-------|--------|
| `/` | Homepage with product grid |
| `/marketplace` | Second Life marketplace listings |
| `/product` | Product detail page |
| `/confirmed` | Purchase confirmation |

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `USE_MOCK` | No | `false` | Skip AWS calls, return hardcoded grades |
| `AWS_REGION` | When mock=false | — | AWS region for Bedrock |
| `BEDROCK_MODEL_ID` | When mock=false | — | Bedrock model identifier |
| `AWS_ACCESS_KEY_ID` | When mock=false | — | AWS access key |
| `AWS_SECRET_ACCESS_KEY` | When mock=false | — | AWS secret key |
