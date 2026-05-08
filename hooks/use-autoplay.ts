'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

export function useAutoplay<T extends HTMLElement = HTMLDivElement>(options?: {
  rootMargin?: string;
  threshold?: number;
}): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setActive(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh && rect.bottom > 0) {
      setActive(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
            io.disconnect();
            break;
          }
        }
      },
      {
        rootMargin: options?.rootMargin ?? '0px 0px -10% 0px',
        threshold: options?.threshold ?? 0,
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [options?.rootMargin, options?.threshold]);

  return [ref, active];
}
