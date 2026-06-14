import type { AnalyzeResponse, ListingResponse, CompareResponse } from '@/types'
import {
  MOCK_ANALYZE_P009,
  MOCK_ANALYZE_P001,
  MOCK_LISTING_P009,
  MOCK_LISTING_P001,
  MOCK_COMPARE,
  MOCK_MATCH_BUYERS,
  MOCK_NOTIFY,
} from '@/data/mockResponses'

const BASE = 'http://localhost:8000'
const USE_MOCK = false // ← flip to false at integration hour

// delay must be defined BEFORE any function that uses it
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function analyzeProduct(
  productId: string,
  returnReason: string | null,
  comment: string,
  files: File[]
): Promise<AnalyzeResponse> {
  if (USE_MOCK) {
    await delay(3000)
    return productId === 'P009' ? MOCK_ANALYZE_P009 : MOCK_ANALYZE_P001
  }
  const form = new FormData()

form.append('product_id', productId)

if (returnReason)
  form.append('return_reason', returnReason)

if (comment)
  form.append('comment', comment)

files.forEach(file => {
  form.append('images', file)
})
  const res = await fetch(`${BASE}/analyze-product`, { method: 'POST', body: form })
  return res.json() as Promise<AnalyzeResponse>
}

export async function generateListing(
  analyzeResult: AnalyzeResponse,
  returnReason: string | null
): Promise<ListingResponse> {
  if (USE_MOCK) {
    return analyzeResult.product_id === 'P009' ? MOCK_LISTING_P009 : MOCK_LISTING_P001
  }
  const res = await fetch(`${BASE}/generate-listing`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...analyzeResult, return_reason: returnReason }),
  })
  return res.json() as Promise<ListingResponse>
}

export async function comparePhotos(productId: string): Promise<CompareResponse> {
  if (USE_MOCK) {
    await delay(1500)
    return MOCK_COMPARE
  }
  const form = new FormData()
  form.append('product_id', productId)
  const res = await fetch(`${BASE}/compare`, { method: 'POST', body: form })
  return res.json() as Promise<CompareResponse>
}

export async function matchBuyers(
  productId: string,
  category: string,
  discountedPrice: number,
  hubId: string
) {
  if (USE_MOCK) return MOCK_MATCH_BUYERS
  const res = await fetch(`${BASE}/match-buyers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      product_id: productId,
      category,
      discounted_price: discountedPrice,
      hub_id: hubId,
    }),
  })
  return res.json()
}

export async function notifyBuyer(buyerId: string, listing: object) {
  if (USE_MOCK) return MOCK_NOTIFY
  const res = await fetch(`${BASE}/notify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ buyer_id: buyerId, listing }),
  })
  return res.json()
}