'use client'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import ListingCard from '@/components/ListingCard'
import { BROWSE_LISTINGS } from '@/data/mockData'

export default function MarketplacePage() {
  const router = useRouter()

  // Derive a simple category from the listing title using keywords
  const deriveCategory = (title: string) => {
    const t = title.toLowerCase()
    if (t.includes('mouse') || t.includes('lamp') || t.includes('phone') || t.includes('usb') || t.includes('adapter')) return 'Electronics'
    if (t.includes('kitchen') || t.includes('bottle') || t.includes('flask') || t.includes('kitchen tool') || t.includes('thermosteel')) return 'Home & Kitchen'
    if (t.includes('yoga') || t.includes('resistance') || t.includes('mat') || t.includes('bands')) return 'Sports & Fitness'
    return 'Other'
  }

  const listingsWithCategory = useMemo(() => {
    return BROWSE_LISTINGS.map((l) => ({ ...l, _category: deriveCategory(l.listing_title) }))
  }, [])

  const allCategories = useMemo(() => {
    const s = new Set<string>()
    listingsWithCategory.forEach((l) => s.add(l._category))
    return Array.from(s)
  }, [listingsWithCategory])

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {}
    allCategories.forEach((c) => { init[c] = false })
    return init
  })
  const [selectedConditions, setSelectedConditions] = useState<Record<string, boolean>>({ 'Like New': false, Good: false, Acceptable: false })
  const [priceRange, setPriceRange] = useState<string | null>(null)

  const toggleCategory = (c: string) => setSelectedCategories((s) => ({ ...s, [c]: !s[c] }))
  const toggleCondition = (c: string) => setSelectedConditions((s) => ({ ...s, [c]: !s[c] }))

  const filtered = useMemo(() => {
    const activeCats = Object.entries(selectedCategories).filter(([, v]) => v).map(([k]) => k)
    const activeConds = Object.entries(selectedConditions).filter(([, v]) => v).map(([k]) => k)

    return listingsWithCategory.filter((l) => {
      // Category filter
      if (activeCats.length > 0 && !activeCats.includes(l._category)) return false
      // Condition filter
      if (activeConds.length > 0 && !activeConds.includes(l.condition_badge)) return false
      // Price filter on discounted_price
      if (priceRange) {
        const p = l.discounted_price
        if (priceRange === 'under300' && !(p < 300)) return false
        if (priceRange === '300-600' && !(p >= 300 && p <= 600)) return false
        if (priceRange === '600-1000' && !(p > 600 && p <= 1000)) return false
        if (priceRange === 'over1000' && !(p > 1000)) return false
      }
      return true
    })
  }, [listingsWithCategory, selectedCategories, selectedConditions, priceRange])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-amazon-page-bg)', fontFamily: 'var(--font-amazon)' }}>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>

        {/* Breadcrumb / Section header */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
            <span style={{ fontSize: '12px', color: 'var(--color-amazon-link)' }}>Amazon.in</span>
            <span style={{ fontSize: '12px', color: '#565959' }}>›</span>
            <span style={{ fontSize: '12px', color: '#565959' }}>Second Life</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-amazon-text)' }}>
              Second Life near you
            </h1>

            {/* Right side: static CTA (visual only) above the results count.
                Mirrors the seller's functional button placement; intentionally
                NOT clickable on the buyer side. */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
              <span
                style={{
                  background: 'var(--color-secondlife)',
                  color: '#111111',
                  borderRadius: '999px',
                  padding: '10px 20px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'default',
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                  fontFamily: 'var(--font-amazon)',
                }}
              >
                Give Your Product a Second Life
              </span>
              <span style={{ fontSize: '13px', color: '#565959' }}>
                {filtered.length} results in Second Life near you
              </span>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: '#565959', marginTop: '2px' }}>
            Patiala · Verified by Amazon AI
          </p>
        </div>

        {/* Main layout: filters + results */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>

          {/* Left filter rail */}
          <aside style={{ width: '200px', position: 'sticky', top: 16, alignSelf: 'flex-start' }}>
            <div style={{ background: '#fff', border: '1px solid var(--color-amazon-card-border)', borderRadius: '6px', padding: '12px' }}>

              {/* Category section */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontWeight: 700, marginBottom: '8px' }}>Category</div>
                {allCategories.map((c) => (
                  <label key={c} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginBottom: '6px' }}>
                    <input type="checkbox" checked={!!selectedCategories[c]} onChange={() => toggleCategory(c)} />
                    <span>{c}</span>
                  </label>
                ))}
              </div>

              {/* Condition section */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontWeight: 700, marginBottom: '8px' }}>Condition</div>
                {['Like New', 'Good', 'Acceptable'].map((c) => (
                  <label key={c} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginBottom: '6px' }}>
                    <input type="checkbox" checked={!!selectedConditions[c]} onChange={() => toggleCondition(c)} />
                    <span>{c}</span>
                  </label>
                ))}
              </div>

              {/* Price range section */}
              <div>
                <div style={{ fontWeight: 700, marginBottom: '8px' }}>Price range</div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginBottom: '6px' }}>
                  <input type="radio" name="price" checked={priceRange === 'under300'} onChange={() => setPriceRange('under300')} />
                  <span>Under ₹300</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginBottom: '6px' }}>
                  <input type="radio" name="price" checked={priceRange === '300-600'} onChange={() => setPriceRange('300-600')} />
                  <span>₹300–₹600</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginBottom: '6px' }}>
                  <input type="radio" name="price" checked={priceRange === '600-1000'} onChange={() => setPriceRange('600-1000')} />
                  <span>₹600–₹1000</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginBottom: '6px' }}>
                  <input type="radio" name="price" checked={priceRange === 'over1000'} onChange={() => setPriceRange('over1000')} />
                  <span>Over ₹1000</span>
                </label>
                <div style={{ marginTop: '8px' }}>
                  <button onClick={() => { setPriceRange(null); setSelectedConditions({ 'Like New': false, Good: false, Acceptable: false }); const reset: Record<string, boolean> = {}; allCategories.forEach((c) => { reset[c] = false }); setSelectedCategories(reset) }} style={{ fontSize: '13px', padding: '6px 8px' }}>Clear</button>
                </div>
              </div>

            </div>
          </aside>

          {/* Results area */}
          <main style={{ flex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {filtered.map((listing) => (
                <ListingCard
                  key={listing.product_id}
                  listing={listing}
                  isHighlighted={false}
                  onClick={listing.product_id === 'P009' ? () => router.push('/product') : undefined}
                />
              ))}
            </div>

            {/* Wishlist match note (kept) */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid var(--color-amazon-card-border)',
              borderRadius: 'var(--radius-card)',
              padding: '12px 14px',
              marginTop: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{ fontSize: '16px' }}>🎯</span>
              <span style={{ fontSize: '13px', color: 'var(--color-amazon-link)', fontWeight: 500 }}>
                Showing items from your wishlist categories: Electronics, Baby Products, Toys &amp; Games
              </span>
            </div>

          </main>

        </div>

      </div>
    </div>
  )
}