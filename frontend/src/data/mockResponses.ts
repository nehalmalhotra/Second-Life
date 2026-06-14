import type { AnalyzeResponse, ListingResponse, CompareResponse } from '@/types'

export const MOCK_ANALYZE_P009: AnalyzeResponse = {
  success: true,
  product_id: 'P009',
  score: 88,
  condition: 'Like New',
  confidence: 94,
  routing: 'second_life',
  routing_reason: 'No signs of use detected. Packaging intact. Qualifies as Like New for immediate Second Life listing.',
  attributes: {
    scuffs_detected: false,
    packaging_intact: true,
    product_complete: true,
    visible_wear: 'none',
  },
  ai_description: 'The speaker body is in pristine condition with no scratches or marks. Original packaging and all accessories are intact.',
}

export const MOCK_LISTING_P009: ListingResponse = {
  success: true,
  listing: {
    product_id: 'P009',
    listing_title: 'boAt Aavante Bar 490 Bluetooth Speaker — Like New',
    condition_badge: 'Like New',
    ai_description: 'The speaker body is in pristine condition with no scratches or marks. Original packaging and all accessories are intact.',
    original_price: 1499,
    discount_percent: 18,
    discounted_price: 1229,
    return_reason_display: null,
    amazon_verified: true,
    hub_id: 'H001',
    estimated_delivery: 'Same Day',
    entry_point: 'B',
  },
}

export const MOCK_ANALYZE_P001: AnalyzeResponse = {
  success: true,
  product_id: 'P001',
  score: 83,
  condition: 'Good',
  confidence: 91,
  routing: 'second_life',
  routing_reason: 'Minor surface wear detected. Product is fully functional and suitable for resale.',
  attributes: {
    scuffs_detected: false,
    packaging_intact: true,
    product_complete: true,
    visible_wear: 'minor',
  },
  ai_description: 'The bottle body is in clean condition with no visible dents or cracks. The cap shows minor surface marks but seals properly.',
}

export const MOCK_LISTING_P001: ListingResponse = {
  success: true,
  listing: {
    product_id: 'P001',
    listing_title: 'Cello H2O Unbreakable Water Bottle 1L — Good',
    condition_badge: 'Good',
    ai_description: 'The bottle body is in clean condition with no visible dents or cracks. The cap shows minor surface marks but seals properly.',
    original_price: 349,
    discount_percent: 30,
    discounted_price: 244,
    return_reason_display: 'Wrong Size',
    amazon_verified: true,
    hub_id: 'H003',
    estimated_delivery: 'Same Day',
    entry_point: 'A',
  },
}

export const MOCK_COMPARE: CompareResponse = {
  success: true,
  consistency_score: 91,
  verdict: 'confirmed',
  mismatch_reason: null,
}

export const MOCK_MATCH_BUYERS = {
  success: true,
  product_id: 'P009',
  matches: [
    {
      buyer_id: 'U001',
      buyer_name: 'Ashish Verma',
      match_score: 100,
      match_reason: 'Electronics on your wishlist · available near you · within your price range',
    },
  ],
}

export const MOCK_NOTIFY = {
  success: true,
  notified: true,
  buyer_id: 'U001',
}