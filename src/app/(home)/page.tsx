'use client';

import dynamic from 'next/dynamic';

// Dynamically import components to avoid SSR issues
const Index = dynamic(() => import('@/pages/Index'));

export default function HomePage() {
  return (
    <div>
      <Index />
    </div>
  );
}
