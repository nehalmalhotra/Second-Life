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

        {/* Main content: image left, details center, buy box right */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* ─── Left: Product Image ─── */}
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              aspectRatio: '1',
              fontSize: '100px',
            }}
          >
            🔊
          </motion.div>

          {/* ─── Center: Product Details ─── */}
          <div style={{ flex: 1, minWidth: '280px' }}>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <h1 style={{ fontSize: '20px', fontWeight: 400, color: 'var(--color-amazon-text)', lineHeight: 1.4, marginBottom: '8px' }}>
                {listing.listing_title.split(' — ')[0]}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <ConditionBadge condition={listing.condition_badge} size="md" />
                {listing.amazon_verified && (
                  <span style={{ fontSize: '12px', color: 'var(--color-amazon-link)' }}>
                    ✓ Amazon Verified
                  </span>
                )}
              </div>

              {/* Separator */}
              <hr style={{ border: 'none', borderTop: '1px solid var(--color-amazon-card-border)', margin: '12px 0' }} />
            </motion.div>

            {/* Price section */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              style={{ marginBottom: '16px' }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', color: 'var(--color-amazon-text)' }}>-{listing.discount_percent}%</span>
                <span style={{ fontSize: '28px', fontWeight: 400, color: 'var(--color-amazon-text)' }}>
                  ₹{listing.discounted_price.toLocaleString()}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#565959' }}>
                M.R.P.: <span style={{ textDecoration: 'line-through' }}>₹{listing.original_price.toLocaleString()}</span>
              </p>
              <p style={{ fontSize: '13px', color: 'var(--color-amazon-savings)', marginTop: '4px' }}>
                You save: ₹{savings.toLocaleString()} ({listing.discount_percent}% off)
              </p>
            </motion.div>

            {/* AI Condition Assessment */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              style={{
                background: 'var(--color-amazon-card)',
                border: '1px solid var(--color-amazon-card-border)',
                borderRadius: 'var(--radius-card)',
                padding: '14px',
                marginBottom: '12px',
              }}
            >
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-amazon-text)', marginBottom: '6px' }}>
                AI Condition Assessment
              </p>
              <p style={{ fontSize: '13px', color: '#565959', lineHeight: 1.6 }}>
                {listing.ai_description}
              </p>
            </motion.div>

            {/* Match reason */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              style={{
                background: '#F8F4FF',
                border: '1px solid #C9B8F0',
                borderRadius: 'var(--radius-card)',
                padding: '14px',
                marginBottom: '12px',
              }}
            >
              <p style={{ fontSize: '12px', color: '#6B46C1', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                🎯 Why this was recommended to {ASHISH.name}
              </p>
              <p style={{ fontSize: '13px', color: 'var(--color-amazon-text)', lineHeight: 1.5 }}>
                <strong>Matched because:</strong> {MATCH_REASON}
              </p>
              <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11px', background: '#E6F4EA', color: '#1A7340', padding: '2px 8px', borderRadius: '100px', fontWeight: 600 }}>
                  +40 Electronics in wishlist
                </span>
                <span style={{ fontSize: '11px', background: '#E8F0FE', color: '#1A56A0', padding: '2px 8px', borderRadius: '100px', fontWeight: 600 }}>
                  +35 Same city
                </span>
                <span style={{ fontSize: '11px', background: '#FFF3CD', color: '#856404', padding: '2px 8px', borderRadius: '100px', fontWeight: 600 }}>
                  +25 Within ₹3,000 budget
                </span>
                <span style={{ fontSize: '11px', background: 'var(--color-amazon-header)', color: 'var(--color-secondlife)', padding: '2px 8px', borderRadius: '100px', fontWeight: 700 }}>
                  = 100/100 match
                </span>
              </div>
            </motion.div>
          </div>

          {/* ─── Right: Buy Box ─── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{
              width: '260px',
              flexShrink: 0,
              background: 'var(--color-amazon-card)',
              border: '1px solid var(--color-amazon-card-border)',
              borderRadius: 'var(--radius-card)',
              padding: '18px',
            }}
          >
            {/* Price */}
            <p style={{ fontSize: '24px', fontWeight: 400, color: 'var(--color-amazon-price)', marginBottom: '4px' }}>
              ₹{listing.discounted_price.toLocaleString()}
            </p>
            <p style={{ fontSize: '12px', color: '#565959', marginBottom: '4px' }}>
              M.R.P.: <span style={{ textDecoration: 'line-through' }}>₹{listing.original_price.toLocaleString()}</span>
            </p>
            <p style={{ fontSize: '13px', color: 'var(--color-amazon-savings)', fontWeight: 600, marginBottom: '12px' }}>
              You save ₹{savings.toLocaleString()} ({listing.discount_percent}%)
            </p>

            {/* Delivery */}
            <div style={{ borderTop: '1px solid var(--color-amazon-card-border)', paddingTop: '12px', marginBottom: '12px' }}>
              <p style={{ fontSize: '13px', color: 'var(--color-amazon-text)', marginBottom: '4px' }}>
                <span style={{ fontWeight: 700, color: 'var(--color-amazon-savings)' }}>FREE Delivery</span> — {listing.estimated_delivery}
              </p>
              <p style={{ fontSize: '12px', color: '#565959' }}>
                Hub: Bhiwandi, Mumbai
              </p>
            </div>

            {/* Stock */}
            <p style={{ fontSize: '14px', color: 'var(--color-amazon-savings)', fontWeight: 600, marginBottom: '14px' }}>
              In Stock
            </p>

            {/* Buy Now button — Amazon yellow */}
            <button
              onClick={() => router.push('/confirmed')}
              style={{
                width: '100%',
                padding: '10px',
                background: 'var(--color-amazon-button-primary)',
                border: '1px solid #C8A600',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 400,
                color: 'var(--color-amazon-text)',
                cursor: 'pointer',
                fontFamily: 'var(--font-amazon)',
                marginBottom: '8px',
              }}
            >
              Buy Now
            </button>

            {/* Add to Cart button — secondary */}
            <button
              onClick={() => router.push('/confirmed')}
              style={{
                width: '100%',
                padding: '10px',
                background: 'var(--color-amazon-orange)',
                border: '1px solid #C89411',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 400,
                color: 'var(--color-amazon-text)',
                cursor: 'pointer',
                fontFamily: 'var(--font-amazon)',
                marginBottom: '12px',
              }}
            >
              Add to Cart
            </button>

            {/* Buyer protection */}
            <div style={{ borderTop: '1px solid var(--color-amazon-card-border)', paddingTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '16px' }}>🛡️</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-amazon-text)' }}>
                  Amazon Buyer Protection
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#565959', lineHeight: 1.5 }}>
                Condition mismatch? Full return covered. Two-point AI verification completed.
              </p>
            </div>

            {/* Payment */}
            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '14px' }}>🔒</span>
              <span style={{ fontSize: '12px', color: '#565959' }}>
                Secured by Amazon Pay
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
