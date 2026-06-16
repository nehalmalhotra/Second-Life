# Second Life Commerce

An AI-powered re-commerce platform that gives returned and pre-owned products a second
life through Amazon's ecosystem. It uses AWS Bedrock vision models to assess product
condition, automatically prices items, matches them to nearby buyers, and delivers
real-time notifications — turning reverse-logistics cost into revenue.

> The trust of buying new, at the price of pre-owned.

---

## Architecture

A monorepo with three independent apps plus shared data and assets:

```
secondlife/
├── backend/          Python (FastAPI) — AI grading, pricing, matching, notifications
├── frontend/         Next.js — seller-side app (returns flow + voluntary listings)
├── buyer-app/        Next.js — buyer-side app (marketplace, notifications, purchase)
├── data/             Shared JSON data (products, users, hubs, transactions, config)
├── assets/           Shared static assets (hero banner, etc.)
└── .kiro/specs/      Kiro spec(s), e.g. shared-hero-banner/
```

The two frontends are fully independent codebases — editing one does not affect the
other. They share design tokens by each keeping a copy of `design-tokens.css`, and the
buyer app symlinks the repo-root `assets/` into its `public/` via a predev script.

### Demo flow

1. **Seller** lists or returns a product and uploads photos → Bedrock vision grades the
   condition → the item is priced and listed automatically.
2. **Backend** matches the listing to the best nearby buyer (weighted algorithm).
3. **Buyer** receives a real-time notification and can browse and purchase it on the
   marketplace.

---

## Quick start

### Prerequisites

- **Python** — (FastAPI + boto3
  run on 3.9+).
- **Node.js** — (Next.js 16
  requires Node 20+).
