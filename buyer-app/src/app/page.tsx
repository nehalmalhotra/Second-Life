'use client'

import HeroBanner from '@/components/HeroBanner';

export default function HomePage() {
  return (
    <div style={{ background: 'var(--color-amazon-page-bg)', minHeight: '100vh', fontFamily: 'var(--font-amazon)' }}>

      {/* ─── Hero Banner ─── */}
      <HeroBanner />

      {/* ─── Card Grid Section ─── */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px 16px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
        }}
      >
        {/* Card: Pick up where you left off */}
        <SectionCard title="Pick up where you left off">
          <ProductGrid
            items={[
              { image: '/products/boat-rockerz-255.png', caption: 'boAt Rockerz 255' },
              { image: '/products/fire-boltt-ninja.png', caption: 'Fire-Boltt Ninja' },
              { image: '/products/noise-colorfit.png', caption: 'Noise ColorFit' },
              { image: '/products/jbl-tune-230nc.png', caption: 'JBL Tune 230NC' },
            ]}
          />
        </SectionCard>

        {/* Card: Keep shopping for */}
        <SectionCard title="Keep shopping for">
          <ProductGrid
            items={[
              { image: '/products/samsung-galaxy-buds.png', caption: 'Samsung Galaxy Buds' },
              { image: '/products/sony-wh1000xm4.png', caption: 'Sony WH-1000XM4' },
              { image: '/products/kindle-paperwhite.png', caption: 'Kindle Paperwhite' },
              { image: '/products/echo-dot-5th-gen.png', caption: 'Echo Dot 5th Gen' },
            ]}
          />
        </SectionCard>

        {/* Card: Continue shopping deals */}
        <SectionCard title="Continue shopping deals">
          <ProductGrid
            items={[
              { image: '/products/mi-power-bank-20000.png', caption: 'Mi Power Bank 20000' },
              { image: '/products/boat-airdopes-141.png', caption: 'boAt Airdopes 141' },
              { image: '/products/realme-buds-air-5.png', caption: 'Realme Buds Air 5' },
              { image: '/products/oneplus-nord-buds-2.png', caption: 'OnePlus Nord Buds 2' },
            ]}
          />
        </SectionCard>

        {/* Card: Bulk discounts promo */}
        <SectionCard title="Bulk discounts for you">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div
              style={{
                background: '#FEF8E7',
                border: '1px solid #F5D679',
                borderRadius: '6px',
                padding: '12px',
              }}
            >
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-amazon-text)' }}>
                Up to 70% off
              </p>
              <p style={{ fontSize: '12px', color: '#565959' }}>
                Certified refurbished electronics
              </p>
            </div>
            <div
              style={{
                background: '#F0F8F0',
                border: '1px solid #A8D5B5',
                borderRadius: '6px',
                padding: '12px',
              }}
            >
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-amazon-text)' }}>
                Buy 2, save extra 10%
              </p>
              <p style={{ fontSize: '12px', color: '#565959' }}>
                Second Life bundles — limited time
              </p>
            </div>
            <div
              style={{
                background: '#FFF4F0',
                border: '1px solid #F5C0A8',
                borderRadius: '6px',
                padding: '12px',
              }}
            >
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-amazon-text)' }}>
                Subscribe & Save 15%
              </p>
              <p style={{ fontSize: '12px', color: '#565959' }}>
                Monthly essentials auto-delivery
              </p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}

/* ─── Sub-components (local, not exported) ─── */

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'var(--color-amazon-card)',
        border: '1px solid var(--color-amazon-card-border)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        padding: '16px',
      }}
    >
      <h2
        style={{
          fontSize: '16px',
          fontWeight: 700,
          color: 'var(--color-amazon-text)',
          marginBottom: '12px',
          fontFamily: 'var(--font-amazon)',
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  )
}

function ProductGrid({ items }: { items: { image: string; caption: string }[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
      {items.map((item) => (
        <div key={item.caption}>
          <div
            style={{
              width: '100%',
              aspectRatio: '1',
              background: '#F7F7F7',
              borderRadius: '4px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '6px',
              padding: '8px',
            }}
          >
            <img
              src={item.image}
              alt={item.caption}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
              onError={(e) => {
                const el = e.target as HTMLImageElement
                el.style.display = 'none'
                el.parentElement!.style.background = '#EAEDED'
              }}
            />
          </div>
          <p
            style={{
              fontSize: '12px',
              color: 'var(--color-amazon-text)',
              fontFamily: 'var(--font-amazon)',
              lineHeight: 1.3,
            }}
          >
            {item.caption}
          </p>
        </div>
      ))}
    </div>
  )
}
