export interface AnalyzeResponse {
  success: boolean
  product_id: string
  score: number
  condition: 'Like New' | 'Good' | 'Acceptable' | 'Below Threshold'
  confidence: number
  routing: string
  routing_reason: string
  attributes: {
    scuffs_detected: boolean
    packaging_intact: boolean
    product_complete: boolean
    visible_wear: string
  }
  ai_description: string
}

export interface Listing {
  product_id: string
  listing_title: string
  condition_badge: string
  ai_description: string
  original_price: number
  discount_percent: number
  discounted_price: number
  return_reason_display: string | null
  amazon_verified: boolean
  hub_id: string
  estimated_delivery: string
  entry_point: string
}

export interface ListingResponse {
  success: boolean
  listing?: Listing        // optional — only present on success
  error?: string           // optional — only present on failure
}
export interface CompareResponse {
  success: boolean
  consistency_score: number
  verdict: 'confirmed' | 'flagged'
  mismatch_reason: string | null
}