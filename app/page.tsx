import { Suspense } from 'react';
import { Dashboard } from '@/components/Dashboard';

export default function Home() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8">Loading...</div>}>
      <Dashboard />
    </Suspense>
  );
}
