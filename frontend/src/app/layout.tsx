import type { Metadata } from 'next'
import './globals.css'
import AmazonChrome from '@/components/AmazonChrome'

export const metadata: Metadata = {
  title: 'Second Life',
  description: 'Give your products a second life',
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
        <AmazonChrome />
        <div style={{ paddingTop: '98px' }}>{children}</div>
      </body>
    </html>
  )
}