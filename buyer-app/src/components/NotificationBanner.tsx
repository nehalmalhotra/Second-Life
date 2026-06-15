'use client'

import { motion } from 'framer-motion'
import type { Notification } from '@/types'

interface Props {
  notification: Notification
  onTap: () => void
}

export default function NotificationBanner({ notification, onTap }: Props) {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onClick={onTap}
      style={{
        position: 'fixed',
        top: '106px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: '448px',
        background: '#FFFFFF',
        border: '2px solid #FF9900',
        borderRadius: '12px',
        padding: '14px 16px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        cursor: 'pointer',
        zIndex: 200,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        {/* Bell icon */}
        <div style={{
          width: '36px', height: '36px',
          background: '#FFF8E7',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          fontSize: '18px',
        }}>
          🔔
        </div>

        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '13px', color: '#111111', fontWeight: 700, marginBottom: '6px' }}>
            A verified Second Life item matching your interests is available nearby
          </p>

          <p style={{ fontSize: '12px', color: '#555555', margin: 0, lineHeight: 1.4 }}>
            {notification.listing_title.split(' — ')[0]} · {notification.condition_badge} · ₹{notification.discounted_price.toLocaleString()} · {notification.estimated_delivery}
          </p>
        </div>
      </div>

      <div style={{
        marginTop: '10px',
        paddingTop: '10px',
        borderTop: '1px solid #F3F3F3',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <span style={{ fontSize: '12px', color: '#FF9900', fontWeight: 600, padding: '6px 12px', borderRadius: '999px', background: '#FFF6E5' }}>
          Tap to view →
        </span>
      </div>
    </motion.div>
  )
}