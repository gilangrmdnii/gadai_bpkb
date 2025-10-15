'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  var gtag: (...args: any[]) => void;
}

export default function GtagTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams ? `?${searchParams.toString()}` : '');
    if (typeof window !== 'undefined' && typeof gtag === 'function') {
      gtag('event', 'page_view', { page_path: url });
    }
  }, [pathname, searchParams]);

  return null;
}
