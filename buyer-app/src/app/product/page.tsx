'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import ConditionBadge from '@/components/ConditionBadge'
import { RAHUL_LISTING, MATCH_REASON, ASHISH } from '@/data/mockData'

export default function ProductPage() {
  const router = useRouter()
  const listing = RAHUL_LISTING

  return (
    <div style={{ minHeight: '100vh', background: '#F3F3F3' }}>
      <Navbar />

      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '0 0 32px' }}>

        {/* Product image hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            background: '#232F3E',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0',
          }}
        >
          <span style={{ fontSize: '80px' }}>🔊</span>
        </motion.div>

        <div style={{ padding: '20px 16px' }}>

          {/* Title + badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <ConditionBadge condition={listing.condition_badge} size="md" />
              {listing.amazon_verified && (
                <span style={{
                  fontSize: '12px', color: '#067D62', fontWeight: 700,
                  background: '#E6F4EA', padding: '3px 10px', borderRadius: '100px',
                  border: '1px solid #A8D5B5',
                }}>
                  ✓ Amazon Verified
                </span>
              )}
            </div>

            <h1 style={{ fontSize: '18px', fontWeight: 700, color: '#111111', marginBottom: '4px', lineHeight: '1.3' }}>
              {listing.listing_title.split(' — ')[0]}
            </h1>
            <p style={{ fontSize: '12px', color: '#555555', marginBottom: '16px' }}>
              Listed by owner · Hub: Bhiwandi, Mumbai
            </p>
          </motion.div>

          {/* Price card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            style={{
              background: '#FFFFFF',
              border: '1px solid #DDDDDD',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#999999', textDecoration: 'line-through' }}>
                  Original ₹{listing.original_price.toLocaleString()}
                </p>
                <p style={{ fontSize: '32px', fontWeight: 700, color: '#111111', lineHeight: '1.1' }}>
                  ₹{listing.discounted_price.toLocaleString()}
                </p>
                <p style={{ fontSize: '13px', color: '#067D62', fontWeight: 600, marginTop: '2px' }}>
                  {listing.discount_percent}% off — {listing.condition_badge} discount applied
                </p>
              </div>
              <div style={{
                background: '#E6F4EA',
                borderRadius: '8px',
                padding: '8px 12px',
                textAlign: 'center',
              }}>
                <p style={{ fontSize: '10px', color: '#1A7340', fontWeight: 600 }}>YOU SAVE</p>
                <p style={{ fontSize: '18px', fontWeight: 700, color: '#1A7340' }}>
                  ₹{(listing.original_price - listing.discounted_price).toLocaleString()}
                </p>
              </div>
            </div>

            <div style={{
              marginTop: '12px',
              paddingTop: '12px',
              borderTop: '1px solid #F3F3F3',
              display: 'flex',
              gap: '16px',
            }}>
              <div>
                <p style={{ fontSize: '10px', color: '#999999', fontWeight: 600, textTransform: 'uppercase' }}>Delivery</p>
                <p style={{ fontSize: '13px', color: '#067D62', fontWeight: 600 }}>
                  📦 {listing.estimated_delivery}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '10px', color: '#999999', fontWeight: 600, textTransform: 'uppercase' }}>Hub</p>
                <p style={{ fontSize: '13px', color: '#111111', fontWeight: 500 }}>
                  Bhiwandi, Mumbai
                </p>
              </div>
            </div>
          </motion.div>

          {/* AI description */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{
              background: '#FFFFFF',
              border: '1px solid #DDDDDD',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '12px',
            }}
          >
            <p style={{ fontSize: '11px', color: '#999999', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
              AI Condition Assessment
            </p>
            <p style={{ fontSize: '13px', color: '#111111', lineHeight: '1.6' }}>
              {listing.ai_description}
            </p>
          </motion.div>

          {/* Match reason — the algorithm visibility moment */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            style={{
              background: '#F8F4FF',
              border: '1px solid #C9B8F0',
              borderRadius: '12px',
              padding: '14px',
              marginBottom: '12px',
            }}
          >
            <p style={{ fontSize: '11px', color: '#6B46C1', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
              🎯 Why this was recommended to {ASHISH.name}
            </p>
            <p style={{ fontSize: '13px', color: '#111111', lineHeight: '1.5' }}>
              <strong>Matched because:</strong> {MATCH_REASON}
            </p>
            <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '11px', background: '#E6F4EA', color: '#1A7340',
                padding: '2px 8px', borderRadius: '100px', fontWeight: 600,
              }}>
                +40 Electronics in wishlist
              </span>
              <span style={{
                fontSize: '11px', background: '#E8F0FE', color: '#1A56A0',
                padding: '2px 8px', borderRadius: '100px', fontWeight: 600,
              }}>
                +35 Same city
              </span>
              <span style={{
                fontSize: '11px', background: '#FFF3CD', color: '#856404',
                padding: '2px 8px', borderRadius: '100px', fontWeight: 600,
              }}>
                +25 Within ₹3,000 budget
              </span>
              <span style={{
                fontSize: '11px', background: '#131921', color: '#FF9900',
                padding: '2px 8px', borderRadius: '100px', fontWeight: 700,
              }}>
                = 100/100 match
              </span>
            </div>
          </motion.div>

          {/* Trust guarantee */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            style={{
              background: '#FFFFFF',
              border: '1px solid #DDDDDD',
              borderRadius: '12px',
              padding: '14px 16px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span style={{ fontSize: '24px', flexShrink: 0 }}>🛡️</span>
            <p style={{ fontSize: '13px', color: '#111111', lineHeight: '1.4' }}>
              <strong>Condition mismatch?</strong> Full return covered by Amazon. Two-point AI verification already completed.
            </p>
          </motion.div>

          {/* Buy Now button */}
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            onClick={() => router.push('/confirmed')}
            whileTap={{ scale: 0.97 }}
            style={{
              width: '100%',
              padding: '16px',
              background: '#FF9900',
              color: '#111111',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Buy Now — ₹{listing.discounted_price.toLocaleString()}
          </motion.button>

          <p style={{ fontSize: '11px', color: '#999999', textAlign: 'center', marginTop: '8px' }}>
            Secured by Amazon Pay · Buyer protection guaranteed
          </p>

        </div>
      </div>
    </div>
  )
}