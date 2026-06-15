'use client'

import { useRouter } from 'next/navigation'
import ListingCard from '@/components/ListingCard'
import { BROWSE_LISTINGS } from '@/data/mockData'

export default function MarketplacePage() {
  const router = useRouter()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-amazon-page-bg)', fontFamily: 'var(--font-amazon)' }}>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>

        {/* Breadcrumb / Section header */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
            <span style={{ fontSize: '12px', color: 'var(--color-amazon-link)' }}>Amazon.in</span>
            <span style={{ fontSize: '12px', color: '#565959' }}>›</span>
            <span style={{ fontSize: '12px', color: '#565959' }}>Second Life</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-amazon-text)' }}>
              Second Life near you
            </h1>
            <span style={{ fontSize: '13px', color: '#565959' }}>
              1-{BROWSE_LISTINGS.length} of {BROWSE_LISTINGS.length} results
            </span>
          </div>
          <p style={{ fontSize: '13px', color: '#565959', marginTop: '2px' }}>
            Patiala · Verified by Amazon AI
          </p>
        </div>

        {/* Listing cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {BROWSE_LISTINGS.map((listing) => (
            <ListingCard
              key={listing.product_id}
              listing={listing}
              isHighlighted={false}
              onClick={listing.product_id === 'P009' ? () => router.push('/product') : undefined}
            />
          ))}
        </div>

        {/* Wishlist match note */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--color-amazon-card-border)',
          borderRadius: 'var(--radius-card)',
          padding: '12px 14px',
          marginTop: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <span style={{ fontSize: '16px' }}>🎯</span>
          <span style={{ fontSize: '13px', color: 'var(--color-amazon-link)', fontWeight: 500 }}>
            Showing items from your wishlist categories: Electronics, Baby Products, Toys &amp; Games
          </span>
        </div>

      </div>
    </div>
  )
}
