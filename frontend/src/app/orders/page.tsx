'use client'

import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function OrdersPage() {
  const router = useRouter()

  return (
    <div style={{ minHeight: '100vh', background: '#F3F3F3' }}>
      <Navbar />
      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '24px 16px' }}>

        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111111', marginBottom: '24px' }}>
          Your Orders
        </h1>

        {/* Order 1 — Phone case, return only */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #DDDDDD',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', color: '#555555' }}>Delivered 14 Jan 2025</span>
            <span style={{ fontSize: '11px', color: '#555555' }}>₹499</span>
          </div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#111111', marginBottom: '12px' }}>
            Amazon Basics Phone Case — iPhone 15
          </p>
          <button
            onClick={() => router.push('/return-flow')}
            style={{
              padding: '8px 16px',
              border: '1px solid #DDDDDD',
              borderRadius: '8px',
              background: '#FFFFFF',
              color: '#111111',
              fontSize: '13px',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Return or Replace
          </button>
        </div>

        {/* Order 2 — boAt speaker, Second Life eligible */}
        <div style={{
          background: '#FFFFFF',
          border: '2px solid #FF9900',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', color: '#555555' }}>Delivered 10 Oct 2024</span>
            <span style={{ fontSize: '11px', color: '#555555' }}>₹1,499</span>
          </div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#111111', marginBottom: '4px' }}>
            boAt Aavante Bar 490 Bluetooth Speaker
          </p>
          <p style={{ fontSize: '12px', color: '#555555', marginBottom: '16px' }}>
            Purchased 8 months ago
          </p>

          {/* Second Life badge only — no earnings preview */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#FFF8E7',
            border: '1px solid #FFD966',
            borderRadius: '6px',
            padding: '6px 10px',
            marginBottom: '14px',
          }}>
            <span style={{ fontSize: '12px' }}>✨</span>
            <span style={{ fontSize: '12px', color: '#856404', fontWeight: 600 }}>
              Eligible for Second Life
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => router.push('/upload')}
              style={{
                flex: 1,
                padding: '11px',
                background: '#FF9900',
                color: '#111111',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Give It a Second Life
            </button>
            <button
              onClick={() => router.push('/return-flow')}
              style={{
                padding: '11px 14px',
                border: '1px solid #DDDDDD',
                borderRadius: '8px',
                background: '#FFFFFF',
                color: '#111111',
                fontSize: '13px',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Return
            </button>
          </div>
        </div>

        {/* Order 3 — Resistance bands, return only */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #DDDDDD',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', color: '#555555' }}>Delivered 3 Mar 2025</span>
            <span style={{ fontSize: '11px', color: '#555555' }}>₹599</span>
          </div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#111111', marginBottom: '12px' }}>
            Boldfit Resistance Bands Set
          </p>
          <button
            onClick={() => router.push('/return-flow')}
            style={{
              padding: '8px 16px',
              border: '1px solid #DDDDDD',
              borderRadius: '8px',
              background: '#FFFFFF',
              color: '#111111',
              fontSize: '13px',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Return or Replace
          </button>
        </div>

      </div>
    </div>
  )
}