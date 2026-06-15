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
  const driverInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!globalListing) {
      setError('No listing found. Complete the upload flow first.');
      setListingReady(false);
      return;
    }
    setListingReady(true);
    setError('');
    // Load the customer photo from the upload flow
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

        {/* Two photo panels */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          {/* Customer photo */}
          <div style={{
            background: '#FFFFFF',
            border: verifiedBorder ? '2px solid #067D62' : '1px solid #DDDDDD',
            borderRadius: '12px',
            overflow: 'hidden',
            transition: 'border 0.4s',
          }}>
            <div style={{
              background: '#232F3E',
              padding: '8px',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '11px', color: '#FFFFFF', fontWeight: 600 }}>
                Customer Submission
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
                  alt="Customer submission"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    padding: '8px',
                  }}
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

          {/* Driver photo */}
          <div style={{
            background: '#FFFFFF',
            border: verifiedBorder ? '2px solid #067D62' : '1px solid #DDDDDD',
            borderRadius: '12px',
            overflow: 'hidden',
            transition: 'border 0.4s',
          }}>
            <div style={{
              background: '#37475A',
              padding: '8px',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '11px', color: '#FFFFFF', fontWeight: 600 }}>
                Driver Photo at Pickup
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
                  alt="Driver photo"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    padding: '8px',
                  }}
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
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2">
                      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
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
                border: '1px solid #DDDDDD',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                marginBottom: '16px',
              }}>
                <div style={{ fontSize: '48px', fontWeight: 700, color: '#067D62' }}>
                  {score}%
                </div>
                <p style={{ fontSize: '13px', color: '#555555' }}>Consistency Score</p>

                <div style={{
                  height: '6px',
                  background: '#DDDDDD',
                  borderRadius: '100px',
                  overflow: 'hidden',
                  marginTop: '12px',
                }}>
                  <div style={{
                    height: '100%',
                    background: '#067D62',
                    borderRadius: '100px',
                    width: `${score}%`,
                    transition: 'width 0.5s ease',
                  }} />
                </div>
              </div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                style={{
                  background: '#E6F4EA',
                  border: '2px solid #067D62',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  marginBottom: '16px',
                }}
              >
                <div style={{ fontSize: '36px', marginBottom: '8px' }}>✅</div>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1A7340', marginBottom: '6px' }}>
                  Amazon Verified
                </h2>
                <p style={{ fontSize: '13px', color: '#555555', marginBottom: '4px' }}>
                  Two-point verification complete.
                </p>
                <p style={{ fontSize: '13px', color: '#555555', marginBottom: '4px' }}>
                  Condition confirmed.
                </p>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#1A7340' }}>
                  Listing activated.
                </p>
              </motion.div>

              {error && (
                <p style={{ color: '#CC0C39', fontSize: '13px', marginBottom: '12px' }}>
                  {error}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
