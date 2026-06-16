'use client'

import { useRouter } from 'next/navigation'

type Condition = 'Like New' | 'Good' | 'Acceptable'

interface Listing {
  name: string
  price: number
  mrp: number
  condition: Condition
  delivery: 'Same Day' | 'Next Day'
  image: string
  description: string
}

const listings: Listing[] = [
  {
    name: 'Cello Water Bottle',
    price: 244,
    mrp: 349,
    condition: 'Good',
    delivery: 'Same Day',
    image: '/products/P001.png',
    description:
      'Light signs of use, no stains or odors. The lid seals tightly and the original cap is included.',
  },
  {
    name: 'Zenith Thermosteel Flask',
    price: 573,
    mrp: 699,
    condition: 'Like New',
    delivery: 'Same Day',
    image: '/products/P002.png',
    description:
      'Used only a few times; interior and exterior look nearly new. Insulation performance is intact.',
  },
  {
    name: 'AGARO Kitchen Tool Set',
    price: 439,
    mrp: 799,
    condition: 'Acceptable',
    delivery: 'Same Day',
    image: '/products/P004.png',
    description:
      'Minor scratches and slight discoloration from regular use. All pieces are present and functional.',
  },
  {
    name: 'Boldfit Yoga Mat',
    price: 819,
    mrp: 999,
    condition: 'Like New',
    delivery: 'Same Day',
    image: '/products/P005.png',
    description:
      'Surface is clean with minimal compression and no stains. Carry bag and strap are included.',
  },
  {
    name: 'Boldfit Resistance Bands',
    price: 419,
    mrp: 599,
    condition: 'Good',
    delivery: 'Next Day',
    image: '/products/P006.png',
    description:
      'All bands retain their elasticity and show only light surface wear. Carry pouch is included.',
  },
  {
    name: 'Zebronics USB Mouse',
    price: 174,
    mrp: 249,
    condition: 'Good',
    delivery: 'Next Day',
    image: '/products/P010.png',
    description:
      'Fully functional with minor scuffs on the shell and base. USB cable is intact and buttons click cleanly.',
  },
  {
    name: 'Desk Lamp',
    price: 655,
    mrp: 1199,
    condition: 'Like New',
    delivery: 'Same Day',
    image: '/products/P011.png',
    description:
      'Barely used with no flicker; brightness levels and touch controls all work as expected.',
  },
  {
    name: 'Phone Stand',
    price: 327,
    mrp: 499,
    condition: 'Like New',
    delivery: 'Next Day',
    image: '/products/P012.png',
    description:
      'Sturdy hinge with no wobble. Foldable design and grip pads are in excellent condition.',
  },
]

const conditionStyles: Record<Condition, { bg: string; color: string; border: string }> = {
  'Like New': { bg: '#E8F5EC', color: '#1A7340', border: '#B5E0C2' },
  Good: { bg: '#E7F0FA', color: '#0F4C81', border: '#C9DDF2' },
  Acceptable: { bg: '#FBF3D9', color: '#8A6D1B', border: '#EAD79A' },
}

