'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import ConditionBadge from '@/components/ConditionBadge'
import { analyzeProduct, generateListing, matchBuyers, notifyBuyer } from '@/services/api'
import type { AnalyzeResponse, Listing } from '@/types'

type Step = 'upload' | 'loading' | 'result' | 'not_eligible' | 'confirmed'

export let globalListing: Listing | null = null
export let globalAnalyzeResult: AnalyzeResponse | null = null
export let globalCustomerPhoto: string | null = null

const LOADING_MESSAGES = [
  'Uploading your photos...',
  'Running AI visual assessment...',
  'Analysing condition and wear...',
  'Generating condition report...',
]

const SLOT_LABELS = ['Product Front', 'Product Side', 'Packaging']

interface UploadPageProps {
  productId?: string
  productName?: string
  returnReason?: string | null
  isReturnFlow?: boolean
}

export default function UploadPage({
  productId = 'P009',
  productName = 'boAt Aavante Bar 490 Bluetooth Speaker',
  returnReason = null,
  isReturnFlow = false,
}: UploadPageProps) {
  const router = useRouter()
  const [step, setStep] = useState<Step>('upload')
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0)
  const [analyzeResult, setAnalyzeResult] = useState<AnalyzeResponse | null>(null)
  const [listing, setListing] = useState<Listing | null>(null)
  const [notEligibleReason, setNotEligibleReason] = useState('')
  const [comment, setComment] = useState('')
  const [previews, setPreviews] = useState<string[]>(['','',''])
  const [files, setFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
  ])
  const fileInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const handleFileChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
  
    if (!file) return
  
    const url = URL.createObjectURL(file)
  
    setPreviews(prev => {
      const next = [...prev]
      next[index] = url
      // Persist the first uploaded photo globally for the verify page
      if (!globalCustomerPhoto || index === 0) {
        globalCustomerPhoto = next.find(p => p !== '') || null
      }
      return next
    })
  
    setFiles(prev => {
      const next = [...prev]
      next[index] = file
      return next
    })
  }

  const handleAnalyze = async () => {
    setStep('loading')
    let idx = 0
    const msgInterval = setInterval(() => {
      idx += 1
      if (idx < LOADING_MESSAGES.length) setLoadingMsgIndex(idx)
      else clearInterval(msgInterval)
    }, 900)

    try {
      const validFiles = files.filter(
        (f): f is File => f !== null
      )
      console.log('FILES BEING SENT', validFiles)
      
      const analyzeRes = await analyzeProduct(
        productId,
        returnReason,
        comment,
        validFiles
      )
      clearInterval(msgInterval)

      const listingRes = await generateListing(analyzeRes, returnReason)

      // Handle not eligible case
      if (!listingRes.success) {
        setNotEligibleReason(listingRes.error ?? 'Item not eligible for Second Life.')
        setStep('not_eligible')
        return
      }

      globalAnalyzeResult = analyzeRes
      globalListing = listingRes.listing!
      setAnalyzeResult(analyzeRes)
      if (!listingRes.listing) return

      setListing(listingRes.listing)
      setStep('result')
    } catch {
      clearInterval(msgInterval)
    }
  }

  const handleConfirm = () => setStep('confirmed')

  const handleContinueToVerification = () => router.push('/verify')

  const scoreColor = (condition: string) => {
    if (condition === 'Like New') return '#1A7340'
    if (condition === 'Good') return '#1A56A0'
    return '#856404'
  }

  const scoreBg = (condition: string) => {
    if (condition === 'Like New') return '#E6F4EA'
    if (condition === 'Good') return '#E8F0FE'
    return '#FFF3CD'
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F3F3F3' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '24px 16px' }}>

        {/* Return flow banner */}
        {isReturnFlow && (
          <div style={{
            background: '#232F3E',
            borderRadius: '8px',
            padding: '10px 14px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ fontSize: '16px' }}>↩️</span>
            <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 600 }}>
              Amazon Return — AI Grading
            </span>
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* ── UPLOAD ── */}
          {step === 'upload' && (
            <motion.div key="upload"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
            >
              <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>
                {isReturnFlow ? 'Upload Return Photos' : 'Upload Product Photos'}
              </h1>
              <p style={{ fontSize: '13px', color: '#555555', marginBottom: isReturnFlow ? '8px' : '20px' }}>
                {productName}
              </p>

              {/* Return reason chip */}
              {isReturnFlow && returnReason && (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: '#E8F0FE', border: '1px solid #A8C4F0',
                  borderRadius: '100px', padding: '4px 12px', marginBottom: '16px',
                }}>
                  <span style={{ fontSize: '12px', color: '#1A56A0', fontWeight: 600 }}>
                    Return reason: {returnReason}
                  </span>
                </div>
              )}

              {/* 3 photo slots — now with real file input */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                {SLOT_LABELS.map((label, i) => (
                  <div key={i}>
                    <input
                      ref={fileInputRefs[i]}
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileChange(i, e)}
                    />
                    <div
                      onClick={() => fileInputRefs[i].current?.click()}
                      style={{
                        aspectRatio: '1',
                        border: previews[i] ? '2px solid #FF9900' : '2px dashed #DDDDDD',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#FFFFFF',
                        cursor: 'pointer',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      {previews[i] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={previews[i]}
                          alt={label}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <>
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                            stroke="#AAAAAA" strokeWidth="1.5">
                            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                            <circle cx="12" cy="13" r="4"/>
                          </svg>
                          <span style={{ fontSize: '10px', color: '#999999', marginTop: '6px', textAlign: 'center', padding: '0 4px' }}>
                            {label}
                          </span>
                        </>
                      )}
                    </div>
                    <p style={{ fontSize: '10px', color: '#999999', textAlign: 'center', marginTop: '4px' }}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Photo count indicator */}
              <div style={{
                background: previews.length > 0 ? '#E6F4EA' : '#F3F3F3',
                border: `1px solid ${previews.length > 0 ? '#A8D5B5' : '#DDDDDD'}`,
                borderRadius: '8px',
                padding: '10px 14px',
                marginBottom: '16px',
                fontSize: '12px',
                color: previews.length > 0 ? '#1A7340' : '#555555',
              }}>
                {previews.length === 0
                  ? 'Tap each box to upload a photo'
                  : previews.length < 3
                  ? `${previews.length}/3 photos added — add more for better accuracy`
                  : '✓ 3 photos ready — tap Analyze to continue'}
              </div>

              {/* Optional comment textarea */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '12px', color: '#555555', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Additional notes (optional)
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="E.g. charger missing, small scratch on side, doesn't power on..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #DDDDDD',
                    borderRadius: '8px',
                    fontSize: '13px',
                    color: '#111111',
                    background: '#FFFFFF',
                    resize: 'none',
                    fontFamily: 'inherit',
                    outline: 'none',
                  }}
                />
              </div>

              <button
                onClick={handleAnalyze}
                disabled={previews.length === 0}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: previews.length === 0 ? '#DDDDDD' : '#FF9900',
                  color: previews.length === 0 ? '#999999' : '#111111',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: previews.length === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                {isReturnFlow ? 'Analyze Return' : 'Analyze Product'}
              </button>
            </motion.div>
          )}

          {/* ── LOADING ── */}
          {step === 'loading' && (
            <motion.div key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', minHeight: '60vh', textAlign: 'center',
              }}
            >
              <div style={{ marginBottom: '32px' }}>
                <span style={{ color: '#131921', fontSize: '28px', fontWeight: 700 }}>amazon</span>
                <span style={{ color: '#FF9900', fontSize: '28px', fontWeight: 700 }}>AI</span>
              </div>
              <div style={{
                width: '56px', height: '56px',
                border: '4px solid #DDDDDD', borderTop: '4px solid #FF9900',
                borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '28px',
              }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <AnimatePresence mode="wait">
                <motion.p key={loadingMsgIndex}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
                  style={{ fontSize: '15px', color: '#111111', fontWeight: 500, marginBottom: '12px' }}
                >
                  {LOADING_MESSAGES[loadingMsgIndex]}
                </motion.p>
              </AnimatePresence>
              <p style={{ fontSize: '12px', color: '#999999' }}>
                Amazon AI is verifying your product...
              </p>
            </motion.div>
          )}

          {/* ── NOT ELIGIBLE (refurbishment route) ── */}
          {step === 'not_eligible' && (
            <motion.div key="not_eligible"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div style={{
                background: '#FFFFFF', border: '2px solid #CC0C39',
                borderRadius: '12px', padding: '28px 24px', textAlign: 'center', marginBottom: '16px',
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔧</div>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#CC0C39', marginBottom: '8px' }}>
                  Not Eligible for Second Life
                </h2>
                <p style={{ fontSize: '13px', color: '#555555', lineHeight: '1.6', marginBottom: '16px' }}>
                  {notEligibleReason || 'Based on the AI assessment, this item requires refurbishment before it can be listed.'}
                </p>
                <div style={{
                  background: '#FFF3CD', border: '1px solid #FFD966',
                  borderRadius: '8px', padding: '12px', textAlign: 'left',
                }}>
                  <p style={{ fontSize: '12px', color: '#856404', fontWeight: 600, marginBottom: '4px' }}>
                    What happens next?
                  </p>
                  <p style={{ fontSize: '12px', color: '#555555', lineHeight: '1.5' }}>
                    Amazon will route this item to a refurbishment partner. Once repaired, it may qualify for the Second Life marketplace.
                  </p>
                </div>
              </div>
              <button
                onClick={() => router.push('/orders')}
                style={{
                  width: '100%', padding: '14px',
                  background: '#FF9900', color: '#111111',
                  border: 'none', borderRadius: '8px',
                  fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                }}
              >
                Back to Orders
              </button>
            </motion.div>
          )}

          {/* ── RESULT ── */}
          {step === 'result' && analyzeResult && listing && (
            <motion.div key="result"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            >
              <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px' }}>
                AI Assessment Complete
              </h1>

              {/* Condition card */}
              <div style={{
                background: '#FFFFFF', border: '1px solid #DDDDDD',
                borderRadius: '12px', padding: '24px', marginBottom: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{
                    width: '80px', height: '80px', borderRadius: '50%',
                    background: scoreBg(analyzeResult.condition),
                    border: `4px solid ${scoreColor(analyzeResult.condition)}`,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <span style={{ fontSize: '22px', fontWeight: 700, color: scoreColor(analyzeResult.condition) }}>
                      {analyzeResult.score}
                    </span>
                    <span style={{ fontSize: '9px', color: scoreColor(analyzeResult.condition), fontWeight: 600 }}>/100</span>
                  </div>
                  <div>
                    <ConditionBadge condition={analyzeResult.condition} size="lg" />
                    <p style={{ fontSize: '12px', color: '#555555', marginTop: '6px' }}>
                      Confidence: {analyzeResult.confidence}%
                    </p>
                  </div>
                </div>

                <div style={{ background: '#F3F3F3', borderRadius: '8px', padding: '12px', marginBottom: '16px' }}>
                  <p style={{ fontSize: '11px', color: '#999999', marginBottom: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    AI Assessment
                  </p>
                  <p style={{ fontSize: '13px', color: '#111111', lineHeight: '1.5' }}>
                    {analyzeResult.ai_description}
                  </p>
                </div>

                {/* Attributes — safe check */}
                {analyzeResult.attributes && (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '4px 8px', borderRadius: '4px', fontSize: '11px',
                      background: analyzeResult.attributes.packaging_intact ? '#E6F4EA' : '#FCE8E8',
                      color: analyzeResult.attributes.packaging_intact ? '#1A7340' : '#8B1A1A',
                    }}>
                      {analyzeResult.attributes.packaging_intact ? '✓ Packaging intact' : '✗ Packaging missing'}
                    </span>
                    <span style={{
                      padding: '4px 8px', borderRadius: '4px', fontSize: '11px',
                      background: analyzeResult.attributes.product_complete ? '#E6F4EA' : '#FCE8E8',
                      color: analyzeResult.attributes.product_complete ? '#1A7340' : '#8B1A1A',
                    }}>
                      {analyzeResult.attributes.product_complete ? '✓ Product complete' : '✗ Missing parts'}
                    </span>
                    <span style={{
                      padding: '4px 8px', borderRadius: '4px', fontSize: '11px',
                      background: '#E8F0FE', color: '#1A56A0',
                    }}>
                      Wear: {analyzeResult.attributes.visible_wear}
                    </span>
                  </div>
                )}
              </div>

              {/* Pricing card */}
              <div style={{
                background: '#FFFFFF', border: '1px solid #DDDDDD',
                borderRadius: '12px', padding: '20px', marginBottom: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}>
                <p style={{ fontSize: '11px', color: '#999999', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
                  Second Life Pricing
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '12px', color: '#999999', textDecoration: 'line-through' }}>
                      Original ₹{listing.original_price.toLocaleString()}
                    </p>
                    <p style={{ fontSize: '28px', fontWeight: 700, color: '#111111' }}>
                      ₹{listing.discounted_price.toLocaleString()}
                    </p>
                    <p style={{ fontSize: '12px', color: '#067D62', fontWeight: 600 }}>
                      {listing.discount_percent}% off — {listing.condition_badge}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '12px', color: '#555555' }}>📦 {listing.estimated_delivery}</p>
                    <p style={{ fontSize: '11px', color: '#999999', marginTop: '4px' }}>Pickup from your location</p>
                  </div>
                </div>
              </div>

              {/* Return label if applicable */}
              {isReturnFlow && (
                <div style={{
                  background: '#E6F4EA', border: '2px solid #067D62',
                  borderRadius: '12px', padding: '14px', textAlign: 'center', marginBottom: '16px',
                }}>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#1A7340' }}>
                    ✅ Amazon Verified Return — {listing.condition_badge}
                  </p>
                </div>
              )}

              <button
                onClick={handleConfirm}
                style={{
                  width: '100%', padding: '14px',
                  background: '#FF9900', color: '#111111',
                  border: 'none', borderRadius: '8px',
                  fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                }}
              >
                Confirm — List My Product
              </button>
            </motion.div>
          )}

          {/* ── CONFIRMED ── */}
          {step === 'confirmed' && listing && (
            <motion.div key="confirmed"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }} style={{ textAlign: 'center', padding: '40px 0' }}
            >
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                style={{
                  width: '80px', height: '80px', background: '#E6F4EA',
                  borderRadius: '50%', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', margin: '0 auto 24px',
                }}
              >
                <span style={{ fontSize: '40px' }}>✓</span>
              </motion.div>

              <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#1A7340', marginBottom: '8px' }}>
                Listing Confirmed!
              </h1>
              <p style={{ fontSize: '14px', color: '#555555', marginBottom: '24px' }}>
                {listing.listing_title}
              </p>

              <div style={{
                background: '#FFFFFF', border: '1px solid #DDDDDD',
                borderRadius: '12px', padding: '20px', marginBottom: '28px', textAlign: 'left',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#555555' }}>Your earnings</span>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#111111' }}>
                    ₹{listing.discounted_price.toLocaleString()}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#555555' }}>Delivery</span>
                  <span style={{ fontSize: '13px', color: '#067D62' }}>{listing.estimated_delivery}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', color: '#555555' }}>Status</span>
                  <span style={{ fontSize: '13px', color: '#FF9900', fontWeight: 600 }}>
                    ⏳ Pending verification
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '13px', color: '#555555', marginBottom: '24px', lineHeight: '1.5' }}>
                A driver will pick up your product and verify its condition independently.
              </p>

              {!isReturnFlow && (
                <button
                  onClick={handleContinueToVerification}
                  style={{
                    width: '100%', padding: '14px',
                    background: '#FF9900', color: '#111111',
                    border: 'none', borderRadius: '8px',
                    fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                  }}
                >
                  Continue to Verification →
                </button>
              )}

              {isReturnFlow && (
                <button
                  onClick={() => router.push('/orders')}
                  style={{
                    width: '100%', padding: '14px',
                    background: '#FF9900', color: '#111111',
                    border: 'none', borderRadius: '8px',
                    fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                  }}
                >
                  Back to Orders
                </button>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}