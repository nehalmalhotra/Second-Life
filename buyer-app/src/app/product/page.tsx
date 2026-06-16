'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import ConditionBadge from '@/components/ConditionBadge'
import { RAHUL_LISTING, MATCH_REASON, ASHISH } from '@/data/mockData'

export default function ProductPage() {
  const router = useRouter()
  const listing = RAHUL_LISTING
  const savings = listing.original_price - listing.discounted_price

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-amazon-page-bg)', fontFamily: 'var(--font-amazon)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: '12px', color: '#565959', marginBottom: '12px' }}>
          <span style={{ color: 'var(--color-amazon-link)' }}>Amazon.in</span>
          {' › '}
          <span style={{ color: 'var(--color-amazon-link)' }}>Second Life</span>
          {' › '}
          <span>Speakers</span>
        </div>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* Left: Product Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              width: '320px',
              flexShrink: 0,
              background: 'var(--color-amazon-card)',
              border: '1px solid var(--color-amazon-card-border)',
              borderRadius: 'var(--radius-card)',
              padding: '16px',
            }}
          >
            <img
              src="/products/P009.png"
              alt="boAt Speaker"
              style={{ width: '100%', maxHeight: 280, objectFit: 'cover', borderRadius: 12 }}
            />
          </motion.div>

          {/* Center: Details */}
          <div style={{ flex: 1, minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-amazon-text)', lineHeight: 1.2, marginBottom: '10px' }}>
                {listing.listing_title}
              </h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                <ConditionBadge condition={listing.condition_badge} size="md" />
                {listing.amazon_verified && (
                  <span style={{ fontSize: '13px', color: 'var(--color-amazon-link)', fontWeight: 600 }}>
                    ✓ Amazon Verified
                  </span>
                )}
              </div>
            </div>

            <div style={{ background: 'var(--color-amazon-card)', border: '1px solid var(--color-amazon-card-border)', borderRadius: 'var(--radius-card)', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-amazon-text)' }}>
                  ₹{listing.discounted_price.toLocaleString()}
                </span>
                <span style={{ fontSize: '14px', color: 'var(--color-amazon-savings)', fontWeight: 600 }}>
                  {listing.discount_percent}% off
                </span>
              </div>
              <div style={{ fontSize: '14px', color: '#565959' }}>
                M.R.P.: <span style={{ textDecoration: 'line-through' }}>₹{listing.original_price.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid var(--color-amazon-card-border)', borderRadius: 12, padding: 16 }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111', marginBottom: 12 }}>
                How Amazon Verification Works
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  'Seller uploads photos of the product',
                  'Amazon AI evaluates condition and grades it Like New, Good, or Acceptable',
                  'Amazon verifies independently at pickup — a second photo comparison',
                  'Only after both checks pass does the listing go live',
                ].map((step, index) => (
                  <div key={step} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#FF9900', color: '#111', display: 'grid', placeItems: 'center', fontSize: '13px', fontWeight: 700 }}>
                      {index + 1}
                    </div>
                    <p style={{ margin: 0, color: '#111', fontSize: '14px', lineHeight: 1.6 }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#F8F4FF', border: '1px solid #C9B8F0', borderRadius: 12, padding: 16 }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#6B46C1', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>
                Why this was recommended to you
              </p>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-amazon-text)', lineHeight: 1.6, marginBottom: 14 }}>
                Matched because: {MATCH_REASON}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '12px', background: '#E6F4EA', color: '#1A7340', padding: '8px 10px', borderRadius: 999, fontWeight: 700 }}>
                  +40 Electronics in wishlist
                </span>
                <span style={{ fontSize: '12px', background: '#E8F0FE', color: '#1A56A0', padding: '8px 10px', borderRadius: 999, fontWeight: 700 }}>
                  +35 Same city
                </span>
                <span style={{ fontSize: '12px', background: '#FFF3CD', color: '#856404', padding: '8px 10px', borderRadius: 999, fontWeight: 700 }}>
                  +25 Within ₹3,000 budget
                </span>
                <span style={{ fontSize: '12px', background: '#131921', color: '#FF9900', padding: '8px 10px', borderRadius: 999, fontWeight: 700 }}>
                  = 100/100 match
                </span>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: '#565959' }}>
              Condition mismatch? Full return covered by Amazon.
            </p>
          </div>

          {/* Right: Buy Box */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{
              width: '320px',
              flexShrink: 0,
              background: 'var(--color-amazon-card)',
              border: '1px solid var(--color-amazon-card-border)',
              borderRadius: 'var(--radius-card)',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div>
              <p style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-amazon-price)', margin: 0 }}>
                ₹{listing.discounted_price.toLocaleString()}
              </p>
              <p style={{ fontSize: '14px', color: '#565959', margin: '6px 0 0' }}>
                M.R.P.: <span style={{ textDecoration: 'line-through' }}>₹{listing.original_price.toLocaleString()}</span>
              </p>
              <p style={{ fontSize: '14px', color: 'var(--color-amazon-savings)', margin: '6px 0 0' }}>
                {listing.discount_percent}% off
              </p>
            </div>

            <button
              onClick={() => router.push('/confirmed')}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: 12,
                background: '#FF9900',
                border: 'none',
                color: '#111',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Buy Now
            </button>

            <div style={{ fontSize: '13px', color: '#565959', lineHeight: 1.5 }}>
              <p style={{ margin: 0, fontWeight: 700, color: 'var(--color-amazon-text)' }}>
                Delivered by Amazon Verified Pickup
              </p>
              <p style={{ margin: '6px 0 0' }}>
                Verified product condition and secure handoff with the listing.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
