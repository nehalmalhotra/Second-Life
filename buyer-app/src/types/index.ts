export interface Notification {
    product_id: string
    listing_title: string
    condition_badge: string
    discounted_price: number
    distance_label: string
    estimated_delivery: string
  }
  
  export interface NotifyStatusResponse {
    success: boolean
    notification: Notification | null
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