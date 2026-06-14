import type { NotifyStatusResponse } from '@/types'
import { MOCK_NOTIFICATION_NONE, MOCK_NOTIFICATION_PENDING } from '@/data/mockData'

const BASE = 'http://localhost:8000'
const USE_MOCK = false// ← flip to false at integration hour

// Controls mock notification timing for demo
// Set to true to simulate notification already fired (for testing Screen 4)
const MOCK_FORCE_NOTIFICATION = false

let mockNotificationFired = false

export async function checkNotificationStatus(buyerId: string) {
  const res = await fetch(`${BASE}/notify-status/${buyerId}`)
  const data = await res.json()

  console.log("RAW API RESPONSE =", data)

  return data
}
// Call this to simulate the notification firing during demo testing
export function simulateNotification() {
  mockNotificationFired = true
}