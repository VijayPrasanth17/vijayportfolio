import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, User } from 'lucide-react';
import { AnimatedButton } from '../components/AnimatedButton.jsx';
import { PageTransition } from '../components/PageTransition.jsx';
import { portfolioConfig } from '../data/portfolio.js';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useTiltEffect } from '../hooks/useTiltEffect';

export function About({ onRequestResume }) {
  const prefersReducedMotion = useReducedMotion();
  const { tilt, isDisabled, handlers } = useTiltEffect(9);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <PageTransition variant="about">
      <section className="page-section">
        <div className="container">
          <span className="section-kicker">02. About Me</span>
          <h1 className="page-title">Building Strong Fundamentals for Real-World Software.</h1>

          <div className="about-grid" style={{ marginTop: 32 }}>
            <div>
              <div className="about-prose">
                {portfolioConfig.about.paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.42, delay: prefersReducedMotion ? 0 : index * 0.08 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              <div className="hero-cta-group" style={{ marginTop: 30, marginBottom: 0 }}>
                <AnimatedButton onClick={onRequestResume} variant="primary">
                  <Download size={16} aria-hidden="true" />
                  <span>Download Resume</span>
                </AnimatedButton>
                <AnimatedButton to="/contact" variant="secondary">
                  <Mail size={16} aria-hidden="true" />
                  <span>Contact Me</span>
                </AnimatedButton>
              </div>
            </div>

            <motion.aside
              className="about-profile-frame"
              aria-label="Profile Summary"
              style={
                isDisabled
                  ? undefined
                  : {
                      transform: `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                      transition: tilt.isHovering ? 'transform 80ms ease-out' : 'transform 280ms ease-out',
                    }
              }
              {...handlers}
            >
              <div className="about-profile-image-wrap">
                {!imgFailed ? (
                  <img
                    src={portfolioConfig.profileImage}
                    alt="Abstract sculptural profile placeholder for K. Vijay Prasanth"
                    referrerPolicy="no-referrer"
                    className="about-profile-image"
                    onError={() => setImgFailed(true)}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      background: 'linear-gradient(135deg, #131324, #1b1834)',
                    }}
                  >
                    <User size={40} color="#22D3EE" aria-hidden="true" />
                    <span className="mono-meta">{portfolioConfig.fullName}</span>
                  </div>
                )}
              </div>

              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Placeholder visual — Clean architectural portrait representation
              </p>

              <div className="about-stats-grid">
                <div className="stat-tile">
                  <span className="stat-value tabular-nums">{portfolioConfig.education.cgpa}</span>
                  <span className="stat-label">Current CGPA</span>
                </div>
                <div className="stat-tile">
                  <span className="stat-value tabular-nums">
                    {portfolioConfig.education.graduationYear}
                  </span>
                  <span className="stat-label">Expected Graduation</span>
                </div>
                <div className="stat-tile">
                  <span className="stat-value" style={{ fontSize: '1.05rem' }}>
                    B.E. CSE
                  </span>
                  <span className="stat-label">Mahendra College of Engineering</span>
                </div>
                <div className="stat-tile">
                  <span className="stat-value" style={{ fontSize: '1.05rem' }}>
                    Bangalore
                  </span>
                  <span className="stat-label">India · Open to Roles</span>
                </div>
              </div>
            </motion.aside>
          </div>

          <div className="divider-line" />

          <div>
            <span className="section-kicker">Education & Engineering Journey</span>
            <h2 className="section-heading">Academic & Learning Timeline</h2>
            <div className="timeline-list">
              {portfolioConfig.about.timeline.map((item, idx) => (
                <motion.div
                  key={item.title}
                  className="timeline-item"
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.42, delay: prefersReducedMotion ? 0 : idx * 0.08 }}
                >
                  <div className="meta-line" style={{ marginBottom: 8 }}>
                    <span className="mono-meta meta-accent">{item.period}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.institution}</span>
                  </div>
                  <h3 style={{ fontSize: '1.22rem', marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.65 }}>{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="divider-line" />

          <div>
            <span className="section-kicker">Focus Areas</span>
            <h2 className="section-heading">Professional Interests</h2>
            <div className="interests-grid">
              {portfolioConfig.about.interests.map((interest) => (
                <div key={interest} className="interest-cell">
                  {interest}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
