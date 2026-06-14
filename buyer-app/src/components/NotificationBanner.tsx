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
        top: '68px',
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
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#111111' }}>
              amazon <span style={{ color: '#FF9900' }}>second life</span>
            </p>
            <p style={{ fontSize: '10px', color: '#999999' }}>Just now</p>
          </div>

          {/* Main text */}
          <p style={{ fontSize: '13px', color: '#111111', fontWeight: 600, marginBottom: '3px' }}>
            {notification.listing_title.split(' — ')[0]} near you
          </p>

          {/* Details row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '11px', fontWeight: 600,
              background: '#E6F4EA', color: '#1A7340',
              padding: '2px 8px', borderRadius: '100px',
            }}>
              {notification.condition_badge}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#111111' }}>
              ₹{notification.discounted_price.toLocaleString()}
            </span>
            <span style={{ fontSize: '11px', color: '#067D62', fontWeight: 600 }}>
              · {notification.estimated_delivery}
            </span>
          </div>
        </div>
      </div>

      {/* Tap hint */}
      <div style={{
        marginTop: '10px',
        paddingTop: '10px',
        borderTop: '1px solid #F3F3F3',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <span style={{ fontSize: '12px', color: '#FF9900', fontWeight: 600 }}>
          Tap to view listing →
        </span>
      </div>
    </motion.div>
  )
}