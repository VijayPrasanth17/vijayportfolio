import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useMousePosition() {
  const prefersReducedMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });

  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') {
      return undefined;
    }

    let rafId = null;
    let latestEvent = null;

    const update = () => {
      rafId = null;
      if (!latestEvent) return;
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      const normalizedX = (latestEvent.clientX / width) * 2 - 1;
      const normalizedY = (latestEvent.clientY / height) * 2 - 1;
      setPosition({
        x: latestEvent.clientX,
        y: latestEvent.clientY,
        normalizedX,
        normalizedY,
      });
    };

    const handleMouseMove = (event) => {
      latestEvent = event;
      if (rafId === null) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [prefersReducedMotion]);

  return position;
}
