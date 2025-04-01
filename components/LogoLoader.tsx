// components/LogoLoader.tsx
'use client';

import dynamic from 'next/dynamic';

const AnimatedLogoClient = dynamic(() => import('./AnimatedLogoClient'), { ssr: false });

export default function LogoLoader() {
  return <AnimatedLogoClient />;
}