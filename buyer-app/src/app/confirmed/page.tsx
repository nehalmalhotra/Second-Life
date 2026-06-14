'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import { RAHUL_LISTING, ASHISH } from '@/data/mockData'

export default function ConfirmedPage() {
  const router = useRouter()
  const listing = RAHUL_LISTING
  const today = new Date()
  const deliveryTime = '8:00 PM'

  return (
    <div style={{ minHeight: '100vh', background: '#F3F3F3' }}>
      <Navbar />

      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '40px 16px' }}>

        {/* Green check animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{
            width: '96px', height: '96px',
            background: '#E6F4EA',
            border: '3px solid #067D62',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: '48px',
          }}
        >
          ✓
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          style={{ textAlign: 'center', marginBottom: '32px' }}
        >
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1A7340', marginBottom: '8px' }}>
            Order Confirmed!
          </h1>
          <p style={{ fontSize: '14px', color: '#555555' }}>
            Thank you, {ASHISH.name}. Your order is on its way.
          </p>
        </motion.div>

        {/* Order summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          style={{
            background: '#FFFFFF',
            border: '1px solid #DDDDDD',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', gap: '14px', marginBottom: '16px' }}>
            <div style={{
              width: '56px', height: '56px',
              background: '#F3F3F3', borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', flexShrink: 0,
            }}>
              🔊
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#111111', marginBottom: '4px' }}>
                boAt Aavante Bar 490 Bluetooth Speaker
              </p>
              <p style={{ fontSize: '12px', color: '#555555' }}>
                Condition: Like New · Amazon Verified
              </p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #F3F3F3', paddingTop: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', color: '#555555' }}>Amount paid</span>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#111111' }}>
                ₹{listing.discounted_price.toLocaleString()}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', color: '#555555' }}>You saved</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#067D62' }}>
                ₹{(listing.original_price - listing.discounted_price).toLocaleString()} ({listing.discount_percent}% off)
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: '#555555' }}>Payment</span>
              <span style={{ fontSize: '13px', color: '#111111' }}>Amazon Pay</span>
            </div>
          </div>
        </motion.div>

        {/* Delivery info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          style={{
            background: '#E6F4EA',
            border: '1px solid #A8D5B5',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px',
            display: 'flex',
            gap: '14px',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '32px', flexShrink: 0 }}>🚚</span>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 700, color: '#1A7340', marginBottom: '2px' }}>
              Estimated Delivery: Today by {deliveryTime}
            </p>
            <p style={{ fontSize: '12px', color: '#555555' }}>
              Delivering to {ASHISH.location}
            </p>
            <p style={{ fontSize: '12px', color: '#555555' }}>
              From Bhiwandi hub · Amazon Second Life
            </p>
          </div>
        </motion.div>

        {/* Amazon Pay logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            background: '#FFFFFF',
            border: '1px solid #DDDDDD',
            borderRadius: '12px',
            padding: '14px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <span style={{ fontSize: '20px' }}>🔒</span>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#131921' }}>
            amazon <span style={{ color: '#FF9900' }}>Pay</span>
          </span>
          <span style={{ fontSize: '12px', color: '#555555' }}>· Payment secured</span>
        </motion.div>

        {/* View order button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          onClick={() => router.push('/marketplace')}
          style={{
            width: '100%',
            padding: '14px',
            background: '#FF9900',
            color: '#111111',
            border: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: 700,
            cursor: 'pointer',
            marginBottom: '12px',
          }}
        >
          Continue Shopping
        </motion.button>

      </div>
    </div>
  )
}