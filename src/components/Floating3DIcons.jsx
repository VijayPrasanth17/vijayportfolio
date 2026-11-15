import { motion } from 'framer-motion';
import { Coffee, Atom, FileCode2, Github, Database, Terminal, Layers } from 'lucide-react';
import { useMousePosition } from '../hooks/useMousePosition';
import { useReducedMotion } from '../hooks/useReducedMotion';

const floatingNodes = [
  {
    id: 'java',
    label: 'Java',
    Icon: Coffee,
    style: { top: '11%', left: '8%' },
    depth: 28,
    accent: '#8B5CF6',
    delay: 0.12,
  },
  {
    id: 'react',
    label: 'React',
    Icon: Atom,
    style: { top: '14%', right: '9%' },
    depth: 36,
    accent: '#22D3EE',
    delay: 0.2,
  },
  {
    id: 'js',
    label: 'JS ES6+',
    Icon: FileCode2,
    style: { top: '45%', left: '5%' },
    depth: 20,
    accent: '#6366F1',
    delay: 0.28,
  },
  {
    id: 'github',
    label: 'GitHub',
    Icon: Github,
    style: { top: '44%', right: '6%' },
    depth: 32,
    accent: '#F5F5F7',
    delay: 0.34,
  },
  {
    id: 'database',
    label: 'SQL / DB',
    Icon: Database,
    style: { bottom: '11%', left: '12%' },
    depth: 24,
    accent: '#22D3EE',
    delay: 0.4,
  },
  {
    id: 'terminal',
    label: 'CLI / Sys',
    Icon: Terminal,
    style: { bottom: '12%', right: '11%' },
    depth: 30,
    accent: '#8B5CF6',
    delay: 0.46,
  },
];

export function Floating3DIcons() {
  const prefersReducedMotion = useReducedMotion();
  const { normalizedX, normalizedY } = useMousePosition();

  const stageRotateX = prefersReducedMotion ? 0 : normalizedY * -8;
  const stageRotateY = prefersReducedMotion ? 0 : normalizedX * 10;

  return (
    <motion.div
      className="hero-stage"
      data-testid="hero-3d-stage"
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Interactive 3D developer stack visualization"
    >
      <div className="hero-stage-grid" aria-hidden="true" />

      <div
        className="floating-3d-layer"
        style={{
          transform: `rotateX(${stageRotateX}deg) rotateY(${stageRotateY}deg)`,
          transition: 'transform 160ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className="glass-sphere"
          style={{ width: 76, height: 76, top: '17%', left: '36%', zIndex: 1, transform: 'translateZ(8px)' }}
          aria-hidden="true"
        />
        <div
          className="glass-sphere"
          style={{ width: 52, height: 52, bottom: '16%', right: '34%', zIndex: 1, transform: 'translateZ(12px)' }}
          aria-hidden="true"
        />

        <div className="hero-center-anchor">
          <motion.div
            className="hero-center-monolith"
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: [0, -8, 0],
                    rotateZ: [0, 1.5, 0, -1.5, 0],
                  }
            }
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Layers size={34} color="#22D3EE" aria-hidden="true" />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#F5F5F7',
              }}
            >
              KVP Stack
            </span>
            <span className="mono-meta" style={{ color: '#A1A1AA', fontSize: '0.72rem' }}>
              Java · Web · AI
            </span>
          </motion.div>
        </div>

        {floatingNodes.map((node, index) => {
          const IconComponent = node.Icon;
          const parallaxX = prefersReducedMotion ? 0 : normalizedX * (node.depth * 0.45);
          const parallaxY = prefersReducedMotion ? 0 : normalizedY * (node.depth * 0.45);
          const floatOffset = index % 2 === 0 ? -10 : 10;

          return (
            <motion.div
              key={node.id}
              className="floating-3d-node"
              style={{
                ...node.style,
                transform: `translate3d(${parallaxX}px, ${parallaxY}px, ${node.depth}px)`,
              }}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.9 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1, y: 0, scale: 1 }
                  : {
                      opacity: 1,
                      scale: 1,
                      y: [0, floatOffset, 0],
                      rotateX: [0, index % 2 === 0 ? 5 : -5, 0],
                      rotateY: [0, index % 2 === 0 ? -6 : 6, 0],
                    }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0.2 }
                  : {
                      opacity: { duration: 0.5, delay: node.delay },
                      scale: { duration: 0.5, delay: node.delay },
                      y: { duration: 4.8 + index * 0.4, repeat: Infinity, ease: 'easeInOut', delay: node.delay },
                      rotateX: { duration: 5.5 + index * 0.3, repeat: Infinity, ease: 'easeInOut' },
                      rotateY: { duration: 6.2 + index * 0.3, repeat: Infinity, ease: 'easeInOut' },
                    }
              }
            >
              <IconComponent size={22} color={node.accent} aria-hidden="true" />
              <span className="floating-node-label">{node.label}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
