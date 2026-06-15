'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroBannerProps {
  /** Image source path (default: /shared-assets/second-life-hero.png) */
  src?: string;
  /** Navigation destination (default: /marketplace) */
  href?: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Aspect ratio width (from source image) */
  aspectWidth?: number;
  /** Aspect ratio height (from source image) */
  aspectHeight?: number;
}

export default function HeroBanner({
  src = '/shared-assets/second-life-hero.png',
  href = '/marketplace',
  alt = 'Browse the Second Life pre-owned marketplace',
  aspectWidth = 1500,
  aspectHeight = 300,
}: HeroBannerProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={href} style={{ cursor: 'pointer', display: 'block' }}>
      <div
        style={{
          width: '100%',
          aspectRatio: `${aspectWidth} / ${aspectHeight}`,
          position: 'relative',
          background: imageError ? 'var(--color-amazon-page-bg)' : 'transparent',
        }}
      >
        {!imageError && (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            priority
            onError={() => setImageError(true)}
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>
    </Link>
  );
}
