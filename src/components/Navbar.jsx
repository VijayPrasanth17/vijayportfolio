import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, X, ArrowUpRight } from 'lucide-react';
import { portfolioConfig } from '../data/portfolio.js';
import { useReducedMotion } from '../hooks/useReducedMotion';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/articles', label: 'Articles' },
  { to: '/profiles', label: 'Profiles' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar({ onRequestResume }) {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [mobileOpen]);

  const isRouteActive = (to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname === to || location.pathname.startsWith(`${to}/`);
  };

  return (
    <>
      <header className="navbar-wrapper">
        <div className={`navbar-bar ${scrolled ? 'scrolled' : ''}`}>
          {/* Zone 1: Brand Title */}
          <Link to="/" className="navbar-brand" aria-label="K. Vijay Prasanth Home">
            <span className="brand-monogram" aria-hidden="true">
              {portfolioConfig.monogram}
            </span>
            <span>{portfolioConfig.fullName}</span>
          </Link>

          {/* Zone 2: Clean Text Navigation Links */}
          <nav className="navbar-links" aria-label="Primary Navigation">
            {navLinks.map((item) => {
              const active = isRouteActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`nav-link-item ${active ? 'active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId={prefersReducedMotion ? undefined : 'nav-active-underline'}
                      className="nav-active-underline"
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action + Mobile Menu Trigger */}
          <div className="navbar-actions">
            <button
              type="button"
              onClick={onRequestResume}
              className="btn btn-primary btn-sm navbar-desktop-cta"
              aria-label="Download Resume"
            >
              <Download size={15} aria-hidden="true" />
              <span>Resume</span>
            </button>

            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            className="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-drawer-header">
              <Link to="/" className="navbar-brand" onClick={() => setMobileOpen(false)}>
                <span className="brand-monogram" aria-hidden="true">
                  {portfolioConfig.monogram}
                </span>
                <span>{portfolioConfig.fullName}</span>
              </Link>
              <button
                type="button"
                className="mobile-menu-toggle"
                style={{ display: 'inline-flex' }}
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <nav className="mobile-drawer-links" aria-label="Mobile Primary Navigation">
              {navLinks.map((item, idx) => {
                const active = isRouteActive(item.to);
                return (
                  <motion.div
                    key={item.to}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : idx * 0.04, duration: 0.24 }}
                  >
                    <Link
                      to={item.to}
                      className={`mobile-drawer-link ${active ? 'active' : ''}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onRequestResume();
              }}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              <Download size={16} aria-hidden="true" />
              <span>Download Resume</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
