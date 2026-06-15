'use client'

import { useRouter } from 'next/navigation'

export default function OrdersPage() {
  const router = useRouter()

  return (
    <div style={{ minHeight: '100vh', background: '#F3F3F3' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 20, background: '#131921', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
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

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px 40px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111111', marginBottom: 24 }}>Your Orders</h1>

        <div style={{ display: 'grid', gap: 16 }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #DDD', borderRadius: 8, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
              <img
                src="/products/P009.png"
                alt="boAt Aavante Bar 490 Bluetooth Speaker"
                width={60}
                height={60}
                style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }}
              />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#111111', marginBottom: 4 }}>
                  boAt Aavante Bar 490 Bluetooth Speaker
                </div>
                <div style={{ fontSize: 12, color: '#555555' }}>Delivered 10 Oct 2024</div>
              </div>
            </div>

            <div style={{ fontSize: 18, fontWeight: 700, color: '#111111', marginBottom: 16 }}>₹1,499</div>

            <div style={{ background: '#FFF8E7', border: '1px solid #FFD966', borderRadius: 8, padding: 10, marginBottom: 16, color: '#7A5E10', fontSize: 13, lineHeight: 1.5 }}>
              ✨ Eligible for Second Life — earn ₹1,229 with same-day pickup
            </div>

            <button
              onClick={() => router.push('/upload')}
              style={{ width: '100%', background: '#FF9900', color: '#111111', border: 'none', borderRadius: 8, padding: '14px 16px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
            >
              Give It a Second Life
            </button>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #DDD', borderRadius: 8, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
              <img
                src="/products/P004.png"
                alt="AGARO Majestic Kitchen Tool Set"
                width={60}
                height={60}
                style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }}
              />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#111111', marginBottom: 4 }}>
                  AGARO Majestic Kitchen Tool Set
                </div>
                <div style={{ fontSize: 12, color: '#555555' }}>Delivered 22 Mar 2025</div>
              </div>
            </div>

            <div style={{ fontSize: 18, fontWeight: 700, color: '#111111', marginBottom: 16 }}>₹799</div>

            <button
              onClick={() => router.push('/return-flow')}
              style={{ width: '100%', background: '#F3F3F3', color: '#111111', border: '1px solid #DDD', borderRadius: 8, padding: '14px 16px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
            >
              Return or Replace Items
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}