import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FileText, Mail, X, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { portfolioConfig } from '../data/portfolio.js';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function ResumeModal({ isOpen, onClose }) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            className="modal-panel"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="skill-icon-box" aria-hidden="true">
                  <FileText size={20} />
                </span>
                <div>
                  <h2 id="resume-modal-title" style={{ fontSize: '1.3rem' }}>
                    Resume Placeholder
                  </h2>
                  <p className="mono-meta" style={{ fontSize: '0.78rem', marginTop: 2 }}>
                    Expected path: /public/resume.pdf
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="mobile-menu-toggle"
                style={{ display: 'inline-flex', width: 38, height: 38 }}
                onClick={onClose}
                aria-label="Close resume dialog"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <p style={{ fontSize: '0.95rem', lineHeight: 1.65, marginBottom: 18 }}>
              A compiled PDF resume has not been uploaded to <code>public/resume.pdf</code> yet.
              Instead of triggering a broken download, here is the verified profile summary for{' '}
              <strong style={{ color: 'var(--text-main)' }}>{portfolioConfig.fullName}</strong>:
            </p>

            <div
              style={{
                padding: 18,
                borderRadius: 12,
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-secondary)',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                fontSize: '0.9rem',
                marginBottom: 22,
              }}
            >
              <div>
                <strong style={{ color: 'var(--text-main)' }}>Role:</strong> {portfolioConfig.role}
              </div>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>Education:</strong>{' '}
                {portfolioConfig.education.degree} — {portfolioConfig.education.college} (
                {portfolioConfig.education.graduationYear})
              </div>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>Academic Standing:</strong> CGPA{' '}
                <span className="tabular-nums">{portfolioConfig.education.cgpa}</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>Location:</strong>{' '}
                {portfolioConfig.location}
              </div>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>Email:</strong> {portfolioConfig.email}
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Link to="/contact" onClick={onClose} className="btn btn-primary btn-sm">
                <Mail size={15} aria-hidden="true" />
                <span>Request Resume via Email</span>
              </Link>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn btn-secondary btn-sm"
              >
                <Printer size={15} aria-hidden="true" />
                <span>Print Page Summary</span>
              </button>
              <button type="button" onClick={onClose} className="btn btn-ghost btn-sm">
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
