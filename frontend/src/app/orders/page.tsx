'use client'

import { useRouter } from 'next/navigation'

interface Order {
  orderId: string
  placed: string
  total: string
  deliveredText: string
  image: string
  title: string
  action: { label: string; kind: 'primary' | 'secondary'; href: string }
}

const orders: Order[] = [
  {
    orderId: 'D01-4799107-0101424',
    placed: '10 Oct 2024',
    total: '₹1,499',
    deliveredText: 'Delivered 10 Oct 2024',
    image: '/products/P009.png',
    title: 'boAt Aavante Bar 490 Bluetooth Speaker',
    action: { label: 'Give It a Second Life', kind: 'primary', href: '/upload' },
  },
  {
    orderId: 'D01-7371857-6504643',
    placed: '22 Mar 2025',
    total: '₹799',
    deliveredText: 'Delivered 22 Mar 2025',
    image: '/products/P004.png',
    title: 'AGARO Majestic Kitchen Tool Set',
    action: { label: 'Return or Replace Items', kind: 'secondary', href: '/return-flow' },
  },
]

export default function OrdersPage() {
  const router = useRouter()

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', fontFamily: 'var(--font-amazon)' }}>
      <main style={{ maxWidth: 1500, margin: '0 auto', padding: '20px 24px 48px' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 13, marginBottom: 14 }}>
          <span style={{ color: 'var(--color-amazon-link)' }}>Your Account</span>
          <span style={{ color: '#565959' }}> › </span>
          <span style={{ color: '#C7511F' }}>Your Orders</span>
        </div>

        {/* Title + search */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 24,
            marginBottom: 18,
            maxWidth: 1040,
            flexWrap: 'wrap',
          }}
        >
          <h1 style={{ fontSize: 28, fontWeight: 500, color: 'var(--color-amazon-text)' }}>Your Orders</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: '1 1 340px', maxWidth: 520 }}>
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#FFFFFF',
                border: '1px solid #888C8C',
                borderRadius: 8,
                padding: '8px 12px',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#565959" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search all orders"
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: '#111' }}
              />
            </div>
            <button
              type="button"
              style={{
                background: '#232F3E',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 8,
                padding: '10px 18px',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Search Orders
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 28, borderBottom: '1px solid #D5D9D9', marginBottom: 20, maxWidth: 1040 }}>
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: 'var(--color-amazon-text)',
              paddingBottom: 10,
              borderBottom: '3px solid var(--color-secondlife)',
              cursor: 'pointer',
            }}
          >
            Orders
          </span>
          <span style={{ fontSize: 15, color: 'var(--color-amazon-link)', paddingBottom: 10, cursor: 'pointer' }}>
            Buy Again
          </span>
          <span style={{ fontSize: 15, color: 'var(--color-amazon-link)', paddingBottom: 10, cursor: 'pointer' }}>
            Not Yet Shipped
          </span>
        </div>

        {/* Order count + range */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <span style={{ fontSize: 14, color: 'var(--color-amazon-text)' }}>
            <strong>{orders.length} orders</strong> placed in
          </span>
          <select
            defaultValue="3m"
            style={{
              fontSize: 14,
              padding: '6px 10px',
              borderRadius: 8,
              border: '1px solid #888C8C',
              background: '#F0F2F2',
              cursor: 'pointer',
            }}
          >
            <option value="3m">past 3 months</option>
            <option value="6m">past 6 months</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>

        {/* Orders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 1040 }}>
          {orders.map((order) => (
            <div
              key={order.orderId}
              style={{
                border: '1px solid #D5D9D9',
                borderRadius: 8,
                overflow: 'hidden',
                background: '#FFFFFF',
              }}
            >
              {/* Gray header strip */}
              <div
                style={{
                  background: '#F0F2F2',
                  borderBottom: '1px solid #D5D9D9',
                  padding: '12px 18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 24,
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
                  <StripField label="ORDER PLACED" value={order.placed} />
                  <StripField label="TOTAL" value={order.total} />
                  <StripField label="SHIP TO" value="Nehal" link />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: '#565959' }}>ORDER # {order.orderId}</div>
                  <div style={{ fontSize: 13, marginTop: 2 }}>
                    <span style={{ color: 'var(--color-amazon-link)', cursor: 'pointer' }}>View order details</span>
                    <span style={{ color: '#D5D9D9', margin: '0 8px' }}>|</span>
                    <span style={{ color: 'var(--color-amazon-link)', cursor: 'pointer' }}>Invoice ▾</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div
                style={{
                  padding: 18,
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 24,
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ flex: '1 1 360px' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-amazon-text)', marginBottom: 12 }}>
                    {order.deliveredText}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <img
                      src={order.image}
                      alt={order.title}
                      style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
                      onError={(e) => {
                        const el = e.target as HTMLImageElement
                        el.style.display = 'none'
                        el.parentElement!.style.background = '#EAEDED'
                      }}
                    />
                    <div style={{ fontSize: 15, color: 'var(--color-amazon-link)', cursor: 'pointer', lineHeight: 1.4 }}>
                      {order.title}
                    </div>
                  </div>
                </div>

                {/* Action button (behavior unchanged) */}
                <div style={{ width: 240, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => router.push(order.action.href)}
                    style={
                      order.action.kind === 'primary'
                        ? {
                            width: '100%',
                            background: '#FF9900',
                            color: '#111111',
                            border: 'none',
                            borderRadius: 8,
                            padding: '12px 16px',
                            fontSize: 14,
                            fontWeight: 700,
                            cursor: 'pointer',
                          }
                        : {
                            width: '100%',
                            background: '#FFFFFF',
                            color: '#111111',
                            border: '1px solid #D5D9D9',
                            borderRadius: 8,
                            padding: '12px 16px',
                            fontSize: 14,
                            fontWeight: 700,
                            cursor: 'pointer',
                          }
                    }
                  >
                    {order.action.label}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

function StripField({ label, value, link }: { label: string; value: string; link?: boolean }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: '#565959', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{label}</div>
      <div
        style={{
          fontSize: 13,
          color: link ? 'var(--color-amazon-link)' : 'var(--color-amazon-text)',
          marginTop: 2,
          cursor: link ? 'pointer' : 'default',
        }}
      >
        {value}
        {link ? ' ▾' : ''}
      </div>
    </div>
  )
}