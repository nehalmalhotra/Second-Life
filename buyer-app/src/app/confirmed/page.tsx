'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { RAHUL_LISTING, ASHISH } from '@/data/mockData'

export default function ConfirmedPage() {
  const router = useRouter()
  const listing = RAHUL_LISTING
  const savings = listing.original_price - listing.discounted_price
  const deliveryTime = '8:00 PM'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-amazon-page-bg)', fontFamily: 'var(--font-amazon)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px 16px' }}>

        {/* Success banner */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'var(--color-amazon-card)',
            border: '1px solid var(--color-amazon-card-border)',
            borderRadius: 'var(--radius-card)',
            padding: '24px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{
              width: '64px', height: '64px',
              background: '#E6F4EA',
              border: '3px solid var(--color-amazon-savings)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 700,
              color: 'var(--color-amazon-savings)',
              flexShrink: 0,
            }}
          >
            ✓
          </motion.div>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-amazon-savings)', marginBottom: '4px' }}>
              Order placed, thank you!
            </h1>
            <p style={{ fontSize: '14px', color: '#565959' }}>
              Confirmation will be sent to {ASHISH.name}&apos;s email.
            </p>
          </div>
        </motion.div>

        {/* Delivery card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          style={{
            background: 'var(--color-amazon-card)',
            border: '1px solid var(--color-amazon-card-border)',
            borderRadius: 'var(--radius-card)',
            padding: '20px',
            marginBottom: '16px',
          }}
        >
          <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-amazon-savings)', marginBottom: '8px' }}>
            Arriving today by {deliveryTime}
          </p>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{
              width: '72px', height: '72px',
              background: '#F7F7F7',
              borderRadius: '4px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '36px',
              flexShrink: 0,
            }}>
              🔊
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 400, color: 'var(--color-amazon-link)', marginBottom: '4px' }}>
                boAt Aavante Bar 490 Bluetooth Speaker
              </p>
              <p style={{ fontSize: '12px', color: '#565959' }}>
                Condition: Like New · Amazon Verified
              </p>
              <p style={{ fontSize: '12px', color: '#565959', marginTop: '4px' }}>
                From Bhiwandi hub · Amazon Second Life
              </p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--color-amazon-card-border)', marginTop: '16px', paddingTop: '12px' }}>
            <p style={{ fontSize: '13px', color: '#565959' }}>
              Delivering to: <strong style={{ color: 'var(--color-amazon-text)' }}>{ASHISH.location}</strong>
            </p>
          </div>
        </motion.div>

        {/* Order summary */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.3 }}
          style={{
            background: 'var(--color-amazon-card)',
            border: '1px solid var(--color-amazon-card-border)',
            borderRadius: 'var(--radius-card)',
            padding: '20px',
            marginBottom: '16px',
          }}
        >
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-amazon-text)', marginBottom: '14px' }}>
            Order Summary
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: '#565959' }}>Items:</span>
              <span style={{ fontSize: '13px', color: 'var(--color-amazon-text)' }}>₹{listing.discounted_price.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: '#565959' }}>Delivery:</span>
              <span style={{ fontSize: '13px', color: 'var(--color-amazon-text)' }}>₹0.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: '#565959' }}>You saved:</span>
              <span style={{ fontSize: '13px', color: 'var(--color-amazon-savings)', fontWeight: 600 }}>
                -₹{savings.toLocaleString()} ({listing.discount_percent}% off)
              </span>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid var(--color-amazon-card-border)', margin: '4px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-amazon-price)' }}>Order Total:</span>
              <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-amazon-price)' }}>₹{listing.discounted_price.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment method */}
          <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--color-amazon-card-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>🔒</span>
            <span style={{ fontSize: '13px', color: 'var(--color-amazon-text)' }}>
              Paid via <strong>Amazon Pay</strong>
            </span>
          </div>
        </motion.div>

        {/* Savings card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          style={{
            background: '#FFFFFF',
            border: '1px solid #DDD',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '12px',
          }}
        >
          <p style={{ fontSize: '13px', color: '#111111', fontWeight: 700, marginBottom: '8px' }}>
            Your savings
          </p>
          <p style={{ fontSize: '20px', color: '#067D62', fontWeight: 700, margin: 0 }}>
            ₹270 saved (18% off)
          </p>
          <p style={{ fontSize: '12px', color: '#999999', margin: '8px 0 0' }}>
            vs buying new at ₹1,499
          </p>
        </motion.div>

        {/* Sustainability card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.3 }}
          style={{
            background: '#E6F4EA',
            border: '1px solid #A8D5B5',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{ fontSize: '20px' }}>🌱</span>
            <p style={{ fontSize: '13px', color: '#1A7340', fontWeight: 700, margin: 0 }}>
              1 product given a second life
            </p>
          </div>
          <p style={{ fontSize: '12px', color: '#555555', margin: 0 }}>
            One reverse-logistics journey that never had to happen.
          </p>
        </motion.div>

        {/* Continue shopping button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          style={{ textAlign: 'center' }}
        >
          <button
            onClick={() => router.push('/marketplace')}
            style={{
              padding: '10px 28px',
              background: 'var(--color-amazon-button-primary)',
              border: '1px solid #C8A600',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 400,
              color: 'var(--color-amazon-text)',
              cursor: 'pointer',
              fontFamily: 'var(--font-amazon)',
            }}
          >
            Continue Shopping
          </button>
        </motion.div>

      </div>
    </div>
  )
}