export default function SecondLifeMarketplace() {
  const router = useRouter()
  const pct = (price: number, mrp: number) => Math.round((1 - price / mrp) * 100)

  return (
    <div
      style={{
        background: 'var(--color-amazon-page-bg)',
        minHeight: '100vh',
        fontFamily: 'var(--font-amazon)',
      }}
    >
      <div style={{ maxWidth: '1500px', margin: '0 auto', padding: '24px 24px 48px' }}>
        {/* ─── Header (CTA button sits top-right, Amazon-style) ─── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '24px',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <p style={{ fontSize: '13px', marginBottom: '6px' }}>
              <span style={{ color: 'var(--color-amazon-link)' }}>Amazon.in</span>
              <span style={{ color: '#565959' }}> › Second Life</span>
            </p>
            <h1
              style={{
                fontSize: '32px',
                fontWeight: 700,
                color: 'var(--color-amazon-text)',
                lineHeight: 1.1,
              }}
            >
              Second Life near you
            </h1>
            <p style={{ fontSize: '14px', color: '#565959', marginTop: '4px' }}>
              Patiala · Verified by Amazon AI
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              onClick={() => router.push('/orders')}
              style={{
                background: 'var(--color-secondlife)',
                color: '#111111',
                border: 'none',
                borderRadius: '999px',
                padding: '12px 22px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'var(--font-amazon)',
                whiteSpace: 'nowrap',
              }}
            >
              Give Your Product a Second Life
            </button>
            <span style={{ fontSize: '14px', color: '#565959' }}>
              8 results in Second Life near you
            </span>
          </div>
        </div>

        {/* ─── Body: filter sidebar + results grid ─── */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          {/* Filter sidebar */}
          <aside
            style={{
              width: '300px',
              flexShrink: 0,
              background: 'var(--color-amazon-card)',
              border: '1px solid var(--color-amazon-card-border)',
              borderRadius: 'var(--radius-card)',
              boxShadow: 'var(--shadow-card)',
              padding: '20px',
            }}
          >
            <FilterGroup
              title="Category"
              type="checkbox"
              options={['Home & Kitchen', 'Sports & Fitness', 'Electronics']}
            />
            <FilterGroup
              title="Condition"
              type="checkbox"
              options={['Like New', 'Good', 'Acceptable']}
            />
            <FilterGroup
              title="Price range"
              type="radio"
              name="price"
              options={['Under ₹300', '₹300–₹600', '₹600–₹1000', 'Over ₹1000']}
            />
            <button
              type="button"
              style={{
                marginTop: '16px',
                background: '#F0F2F2',
                border: '1px solid #D5D9D9',
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--color-amazon-text)',
                cursor: 'pointer',
                fontFamily: 'var(--font-amazon)',
              }}
            >
              Clear
            </button>
          </aside>

          {/* Results grid */}
          <div
            style={{
              flex: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
            }}
          >
            {listings.map((item) => {
              const cs = conditionStyles[item.condition]
              return (
                <div
                  key={item.name}
                  style={{
                    background: 'var(--color-amazon-card)',
                    border: '1px solid var(--color-amazon-card-border)',
                    borderRadius: 'var(--radius-card)',
                    boxShadow: 'var(--shadow-card)',
                    padding: '18px',
                    display: 'flex',
                    gap: '18px',
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      width: '140px',
                      height: '140px',
                      flexShrink: 0,
                      background: '#F7F7F7',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      padding: '10px',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      onError={(e) => {
                        const el = e.target as HTMLImageElement
                        el.style.display = 'none'
                        el.parentElement!.style.background = '#EAEDED'
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h2
                      style={{
                        fontSize: '18px',
                        fontWeight: 500,
                        color: 'var(--color-amazon-link)',
                        marginBottom: '8px',
                      }}
                    >
                      {item.name}
                    </h2>

                    <span
                      style={{
                        display: 'inline-block',
                        background: cs.bg,
                        color: cs.color,
                        border: `1px solid ${cs.border}`,
                        borderRadius: '999px',
                        padding: '3px 12px',
                        fontSize: '12px',
                        fontWeight: 700,
                        marginBottom: '10px',
                      }}
                    >
                      {item.condition}
                    </span>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '8px',
                        marginBottom: '8px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-amazon-text)' }}
                      >
                        ₹{item.price}
                      </span>
                      <span style={{ fontSize: '13px', color: '#565959' }}>
                        M.R.P.: <span style={{ textDecoration: 'line-through' }}>₹{item.mrp}</span>
                      </span>
                      <span style={{ fontSize: '13px', color: '#C7511F' }}>
                        ({pct(item.price, item.mrp)}% off)
                      </span>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: '10px',
                        fontSize: '13px',
                      }}
                    >
                      <span style={{ color: 'var(--color-amazon-savings)', fontWeight: 700 }}>
                        ✓ Amazon Verified
                      </span>
                      <span style={{ color: 'var(--color-amazon-text)' }}>📦 {item.delivery}</span>
                    </div>

                    <p
                      style={
                        {
                          fontSize: '13px',
                          color: '#565959',
                          lineHeight: 1.45,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        } as React.CSSProperties
                      }
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterGroup({
  title,
  type,
  options,
  name,
}: {
  title: string
  type: 'checkbox' | 'radio'
  options: string[]
  name?: string
}) {
  return (
    <div style={{ marginBottom: '22px' }}>
      <h3
        style={{
          fontSize: '17px',
          fontWeight: 700,
          color: 'var(--color-amazon-text)',
          marginBottom: '10px',
        }}
      >
        {title}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {options.map((opt) => (
          <label
            key={opt}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: 'var(--color-amazon-text)',
              cursor: 'pointer',
            }}
          >
            <input type={type} name={name} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
            {opt}
          </label>
        ))}
      </div>
    </div>
  )
}