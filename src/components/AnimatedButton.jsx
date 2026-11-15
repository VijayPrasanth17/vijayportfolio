import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  ariaLabel,
  download,
  target,
  rel,
}) {
  const prefersReducedMotion = useReducedMotion();
  const classes = `btn btn-${variant} ${size === 'sm' ? 'btn-sm' : ''} ${className}`.trim();

  const motionProps = prefersReducedMotion
    ? {}
    : {
        whileHover: disabled ? undefined : { scale: 1.02, y: -1 },
        whileTap: disabled ? undefined : { scale: 0.98 },
        transition: { duration: 0.16, ease: [0.16, 1, 0.3, 1] },
      };

  if (to) {
    return (
      <motion.div style={{ display: 'inline-flex' }} {...motionProps}>
        <Link to={to} className={classes} aria-label={ariaLabel} onClick={onClick}>
          {children}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        download={download}
        target={target}
        rel={rel}
        onClick={onClick}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
