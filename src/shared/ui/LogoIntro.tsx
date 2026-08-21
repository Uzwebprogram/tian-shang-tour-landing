import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion';

const HOLD_MS = 2400;
const EXIT_MS = 650;

/**
 * Controls the static #boot-splash from index.html:
 * hold → fade out → remove. No second overlay, no Suspense "…".
 */
export function LogoIntro() {
  const reduce = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const splash = document.getElementById('boot-splash');
    if (!splash) return;

    document.documentElement.classList.add('logo-intro-active');
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (reduce) {
      splash.remove();
      document.documentElement.classList.remove('logo-intro-active');
      document.body.style.overflow = prevOverflow;
      return;
    }

    const exitTimer = window.setTimeout(() => {
      splash.style.transition = `opacity ${EXIT_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      splash.style.opacity = '0';
      splash.style.pointerEvents = 'none';
    }, HOLD_MS);

    const doneTimer = window.setTimeout(() => {
      splash.remove();
      document.documentElement.classList.remove('logo-intro-active');
      document.body.style.overflow = prevOverflow;
    }, HOLD_MS + EXIT_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      document.documentElement.classList.remove('logo-intro-active');
      document.body.style.overflow = prevOverflow;
    };
  }, [ready, reduce]);

  return null;
}
