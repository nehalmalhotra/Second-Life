'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ReturnFlowPage() {
  const router = useRouter()
  const [step, setStep] = useState<'form' | 'confirmed'>('form')
  const [selectedReason, setSelectedReason] = useState('')
  const [comment, setComment] = useState('')
  const [preview, setPreview] = useState('')

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
    } else {
      setPreview('')
    }
  }

  if (step === 'confirmed') {
    return (
      <div style={{ minHeight: '100vh', background: '#F3F3F3' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', background: '#FFFFFF', borderRadius: 999, padding: '6px 12px', minWidth: 260, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <input type="text" placeholder="Search Second Life" style={{ flex: 1, border: 'none', outline: 'none', fontSize: 12, color: '#111' }} />
              <button type="button" style={{ border: 'none', background: '#FF9900', borderRadius: 999, padding: '8px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Search</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#FFFFFF', fontSize: 14 }}>
              <span style={{ fontSize: 18 }}>&#128722;</span>
              <span>Cart</span>
            </div>
          </div>
        </header>

        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 16px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: 48, color: '#1A7340', fontWeight: 700, lineHeight: 1 }}>✓</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111111', margin: '20px 0 12px' }}>Return Submitted</h1>
            <p style={{ fontSize: 16, color: '#555555', maxWidth: 560, margin: '0 auto' }}>
              We'll arrange a pickup soon. A refund of ₹799 will be issued within 3–5 business days once we receive the item.
            </p>
          </div>

          <button
            onClick={() => router.push('/orders')}
            style={{ width: '100%', maxWidth: 360, margin: '0 auto', display: 'block', background: '#FF9900', color: '#111111', border: 'none', borderRadius: 8, padding: '14px 16px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
          >
            Back to Your Orders
          </button>
        </main>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F3F3F3' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', background: '#FFFFFF', borderRadius: 999, padding: '6px 12px', minWidth: 260, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <input type="text" placeholder="Search Second Life" style={{ flex: 1, border: 'none', outline: 'none', fontSize: 12, color: '#111' }} />
            <button type="button" style={{ border: 'none', background: '#FF9900', borderRadius: 999, padding: '8px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Search</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#FFFFFF', fontSize: 14 }}>
            <span style={{ fontSize: 18 }}>&#128722;</span>
            <span>Cart</span>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 16px 40px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111111', marginBottom: 24 }}>Return or Replace Items</h1>

        <section style={{ background: '#FFFFFF', border: '1px solid #DDD', borderRadius: 8, padding: 16, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img
              src="/products/P004.png"
              alt="AGARO Majestic Kitchen Tool Set"
              width={60}
              height={60}
              style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }}
            />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111111', marginBottom: 4 }}>AGARO Majestic Kitchen Tool Set</div>
              <div style={{ fontSize: 12, color: '#555555', marginBottom: 4 }}>Order placed 22 Mar 2025</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#111111' }}>₹799</div>
            </div>
          </div>
        </section>

        <section style={{ background: '#FFFFFF', border: '1px solid #DDD', borderRadius: 8, padding: 16, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111111', marginBottom: 12 }}>Why are you returning this?</h2>
          <select
            value={selectedReason}
            onChange={(event) => setSelectedReason(event.target.value)}
            style={{ width: '100%', padding: '12px 14px', border: '1px solid #CCC', borderRadius: 6, background: '#FFFFFF', fontSize: 14, color: '#111111' }}
          >
            <option value="">Select a reason</option>
            <option value="Wrong Size">Item doesn't fit</option>
            <option value="Gift Duplicate">Received an extra one as a gift</option>
            <option value="Outgrown / No Longer Needed">No longer needed</option>
            <option value="Changed Mind">Bought by mistake / changed my mind</option>
            <option value="Not as Described">Item not as described</option>
            <option value="Defective">Item defective or doesn't work</option>
          </select>
        </section>

        <section style={{ background: '#FFFFFF', border: '1px solid #DDD', borderRadius: 8, padding: 16, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111111', marginBottom: 12 }}>Add a photo of the item</h2>
          <p style={{ fontSize: 14, color: '#555555', margin: '0 0 12px' }}>This helps us process your return faster.</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', borderRadius: 6, background: '#FFFFFF', color: '#111111' }}
          />
          {preview ? (
            <img src={preview} alt="Preview" style={{ marginTop: 16, width: 80, height: 80, objectFit: 'cover', borderRadius: 8, border: '1px solid #DDD' }} />
          ) : null}
        </section>

        <section style={{ background: '#FFFFFF', border: '1px solid #DDD', borderRadius: 8, padding: 16, marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 16, fontWeight: 700, color: '#111111', marginBottom: 12 }}>
            Additional comments (optional)
          </label>
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Any other details about the condition"
            rows={4}
            style={{ width: '100%', padding: '12px 14px', border: '1px solid #CCC', borderRadius: 6, background: '#FFFFFF', color: '#111111', fontSize: 14, resize: 'vertical' }}
          />
        </section>

        <button
          onClick={() => setStep('confirmed')}
          style={{ width: '100%', background: '#FF9900', color: '#111111', border: 'none', borderRadius: 8, padding: '16px 18px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}
        >
          Submit Return
        </button>
      </main>
    </div>
  )
}
