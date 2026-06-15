import type { NotifyStatusResponse } from '@/types'

const BASE = 'http://localhost:8000'

export async function checkNotificationStatus(buyerId: string): Promise<NotifyStatusResponse> {
  const res = await fetch(`${BASE}/notify-status/${buyerId}`)
  const data = await res.json()
  return data
}

export async function acknowledgeNotification(buyerId: string): Promise<void> {
  await fetch(`${BASE}/notify-ack/${buyerId}`, { method: 'POST' })
}
