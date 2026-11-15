import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function ParticleBackground() {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let animationFrameId = null;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const pointer = { x: -9999, y: -9999, active: false };

    const getParticleCount = (viewportWidth) => {
      if (viewportWidth < 640) return 26;
      if (viewportWidth < 1024) return 44;
      return 68;
    };

    let particles = [];

    const createParticles = () => {
      const count = getParticleCount(width);
      particles = Array.from({ length: count }, (_, index) => {
        const isCyan = index % 3 === 0;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.42,
          vy: (Math.random() - 0.5) * 0.42,
          radius: Math.random() * 1.6 + 1.1,
          color: isCyan ? '34, 211, 238' : '139, 92, 246',
        };
      });
    };

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const handleResize = () => {
      setCanvasSize();
      if (prefersReducedMotion) {
        drawFrame(false);
      }
    };

    const handlePointerMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const drawFrame = (animate) => {
      ctx.clearRect(0, 0, width, height);
      const maxLinkDistance = width < 640 ? 95 : 135;

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];

        if (animate) {
          if (pointer.active) {
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const distSq = dx * dx + dy * dy;
            if (distSq > 0 && distSq < 18000) {
              const dist = Math.sqrt(distSq);
              const force = (135 - dist) / 135;
              p.vx -= (dx / dist) * force * 0.045;
              p.vy -= (dy / dist) * force * 0.045;
            }
          }

          p.vx *= 0.992;
          p.vy *= 0.992;
          if (Math.abs(p.vx) < 0.12) p.vx += (Math.random() - 0.5) * 0.03;
          if (Math.abs(p.vy) < 0.12) p.vy += (Math.random() - 0.5) * 0.03;

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, 0.58)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const distance = Math.hypot(dx, dy);
          if (distance < maxLinkDistance) {
            const alpha = (1 - distance / maxLinkDistance) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    };

    const tick = () => {
      drawFrame(true);
      animationFrameId = window.requestAnimationFrame(tick);
    };

    setCanvasSize();
    if (prefersReducedMotion) {
      drawFrame(false);
    } else {
      window.addEventListener('mousemove', handlePointerMove, { passive: true });
      window.addEventListener('mouseleave', handlePointerLeave);
      animationFrameId = window.requestAnimationFrame(tick);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      data-testid="particle-canvas"
      aria-hidden="true"
    />
  );
}
