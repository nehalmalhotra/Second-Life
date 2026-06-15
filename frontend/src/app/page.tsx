'use client'

import { useRouter } from 'next/navigation'

const products = [
  { name: 'Boldfit Resistance Bands', price: '₹419', original: '₹599' },
  { name: 'Cello Water Bottle', price: '₹244', original: '₹349' },
  { name: 'Zebronics USB Mouse', price: '₹174', original: '₹249' },
  { name: 'AGARO Kitchen Tool Set', price: '₹439', original: '₹799' },
  { name: 'Boldfit Yoga Mat', price: '₹819', original: '₹999' },
  { name: 'Ambrane Phone Stand', price: '₹279', original: '₹399' },
]

export default function Home() {
  const router = useRouter()

  return (
    <div style={{ minHeight: '100vh', background: '#F3F3F3', padding: '0 16px' }}>
      <header style={{ background: '#131921', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, textTransform: 'lowercase' }}>amazon</span>
          <span style={{ color: '#FF9900', fontSize: 20, fontWeight: 700 }}>second life</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ color: '#FFFFFF', fontSize: 12, lineHeight: 1.3, textAlign: 'right' }}>
            Hello, Rahul
            <div style={{ fontWeight: 700 }}>Account & Lists</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', background: '#FFFFFF', borderRadius: 999, padding: '6px 12px', minWidth: 280, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <input
              type="text"
              placeholder="Search Second Life"
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 12, color: '#111' }}
            />
            <button
              type="button"
              style={{ border: 'none', background: '#FF9900', borderRadius: 999, padding: '8px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
            >
              Search
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#FFFFFF', fontSize: 14 }}>
            <span style={{ fontSize: 18 }}>&#128722;</span>
            <span>Cart</span>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 0 48px' }}>
        <section style={{ width: '100%', position: 'relative', overflow: 'hidden', borderRadius: 12, background: 'linear-gradient(135deg, #131921 0%, #232F3E 100%)', minHeight: 200, display: 'flex', alignItems: 'center', padding: 24, marginBottom: 32 }}>
          <img
            src="/second-life-hero.png"
            alt="Second Life"
            style={{ width: '360px', maxWidth: '100%', objectFit: 'cover', borderRadius: 12, boxShadow: '0 16px 40px rgba(0,0,0,0.25)' }}
          />
          <div style={{ marginLeft: 32, maxWidth: 600, color: '#FFFFFF' }}>
            <h1 style={{ margin: 0, fontSize: 40, lineHeight: 1.05, color: '#FF9900' }}>Amazon Second Life</h1>
            <p style={{ margin: '16px 0 24px', fontSize: 16, lineHeight: 1.6, maxWidth: 520 }}>The trust of buying new, at the price of pre-owned.</p>
            <button
              type="button"
              onClick={() => router.push('/orders')}
              style={{ background: '#FF9900', color: '#111111', border: 'none', borderRadius: 999, padding: '14px 22px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
            >
              Give Your Product a Second Life
            </button>
          </div>
        </section>

        <section style={{ background: '#FFFFFF', padding: 24, borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h2 style={{ margin: 0, marginBottom: 20, color: '#111111', fontSize: 20, fontWeight: 700 }}>Today's Deals</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16 }}>
            {products.map((product) => (
              <div key={product.name} style={{ background: '#FFFFFF', border: '1px solid #DDD', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#111111' }}>{product.name}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#111111' }}>{product.price}</div>
                <div style={{ fontSize: 12, color: '#999999', textDecoration: 'line-through' }}>{product.original}</div>
                <span style={{ display: 'inline-block', background: '#E6F4EA', color: '#1A7340', borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 700, width: 'fit-content' }}>Second Life</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#232F3E', borderRadius: 12, padding: 24, marginTop: 32, textAlign: 'center' }}>
          <p style={{ margin: 0, marginBottom: 16, color: '#FFFFFF', fontSize: 16, fontWeight: 500 }}>Have a product gathering dust?</p>
          <button
            type="button"
            onClick={() => router.push('/orders')}
            style={{ background: '#FF9900', color: '#111111', border: 'none', borderRadius: 999, padding: '14px 22px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
          >
            List it on Second Life →
          </button>
        </section>
      </main>
    </div>
  )
}
