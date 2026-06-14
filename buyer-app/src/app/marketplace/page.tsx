'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import ListingCard from '@/components/ListingCard'
import NotificationBanner from '@/components/NotificationBanner'
import { checkNotificationStatus } from '@/services/api'
import { BROWSE_LISTINGS, ASHISH } from '@/data/mockData'
import type { Notification } from '@/types'

export default function MarketplacePage() {
  const router = useRouter()
  const [notification, setNotification] = useState<Notification | null>(null)
  const [notificationShown, setNotificationShown] = useState(false)
  const [highlightedProduct, setHighlightedProduct] = useState<string | null>(null)
  const [isPolling, setIsPolling] = useState(true)

  const handleNotificationTap = useCallback(() => {
    setNotification(null)
    router.push('/product')
  }, [router])

  // Poll /notify-status every 3 seconds
  useEffect(() => {
    if (!isPolling || notificationShown) return

    const poll = async () => {
      try {
        const res = await checkNotificationStatus(ASHISH.user_id)

console.log("RES =", res)
console.log("RES.NOTIFICATION =", res.notification)
console.log("NOTIFICATION RESPONSE", res)

if (res.notification && !notificationShown) {
  console.log("FOUND NOTIFICATION")
  setNotification(res.notification)
  setNotificationShown(true)
  setHighlightedProduct(res.notification.product_id)
  setIsPolling(false)
}
      } catch {
        // silent — keep polling
      }
    }

    poll() // run immediately
    const interval = setInterval(poll, 3000)
    return () => clearInterval(interval)
  }, [isPolling, notificationShown])

  // Auto-dismiss notification after 8 seconds
  useEffect(() => {
    if (!notification) return
    const timer = setTimeout(() => setNotification(null), 8000)
    return () => clearTimeout(timer)
  }, [notification])

  return (
    <div style={{ minHeight: '100vh', background: '#F3F3F3' }}>
      <Navbar showSearch searchQuery="bluetooth speaker" />
      console.log("CURRENT NOTIFICATION STATE =", notification)
      <div style={{color:'red', fontSize:'20px'}}>
  {notification ? 'NOTIFICATION RECEIVED' : 'NO NOTIFICATION'}
</div>

      {/* Notification banner — slides in from top */}
      {notification && (
        <NotificationBanner
          notification={notification}
          onTap={handleNotificationTap}
        />
      )}

      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '20px 16px' }}>

        {/* Second Life section header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#111111' }}>
            Second Life near you
          </h1>
          <span style={{ fontSize: '12px', color: '#555555' }}>
            {BROWSE_LISTINGS.length} results
          </span>
        </div>

        <p style={{ fontSize: '12px', color: '#555555', marginBottom: '16px' }}>
          Andheri, Mumbai · Verified by Amazon AI
        </p>

        {/* Polling status indicator */}
        {isPolling && !notificationShown && (
          <div style={{
            background: '#FFF8E7',
            border: '1px solid #FFD966',
            borderRadius: '8px',
            padding: '8px 12px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#FF9900',
              animation: 'pulse 1.5s ease-in-out infinite',
            }} />
            <span style={{ fontSize: '12px', color: '#856404', fontWeight: 500 }}>
              Checking for new listings near you...
            </span>
          </div>
        )}

        {/* Listing cards */}
        {BROWSE_LISTINGS.map((listing) => (
          <ListingCard
            key={listing.product_id}
            listing={listing}
            isHighlighted={highlightedProduct === listing.product_id}
            onClick={listing.product_id === 'P009' ? () => router.push('/product') : undefined}
          />
        ))}

        {/* Wishlist match note */}
        <div style={{
          background: '#E8F0FE',
          border: '1px solid #A8C4F0',
          borderRadius: '8px',
          padding: '10px 14px',
          marginTop: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span style={{ fontSize: '14px' }}>🎯</span>
          <span style={{ fontSize: '12px', color: '#1A56A0', fontWeight: 500 }}>
            Showing items from your wishlist categories: Electronics, Baby Products, Toys &amp; Games
          </span>
        </div>

      </div>
    </div>
  )
}
