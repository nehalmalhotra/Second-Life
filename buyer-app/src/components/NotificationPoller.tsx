'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import NotificationBanner from './NotificationBanner'
import { checkNotificationStatus, acknowledgeNotification } from '@/services/api'
import { ASHISH } from '@/data/mockData'
import type { Notification } from '@/types'

/**
 * Global notification poller. Mounted in the root layout so it polls
 * regardless of which page is active. Shows the notification banner
 * fixed at the top (below chrome) on any page.
 */
export default function NotificationPoller() {
  const router = useRouter()
  const [notification, setNotification] = useState<Notification | null>(null)

  const handleNotificationTap = useCallback(() => {
    // Acknowledge so the backend clears it
    acknowledgeNotification(ASHISH.user_id)
    setNotification(null)
    router.push('/product')
  }, [router])

  // Poll /notify-status/U001 every 3 seconds
  useEffect(() => {
    // Don't poll while a notification is already showing
    if (notification) return

    let active = true

    const poll = async () => {
      if (!active) return
      try {
        const res = await checkNotificationStatus(ASHISH.user_id)
        if (!active) return

        if (res.notification) {
          console.log('[SecondLife Poller] ✅ Notification received!', res.notification)
          setNotification(res.notification)
        }
      } catch {
        // Silently retry on next interval
      }
    }

    poll()
    const interval = setInterval(poll, 3000)

    return () => {
      active = false
      clearInterval(interval)
    }
  }, [notification])

  // Auto-dismiss after 10 seconds and acknowledge
  useEffect(() => {
    if (!notification) return
    const timer = setTimeout(() => {
      acknowledgeNotification(ASHISH.user_id)
      setNotification(null)
    }, 10000)
    return () => clearTimeout(timer)
  }, [notification])

  if (!notification) return null

  return (
    <NotificationBanner
      notification={notification}
      onTap={handleNotificationTap}
    />
  )
}
