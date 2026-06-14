import type { Listing, NotifyStatusResponse } from '@/types'
// The listing that Rahul posted — same data as seller-app
export const RAHUL_LISTING: Listing = {
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
}

// Two more existing listings for the browse page
export const BROWSE_LISTINGS: Listing[] = [
  RAHUL_LISTING,
  {
    product_id: 'P006',
    listing_title: 'Boldfit Resistance Bands Set — Good',
    condition_badge: 'Good',
    ai_description: 'All 5 bands are present and in good elastic condition with no tears. Original carry pouch is included.',
    original_price: 599,
    discount_percent: 30,
    discounted_price: 419,
    return_reason_display: 'Changed Mind',
    amazon_verified: true,
    hub_id: 'H002',
    estimated_delivery: 'Next Day',
    entry_point: 'A',
  },
  {
    product_id: 'P005',
    listing_title: 'Boldfit Women Yoga Mat with Carry Bag — Like New',
    condition_badge: 'Like New',
    ai_description: 'Mat surface is spotless with no marks or compression. Carry bag and strap are included in original condition.',
    original_price: 999,
    discount_percent: 18,
    discounted_price: 819,
    return_reason_display: null,
    amazon_verified: true,
    hub_id: 'H001',
    estimated_delivery: 'Same Day',
    entry_point: 'B',
  },
]

// Ashish's buyer profile
export const ASHISH = {
  user_id: 'U001',
  name: 'Ashish Verma',
  location: 'Andheri, Mumbai',
  hub_id: 'H001',
  wishlist: ['Baby Products', 'Toys & Games', 'Electronics'],
  price_range_max: 3000,
}

// Match reason for Screen 5
export const MATCH_REASON = 'Electronics on your wishlist · available near you · within your price range'

// Mock notification — what fires when Rahul's listing goes live
export const MOCK_NOTIFICATION_PENDING: NotifyStatusResponse = {
  success: true,
  notification: {
    product_id: 'P009',
    listing_title: 'boAt Aavante Bar 490 Bluetooth Speaker — Like New',
    condition_badge: 'Like New',
    discounted_price: 1229,
    distance_label: 'Same hub — Bhiwandi',
    estimated_delivery: 'Same Day',
  },
}

export const MOCK_NOTIFICATION_NONE: NotifyStatusResponse = {
  success: true,
  notification: null,
}