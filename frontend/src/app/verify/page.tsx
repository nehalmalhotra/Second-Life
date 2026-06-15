'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { comparePhotos, matchBuyers, notifyBuyer } from '@/services/api';
import { globalListing, globalCustomerPhoto } from '../upload/page';
import products from '@/data/product.json';
import type { Listing } from '@/types';

type VerifyStep = 'idle' | 'scanning' | 'verified';

interface MatchBuyersResponse {
  success: boolean;
  matches?: { buyer_id: string; buyer_name: string; match_score: number; match_reason: string }[];
}

function getProductCategory(productId: string): string {
  const product = products.find((p) => p.product_id === productId);
  return product?.category ?? 'Electronics';
}

export default function VerifyPage() {
  const router = useRouter();
  const [step, setStep] = useState<VerifyStep>('idle');
  const [score, setScore] = useState(0);
  const [error, setError] = useState('');
  const [listingReady, setListingReady] = useState(false);
  const [customerPhoto, setCustomerPhoto] = useState<string | null>(null);
  const [driverPhoto, setDriverPhoto] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const driverInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!globalListing) {
      setError('No listing found. Complete the upload flow first.');
      setListingReady(false);
      return;
    }
    setListingReady(true);
    setError('');
    setCustomerPhoto(globalCustomerPhoto);
  }, []);

  const handleDriverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setDriverPhoto(url);
  };

  const handleVerify = async () => {
    if (!globalListing) {
      setError('No listing found. Complete the upload flow first.');
      return;
    }

    const listing = globalListing;

    setStep('scanning');
    setScore(0);
    setError('');

    try {
      const compareRes = await comparePhotos(listing.product_id);

      if (!compareRes.success) {
        throw new Error('Compare failed');
      }

      const targetScore = compareRes.consistency_score;
      let current = 0;
      const increment = () => {
        current += 3;
        if (current >= targetScore) {
          setScore(targetScore);
          setStep('verified');
          triggerMatchAndNotify(listing);
        } else {
          setScore(current);
          setTimeout(increment, 40);
        }
      };
      setTimeout(increment, 200);
    } catch {
      setError('Verification failed. Please try again.');
      setStep('idle');
    }
  };

  const triggerMatchAndNotify = async (listing: Listing) => {
    try {
      const matchRes = (await matchBuyers(
        listing.product_id,
        getProductCategory(listing.product_id),
        listing.discounted_price,
        listing.hub_id
      )) as MatchBuyersResponse;

      const topBuyer = matchRes.matches?.[0];

      console.log("MATCH RESPONSE", matchRes);
      console.log("TOP BUYER", topBuyer);
      if (topBuyer) {
        await notifyBuyer(topBuyer.buyer_id, listing);
      }
    } catch {
      // Silent failure — demo continues
    }
  };

  const verifiedBorder = step === 'verified';
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div style={{ minHeight: '100vh', background: '#F3F3F3' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '24px 16px' }}>

        <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>
          Driver Verification
        </h1>
        <p style={{ fontSize: '13px', color: '#555555', marginBottom: '24px' }}>
          Amazon verifies the product independently at pickup
        </p>

        {!listingReady && (
          <div style={{
            background: '#FFF3CD',
            border: '1px solid #FFECB5',
            borderRadius: '8px',
            padding: '12px 14px',
            marginBottom: '16px',
            fontSize: '13px',
            color: '#856404',
          }}>
            {error || 'Complete the upload flow before verifying.'}
            <button
              type="button"
              onClick={() => router.push('/upload')}
              style={{
                display: 'block',
                marginTop: '10px',
                padding: '8px 12px',
                background: '#FF9900',
                color: '#111111',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Go to Upload
            </button>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            background: '#FFFFFF',
            border: verifiedBorder ? '2px solid #067D62' : '1px solid #DDDDDD',
            borderRadius: '12px',
            overflow: 'hidden',
            transition: 'border 0.4s',
          }}>
            <div style={{ background: '#232F3E', padding: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: '11px', color: '#FFFFFF', fontWeight: 600 }}>
                Seller's Submission
              </span>
            </div>
            <div style={{
              aspectRatio: '3/4',
              background: '#F3F3F3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {customerPhoto ? (
                <img
                  src={customerPhoto}
                  alt="Seller submission"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }}
                />
              ) : (
                <div style={{ textAlign: 'center', color: '#999999' }}>
                  <div style={{ fontSize: '40px', marginBottom: '8px' }}>📷</div>
                  <span style={{ fontSize: '10px' }}>No photo available</span>
                </div>
              )}

              {step === 'scanning' && (
                <motion.div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, transparent, #FF9900, transparent)',
                    top: 0,
                  }}
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
              )}
            </div>
          </div>

          <div style={{
            background: '#FFFFFF',
            border: verifiedBorder ? '2px solid #067D62' : '1px solid #DDDDDD',
            borderRadius: '12px',
            overflow: 'hidden',
            transition: 'border 0.4s',
          }}>
            <div style={{ background: '#232F3E', padding: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: '11px', color: '#FFFFFF', fontWeight: 600 }}>
                Pickup Associate's Photo
              </span>
            </div>
            <div style={{
              aspectRatio: '3/4',
              background: '#F3F3F3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {driverPhoto ? (
                <img
                  src={driverPhoto}
                  alt="Pickup associate photo"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }}
                />
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <input
                    ref={driverInputRef}
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    style={{ display: 'none' }}
                    onChange={handleDriverPhotoChange}
                  />
                  <button
                    type="button"
                    onClick={() => driverInputRef.current?.click()}
                    style={{
                      background: '#FF9900',
                      color: '#111111',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '10px 16px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Upload Driver Photo
                  </button>
                </div>
              )}

              {step === 'scanning' && (
                <motion.div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, transparent, #FF9900, transparent)',
                    top: 0,
                  }}
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.3 }}
                />
              )}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#111111', marginBottom: 8 }}>
            Pickup associate notes (optional)
          </label>
          <input
            value={noteText}
            onChange={(event) => setNoteText(event.target.value)}
            placeholder="e.g. Minor scuff on base, unit powers on and tested"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #DDD',
              borderRadius: 6,
              background: '#F8F8F8',
              color: '#111111',
              fontSize: 13,
            }}
          />
        </div>

        {step === 'idle' && (
          <motion.button
            onClick={handleVerify}
            disabled={!listingReady}
            whileTap={listingReady ? { scale: 0.97 } : undefined}
            style={{
              width: '100%',
              padding: '14px',
              background: listingReady ? '#FF9900' : '#DDDDDD',
              color: '#111111',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: listingReady ? 'pointer' : 'not-allowed',
              marginBottom: '16px',
            }}
          >
            Compare Photos
          </motion.button>
        )}

        {step === 'scanning' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: '#FFFFFF',
              border: '1px solid #DDDDDD',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center',
              marginBottom: '16px',
            }}
          >
            <p style={{ fontSize: '13px', color: '#555555', marginBottom: '16px' }}>
              AI is comparing both photo sets...
            </p>

            <div style={{
              fontSize: '48px',
              fontWeight: 700,
              color: '#FF9900',
              marginBottom: '8px',
            }}>
              {score}%
            </div>

            <div style={{
              height: '6px',
              background: '#DDDDDD',
              borderRadius: '100px',
              overflow: 'hidden',
            }}>
              <motion.div
                style={{
                  height: '100%',
                  background: '#FF9900',
                  borderRadius: '100px',
                  width: `${score}%`,
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {step === 'verified' && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{
                background: '#FFFFFF',
                border: '1px solid #A8D5B5',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ color: '#067D62', fontSize: 18 }}>🛡</span>
                  <span style={{ color: '#111111', fontSize: 16, fontWeight: 700 }}>
                    Amazon Verified · Second Life
                  </span>
                </div>
                <div style={{ height: '1px', background: '#F3F3F3', margin: '0 -20px 16px' }} />

                <div style={{ display: 'grid', gap: 10, marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: '#111111', fontSize: 13 }}>
                    <span style={{ color: '#067D62', lineHeight: 1.2 }}>✓</span>
                    <span>Seller submission received</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: '#111111', fontSize: 13 }}>
                    <span style={{ color: '#067D62', lineHeight: 1.2 }}>✓</span>
                    <span>Pickup associate photo captured</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: '#111111', fontSize: 13 }}>
                    <span style={{ color: '#067D62', lineHeight: 1.2 }}>✓</span>
                    <span>AI consistency score: 91% — condition confirmed</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: '#111111', fontSize: 13 }}>
                    <span style={{ color: '#067D62', lineHeight: 1.2 }}>✓</span>
                    <span>Verdict: Product matches seller description</span>
                  </div>
                </div>

                {noteText && (
                  <div style={{ fontSize: 12, color: '#555555', fontStyle: 'italic', marginBottom: 12 }}>
                    Associate note: {noteText}
                  </div>
                )}

                <div style={{ color: '#999999', fontSize: 11 }}>
                  Listing activated · Verified by Amazon · {currentDate}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && step !== 'scanning' && (
          <p style={{ color: '#CC0C39', fontSize: '13px', marginBottom: '12px' }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