- **AWS credentials with Bedrock access** — optional. Mock mode runs the whole demo
  without AWS (see [Mock mode](#mock-mode)).

### 1. Backend (FastAPI, port 8000)

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in the **project root** (not in `backend/`):

```env
USE_MOCK=true                          # true = no AWS needed; flip to false for real Bedrock calls
AWS_REGION=us-east-1
BEDROCK_MODEL_ID=us.amazon.nova-pro-v1:0
AWS_ACCESS_KEY_ID=your-key             # only needed when USE_MOCK=false
AWS_SECRET_ACCESS_KEY=your-secret      # only needed when USE_MOCK=false
```

Run the server from inside `backend/`:

```bash
uvicorn app:app --reload --port 8000
```

Interactive API docs: <http://localhost:8000/docs>

### 2. Seller app — `frontend/` (port 3000)

```bash
cd frontend
npm install
npm run dev
```

Runs on <http://localhost:3000>.

### 3. Buyer app — `buyer-app/` (port 3001)

Both Next.js apps default to port 3000, so the buyer app **must** be started on a
different port or it will collide with the seller app:

```bash
cd buyer-app
npm install
npm run dev -- --port 3001
```

Runs on <http://localhost:3001>. The `predev` step runs `scripts/link-shared-assets.js`,
which symlinks `buyer-app/public/shared-assets` → the repo-root `assets/` directory (a
junction on Windows).

---

## Backend ↔ frontend wiring

Both frontends call the backend at a **hardcoded** base URL — neither reads it from an
environment variable:

- `frontend/src/services/api.ts` → `const BASE = 'http://localhost:8000'`
- `buyer-app/src/services/api.ts` → `const BASE = 'http://localhost:8000'`

To point the apps at a different backend (e.g. a deployed URL), edit the `BASE` constant
in both files.

### Mock mode

There are **two independent mock switches** — know both:

1. **Backend** — the `USE_MOCK` env var (default `false` in code). When `true`, the
   `/analyze-product` endpoint returns stable demo values without calling AWS. All other
   endpoints work normally with no cloud dependency.
2. **Seller frontend** — a compile-time constant `USE_MOCK` in
   `frontend/src/services/api.ts` (currently `false`). When `true`, the seller app skips
   network calls entirely and returns local mock data.

> The **buyer app has no mock flag** — it always calls the real backend, so the backend
> must be running for the buyer flow to work.

---

## API endpoints

All routes live in `backend/app.py` (no router/blueprint files).

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/` | Health check — returns status, mock mode, and data counts |
| POST | `/analyze-product` | Vision-based condition assessment + tier + routing (the Bedrock call) |
| POST | `/compare` | Driver/pickup fraud check (returns a fixed 91% / confirmed for the demo) |
| POST | `/generate-listing` | Pricing + listing assembly (deterministic — no AI) |
| POST | `/match-buyers` | Weighted buyer ranking by category, location, and price |
| POST | `/notify` | Store a pending notification for a buyer |
| GET | `/notify-status/{buyer_id}` | Buyer polls for a pending notification |
| POST | `/notify-ack/{buyer_id}` | Acknowledge / dismiss a notification |

---

## Business logic

### Condition scoring

Products are scored 0–100 by the vision model, then adjusted by the return reason:

| Return reason | Score modifier |
|---------------|----------------|
| Wrong size | +10 |
| Gift duplicate | +8 |
| Outgrown / no longer needed | +5 |
| Changed mind | 0 |
| Not as described | −5 |
| Defective | −20 |

### Condition tiers & pricing

| Tier | Score range | Discount |
|------|-------------|----------|
| Like New | 85–100 | 18% |
| Good | 65–84 | 30% |
| Acceptable | 40–64 | 45% |
| Below threshold | 0–39 | Not eligible |

### Routing rules

| Destination | Score range |
|-------------|-------------|
| Second Life (resale) | 60–100 |
| Refurbishment | 40–59 |
| Donation | 20–39 |
| Recycling | 0–19 |

> Exact thresholds and modifiers are defined in `data/config.json` (`_version: "v3"`).

---

## Two seller entry points

- **Entry Point A — Returns:** a customer returns an item through the normal return
  flow; the AI grades it and routes it to Second Life instead of the standard return
  pipeline. This is the self-funding path — it redirects costs Amazon already pays.
- **Entry Point B — Voluntary listings:** a customer voluntarily lists an item they own
  via "Give Your Product a Second Life." The item never enters reverse logistics — pure
  incremental upside at no added cost.

---

## Routes

### Seller app (`frontend/`)

| Route | Screen |
|-------|--------|
| `/` | Homepage (Amazon-style, with the Second Life banner) |
| `/second-life` | Second Life marketplace + "Give Your Product a Second Life" CTA |
| `/orders` | Your Orders (Entry Point A starts here) |
| `/return-flow` | Return reason selection |
| `/upload` | Photo upload for AI grading |
| `/verify` | Driver/pickup verification screen |

### Buyer app (`buyer-app/`)

| Route | Screen |
|-------|--------|
| `/` | Homepage with product grid |
| `/marketplace` | Second Life marketplace listings |
| `/product` | Product detail page |
| `/confirmed` | Purchase confirmation |

---

## Data & persistence

All data is **mock JSON** in `/data` — there is no database. Pending notifications are
held in an in-memory dict on the backend and are lost on restart.

| File | Contents |
|------|----------|
| `products.json` | 12 products with pricing, categories, and hub assignments |
| `users.json` | 5 buyer profiles with budgets, interests, and locations |
| `hubs.json` | 3 fulfillment hubs |
| `transactions.json` | 50 historical transactions for dashboard metrics |
| `config.json` | All business rules, scoring, and pricing config (`_version: "v3"`) |
| `reference_images/` | Original listing photos (named by `product_id`, e.g. `P009.png`) |

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Backend | Python · FastAPI · Uvicorn · boto3 · python-dotenv · python-multipart |
| AI / ML | AWS Bedrock vision (model below) |
| Seller frontend | Next.js 16 · React 19 · Tailwind CSS v4 · Framer Motion · lucide-react · react-dropzone |
| Buyer frontend | Next.js 16 · React 19 · Tailwind CSS v4 · Framer Motion |
| Data | JSON flat files (prototype) |

**Bedrock model:** the code defaults to `anthropic.claude-3-5-sonnet-20240620-v1:0`, but
the committed `.env` overrides it to `us.amazon.nova-pro-v1:0` (set via `BEDROCK_MODEL_ID`).
Region comes from `AWS_REGION` (default `us-east-1`). Credentials are resolved by boto3
from the standard sources (env vars or `~/.aws/credentials`).

---

## Environment variables

| Variable | Required | Default (in code) | Description |
|----------|----------|-------------------|-------------|
| `USE_MOCK` | No | `false` | Skip AWS calls on `/analyze-product`, return hardcoded grades |
| `AWS_REGION` | When `USE_MOCK=false` | `us-east-1` | AWS region for Bedrock |
| `BEDROCK_MODEL_ID` | When `USE_MOCK=false` | `anthropic.claude-3-5-sonnet-20240620-v1:0` | Bedrock model identifier (`.env` overrides to Nova Pro) |
| `AWS_ACCESS_KEY_ID` | When `USE_MOCK=false` | — | AWS access key |
| `AWS_SECRET_ACCESS_KEY` | When `USE_MOCK=false` | — | AWS secret key |

A single `.env` lives at the project root; there is no `.env.example`, and the frontends
do not use `NEXT_PUBLIC_*` variables.

---

## License

*TODO: add a license (e.g. MIT) or state that the project is unlicensed/private.*
