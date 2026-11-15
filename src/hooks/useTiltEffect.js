import { useCallback, useEffect, useState } from 'react';
import { calculateTiltTransform, INITIAL_TILT_STATE } from '../utils/portfolioLogic.js';
import { useReducedMotion } from './useReducedMotion';

export function useTiltEffect(maxTilt = 10) {
  const prefersReducedMotion = useReducedMotion();
  const [isTouchViewport, setIsTouchViewport] = useState(false);
  const [tilt, setTilt] = useState(INITIAL_TILT_STATE);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const query = window.matchMedia('(hover: none), (max-width: 768px)');
    const sync = () => setIsTouchViewport(query.matches);
    sync();
    if (query.addEventListener) {
      query.addEventListener('change', sync);
      return () => query.removeEventListener('change', sync);
    }
    return undefined;
  }, []);

  const handleMouseMove = useCallback(
    (event) => {
      if (prefersReducedMotion || isTouchViewport) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const nextTilt = calculateTiltTransform(
        event.clientX,
        event.clientY,
        rect,
        maxTilt
      );
      setTilt(nextTilt);
    },
    [prefersReducedMotion, isTouchViewport, maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt(INITIAL_TILT_STATE);
  }, []);

  return {
    tilt,
    isDisabled: prefersReducedMotion || isTouchViewport,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
}
