import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Amazon Second Life',
  description: 'Give your products a second life',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}