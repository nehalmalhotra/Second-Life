'use client'

import Link from 'next/link'

export default function AmazonChrome() {
  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
      {/* ─── Top Bar ─── */}
      <div
        style={{
          background: 'var(--color-amazon-header)',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: '12px',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, cursor: 'default' }}>
          <span style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-amazon)' }}>
            amazon
          </span>
          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 400, marginLeft: '1px' }}>.in</span>
        </div>

        {/* Deliver to */}
        <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0, cursor: 'default' }}>
          <span style={{ fontSize: '11px', color: '#CCCCCC', fontFamily: 'var(--font-amazon)' }}>
            Deliver to Nehal
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 700, fontFamily: 'var(--font-amazon)' }}>
              Patiala 147004
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'stretch',
            height: '38px',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          {/* All dropdown */}
          <div
            style={{
              background: '#E6E6E6',
              display: 'flex',
              alignItems: 'center',
              padding: '0 8px',
              fontSize: '12px',
              color: '#333333',
              fontFamily: 'var(--font-amazon)',
              cursor: 'default',
              borderRight: '1px solid #CDCDCD',
            }}
          >
            All
            <svg width="8" height="8" viewBox="0 0 10 6" fill="none" style={{ marginLeft: '4px' }}>
              <path d="M1 1l4 4 4-4" stroke="#333" strokeWidth="1.5" />
            </svg>
          </div>
          {/* Input */}
          <input
            type="text"
            placeholder="Search Amazon.in"
            readOnly
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              padding: '0 10px',
              fontSize: '14px',
              fontFamily: 'var(--font-amazon)',
              background: '#FFFFFF',
              cursor: 'default',
            }}
          />
          {/* Search button */}
          <div
            style={{
              background: 'var(--color-amazon-orange)',
              width: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'default',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#131921" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
        </div>

        {/* Language */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', flexShrink: 0, cursor: 'default' }}>
          <span style={{ fontSize: '14px' }}>🇮🇳</span>
          <span style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: 700, fontFamily: 'var(--font-amazon)' }}>
            EN
          </span>
          <svg width="8" height="8" viewBox="0 0 10 6" fill="none" style={{ marginLeft: '2px' }}>
            <path d="M1 1l4 4 4-4" stroke="#CCC" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Account */}
        <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0, cursor: 'default' }}>
          <span style={{ fontSize: '11px', color: '#CCCCCC', fontFamily: 'var(--font-amazon)' }}>
            Hello, Nehal
          </span>
          <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 700, fontFamily: 'var(--font-amazon)' }}>
            Account &amp; Lists
          </span>
        </div>

        {/* Returns & Orders */}
        <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0, cursor: 'default' }}>
          <span style={{ fontSize: '11px', color: '#CCCCCC', fontFamily: 'var(--font-amazon)' }}>
            Returns
          </span>
          <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 700, fontFamily: 'var(--font-amazon)' }}>
            &amp; Orders
          </span>
        </div>

        {/* Cart */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0, cursor: 'default', position: 'relative' }}>
          <div style={{ position: 'relative' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-2px',
                background: 'var(--color-secondlife)',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 700,
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-amazon)',
              }}
            >
              3
            </span>
          </div>
          <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 700, fontFamily: 'var(--font-amazon)' }}>
            Cart
          </span>
        </div>
      </div>

      {/* ─── Second Bar (Sub-nav) ─── */}
      <div
        style={{
          background: 'var(--color-amazon-secondary-nav)',
          height: '38px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: '16px',
          overflowX: 'auto',
        }}
      >
        {[
          { label: '☰ All', highlight: false },
          { label: 'Rufus', highlight: false, pill: true },
          { label: 'Fresh', highlight: false },
          { label: 'Prime', highlight: false },
          { label: 'Amazon Business', highlight: false },
          { label: 'MX Player', highlight: false },
          { label: 'Sell', highlight: false },
          { label: 'Gift Cards', highlight: false },
          { label: 'Amazon Pay', highlight: false },
          { label: 'Subscribe & Save', highlight: false },
          { label: 'Buy Again', highlight: false },
          { label: 'Gift Ideas', highlight: false },
          { label: 'Second Life', highlight: true },
          { label: 'Browsing History', highlight: false },
        ].map((item) => {
          const baseStyle: React.CSSProperties = {
            fontSize: '13px',
            color: item.highlight ? 'var(--color-secondlife)' : '#FFFFFF',
            fontWeight: item.highlight ? 700 : 400,
            fontFamily: 'var(--font-amazon)',
            whiteSpace: 'nowrap',
            cursor: item.highlight ? 'pointer' : 'default',
            textDecoration: 'none',
            ...(item.pill
              ? {
                  background: 'rgba(255,255,255,0.12)',
                  padding: '4px 10px',
                  borderRadius: '100px',
                  border: '1px solid rgba(255,255,255,0.25)',
                }
              : {}),
          }

          if (item.highlight) {
            return (
              <Link key={item.label} href="/marketplace" style={baseStyle}>
                {item.label}
              </Link>
            )
          }

          return (
            <span key={item.label} style={baseStyle}>
              {item.label}
            </span>
          )
        })}
      </div>
    </header>
  )
}
