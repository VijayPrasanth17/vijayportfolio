import { useMousePosition } from '../hooks/useMousePosition';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function GradientBackground() {
  const prefersReducedMotion = useReducedMotion();
  const { normalizedX, normalizedY } = useMousePosition();

  const offsetA = prefersReducedMotion
    ? 'translate3d(0, 0, 0)'
    : `translate3d(${normalizedX * -18}px, ${normalizedY * -14}px, 0)`;

  const offsetB = prefersReducedMotion
    ? 'translate3d(0, 0, 0)'
    : `translate3d(${normalizedX * 16}px, ${normalizedY * 14}px, 0)`;

  return (
    <div className="gradient-backdrop" aria-hidden="true">
      <div className="gradient-orb gradient-orb-violet" style={{ transform: offsetA }} />
      <div className="gradient-orb gradient-orb-cyan" style={{ transform: offsetB }} />
    </div>
  );
}
