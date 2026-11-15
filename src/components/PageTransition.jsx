import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const variantMap = {
  home: {
    initial: { opacity: 0, scale: 0.96, filter: 'blur(6px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 1.02, filter: 'blur(4px)' },
  },
  about: {
    initial: { opacity: 0, x: 36, filter: 'blur(4px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, x: -36, filter: 'blur(4px)' },
  },
  skills: {
    initial: { opacity: 0, y: 24, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -18, scale: 0.99 },
  },
  projects: {
    initial: { opacity: 0, rotateX: 4, y: 26, filter: 'blur(4px)' },
    animate: { opacity: 1, rotateX: 0, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, rotateX: -3, y: -20, filter: 'blur(4px)' },
  },
  articles: {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -24 },
  },
  profiles: {
    initial: { opacity: 0, scale: 0.97, y: 18 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.98, y: -14 },
  },
  contact: {
    initial: { opacity: 0, scale: 0.95, filter: 'blur(6px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 0.98, filter: 'blur(4px)' },
  },
};

export function PageTransition({ children, variant = 'home' }) {
  const prefersReducedMotion = useReducedMotion();
  const chosen = variantMap[variant] || variantMap.home;

  if (prefersReducedMotion) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial={chosen.initial}
      animate={chosen.animate}
      exit={chosen.exit}
      transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
    >
      {children}
    </motion.div>
  );
}
