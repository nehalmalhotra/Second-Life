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
        background: 'var(--color-amazon-card)',
        border: isHighlighted
          ? '2px solid var(--color-secondlife)'
          : '1px solid var(--color-amazon-card-border)',
        borderRadius: 'var(--radius-card)',
        boxShadow: isHighlighted
          ? '0 0 0 3px rgba(255,153,0,0.15)'
          : 'var(--shadow-card)',
        padding: '16px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        display: 'flex',
        gap: '16px',
      }}
    >
      {/* Square product image area */}
      <div style={{
        width: '140px',
        height: '140px',
        background: '#F7F7F7',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '48px',
        flexShrink: 0,
      }}>
        {productEmoji[listing.product_id] ?? '📦'}
      </div>

      {/* Details */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {/* Title — teal, Amazon style */}
        <p style={{
          fontSize: '14px',
          fontWeight: 400,
          color: 'var(--color-amazon-link)',
          lineHeight: 1.4,
          fontFamily: 'var(--font-amazon)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {listing.listing_title.split(' — ')[0]}
        </p>

        {/* Condition badge */}
        <div style={{ marginTop: '2px' }}>
          <ConditionBadge condition={listing.condition_badge} size="sm" />
        </div>

        {/* Price block */}
        <div style={{ marginTop: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '20px', fontWeight: 400, color: 'var(--color-amazon-text)', fontFamily: 'var(--font-amazon)' }}>
              ₹{listing.discounted_price.toLocaleString()}
            </span>
            <span style={{ fontSize: '12px', color: '#565959', textDecoration: 'line-through' }}>
              M.R.P.: ₹{listing.original_price.toLocaleString()}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--color-amazon-price)', fontWeight: 400 }}>
              ({listing.discount_percent}% off)
            </span>
          </div>
        </div>

        {/* Badges row */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {listing.amazon_verified && (
            <span style={{
              fontSize: '11px',
              color: 'var(--color-amazon-savings)',
              fontWeight: 600,
              fontFamily: 'var(--font-amazon)',
            }}>
              ✓ Amazon Verified
            </span>
          )}
          <span style={{
            fontSize: '11px',
            color: 'var(--color-amazon-savings)',
            fontWeight: 600,
            fontFamily: 'var(--font-amazon)',
          }}>
            📦 {listing.estimated_delivery}
          </span>
        </div>

        {/* AI summary */}
        <p style={{
          fontSize: '12px',
          color: '#565959',
          lineHeight: 1.4,
          marginTop: '6px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          fontFamily: 'var(--font-amazon)',
        }}>
          {listing.ai_description}
        </p>
      </div>
    </div>
  )
}
