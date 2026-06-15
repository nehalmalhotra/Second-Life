'use client'

import { useRouter } from 'next/navigation'

const products = [
  { id: 'P001', name: 'Cello Water Bottle', condition: 'Good', price: '₹244', original: '₹349', image: '/products/P001.png' },
  { id: 'P005', name: 'Boldfit Yoga Mat', condition: 'Like New', price: '₹819', original: '₹999', image: '/products/P005.png' },
  { id: 'P006', name: 'Boldfit Resistance Bands', condition: 'Good', price: '₹419', original: '₹599', image: '/products/P006.png' },
  { id: 'P010', name: 'Zebronics USB Mouse', condition: 'Good', price: '₹174', original: '₹249', image: '/products/P010.png' },
  { id: 'P011', name: 'Desk Lamp', condition: 'Like New', price: '₹655', original: '₹1,199', image: '/products/P011.png' },
  { id: 'P012', name: 'Phone Stand', condition: 'Like New', price: '₹327', original: '₹499', image: '/products/P012.png' },
]

const conditionStyles = {
  'Like New': {
    background: '#E6F4EA',
    color: '#1A7340',
  },
  Good: {
    background: '#E8F0FE',
    color: '#1A56A0',
  },
}

export default function SecondLifeMarketplace() {
  const router = useRouter()

  return (
    <div style={{ minHeight: '100vh', background: '#F3F3F3', paddingTop: 60, paddingBottom: 90 }}>
      <header style={{ position: 'fixed', inset: '0 0 auto 0', zIndex: 20, background: '#131921', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, textTransform: 'lowercase' }}>amazon</span>
          <span style={{ color: '#FF9900', fontSize: 20, fontWeight: 700 }}>second life</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ color: '#FFFFFF', fontSize: 12, lineHeight: 1.3, textAlign: 'right' }}>
            Hello, Rahul
            <div style={{ fontWeight: 700 }}>Account & Lists</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', background: '#FFFFFF', borderRadius: 999, padding: '6px 12px', minWidth: 260, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
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

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px 0' }}>
        <section style={{ marginBottom: 32 }}>
          <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, color: '#111111' }}>Amazon Second Life Marketplace</h1>
          <p style={{ margin: '12px 0 0', fontSize: 16, color: '#555555' }}>AI-verified pre-owned products, available nearby</p>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16 }}>
          {products.map((product) => {
            const badgeStyle = conditionStyles[product.condition as keyof typeof conditionStyles]
            return (
              <div key={product.id} style={{ background: '#FFFFFF', border: '1px solid #DDD', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <img src={product.image} alt={product.name} width={80} height={80} style={{ width: 80, height: 80, objectFit: 'contain', borderRadius: 8 }} />
                <div style={{ fontSize: 13, fontWeight: 700, color: '#111111' }}>{product.name}</div>
                <span style={{ display: 'inline-block', borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 700, ...badgeStyle }}>{product.condition}</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: '#111111' }}>{product.price}</span>
                  <span style={{ fontSize: 12, color: '#999999', textDecoration: 'line-through' }}>{product.original}</span>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#1A7340', fontSize: 11, fontWeight: 700 }}>✓ Amazon Verified</div>
              </div>
            )
          })}
        </section>
      </main>

      <div style={{ position: 'fixed', inset: 'auto 0 0 0', background: '#131921', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, zIndex: 10 }}>
        <div style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 500 }}>Ready to list your product?</div>
        <button
          type="button"
          onClick={() => router.push('/orders')}
          style={{ background: '#FF9900', color: '#111111', border: 'none', borderRadius: 999, padding: '12px 18px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          Give Your Product a Second Life →
        </button>
      </div>
    </div>
  )
}
