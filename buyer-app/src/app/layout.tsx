import './globals.css'
import AmazonChrome from '@/components/AmazonChrome'
import NotificationPoller from '@/components/NotificationPoller'
import TitleManager from '@/components/TitleManager'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Online Shopping',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <TitleManager />
        <AmazonChrome />
        <NotificationPoller />
        <div style={{ paddingTop: '98px' }}>{children}</div>
      </body>
    </html>
  )
}