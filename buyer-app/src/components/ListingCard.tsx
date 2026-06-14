import ConditionBadge from './ConditionBadge'
import type { Listing } from '@/types'

interface Props {
  listing: Listing
  isHighlighted?: boolean
  onClick?: () => void
}

export default function ListingCard({ listing, isHighlighted = false, onClick }: Props) {
  const productEmoji: Record<string, string> = {
    P009: '🔊',
    P006: '💪',
    P005: '🧘',
  }

  return (
    <div
      onClick={onClick}
      style={{
        background: '#FFFFFF',
        border: isHighlighted ? '2px solid #067D62' : '1px solid #DDDDDD',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '12px',
        boxShadow: isHighlighted
          ? '0 0 0 4px rgba(6,125,98,0.12)'
          : '0 1px 3px rgba(0,0,0,0.08)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', gap: '14px' }}>
        {/* Product image placeholder */}
        <div style={{
          width: '72px',
          height: '72px',
          background: '#F3F3F3',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          flexShrink: 0,
        }}>
          {productEmoji[listing.product_id] ?? '📦'}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Title + badge row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
            <p style={{
              fontSize: '13px', fontWeight: 600, color: '#111111',
              lineHeight: '1.3', flex: 1,
            }}>
              {listing.listing_title.split(' — ')[0]}
            </p>
          </div>

          <div style={{ marginBottom: '6px' }}>
            <ConditionBadge condition={listing.condition_badge} size="sm" />
          </div>

          {/* AI description truncated */}
          <p style={{
            fontSize: '11px', color: '#555555', lineHeight: '1.4',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: '8px',
          }}>
            {listing.ai_description}
          </p>

          {/* Price row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <span style={{ fontSize: '10px', color: '#999999', textDecoration: 'line-through' }}>
                ₹{listing.original_price.toLocaleString()}
              </span>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#111111', marginLeft: '6px' }}>
                ₹{listing.discounted_price.toLocaleString()}
              </span>
              <span style={{ fontSize: '11px', color: '#067D62', fontWeight: 600, marginLeft: '6px' }}>
                {listing.discount_percent}% off
              </span>
            </div>
          </div>

          {/* Tags row */}
          <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
            {listing.amazon_verified && (
              <span style={{
                fontSize: '10px', color: '#067D62', fontWeight: 600,
                background: '#E6F4EA', padding: '2px 8px', borderRadius: '100px',
              }}>
                ✓ Amazon Verified
              </span>
            )}
            <span style={{
              fontSize: '10px', color: '#1A56A0', fontWeight: 600,
              background: '#E8F0FE', padding: '2px 8px', borderRadius: '100px',
            }}>
              📦 {listing.estimated_delivery}
            </span>
            {listing.return_reason_display === null && (
              <span style={{
                fontSize: '10px', color: '#555555',
                background: '#F3F3F3', padding: '2px 8px', borderRadius: '100px',
              }}>
                Listed by owner
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}