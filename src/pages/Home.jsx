import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Download, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedButton } from '../components/AnimatedButton.jsx';
import { Floating3DIcons } from '../components/Floating3DIcons.jsx';
import { PageTransition } from '../components/PageTransition.jsx';
import { ProjectCard } from '../components/ProjectCard.jsx';
import { SocialLinks } from '../components/SocialLinks.jsx';
import { portfolioConfig } from '../data/portfolio.js';
import { projectsData } from '../data/projects.js';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function Home({ onRequestResume }) {
  const prefersReducedMotion = useReducedMotion();
  const headlineWords = portfolioConfig.hero.headline.split(' ');
  const featuredProject = projectsData.find((p) => p.featured) || projectsData[0];

  return (
    <PageTransition variant="home">
      <section className="hero-section" aria-label="Introduction">
        <div className="container">
          <div className="hero-grid">
            <div>
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 }}
              >
                <span className="hero-availability">{portfolioConfig.availability}</span>
              </motion.div>

              <motion.p
                className="hero-greeting"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.14 }}
              >
                <span className="hero-name-role">{portfolioConfig.fullName}</span> ·{' '}
                {portfolioConfig.role}
              </motion.p>

              <h1 className="hero-headline">
                {headlineWords.map((word, idx) => (
                  <motion.span
                    key={`${word}-${idx}`}
                    className={`hero-headline-word ${idx >= 4 ? 'gradient-text' : ''}`}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.48,
                      delay: prefersReducedMotion ? 0 : 0.2 + idx * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                className="hero-description"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              >
                {portfolioConfig.hero.description}
              </motion.p>

              <motion.div
                className="hero-cta-group"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
              >
                <AnimatedButton to="/projects" variant="primary">
                  <span>Explore My Work</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </AnimatedButton>

                <AnimatedButton onClick={onRequestResume} variant="secondary">
                  <Download size={16} aria-hidden="true" />
                  <span>Download Resume</span>
                </AnimatedButton>

                <AnimatedButton to="/contact" variant="ghost">
                  <Mail size={16} aria-hidden="true" />
                  <span>Let's Connect</span>
                </AnimatedButton>
              </motion.div>

              <motion.div
                className="hero-meta-strip"
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.62 }}
              >
                <div>
                  <span className="hero-meta-label">Education</span>
                  <span className="hero-meta-value">B.E. CSE · Mahendra College of Engineering</span>
                </div>
                <div>
                  <span className="hero-meta-label">Graduation & CGPA</span>
                  <span className="hero-meta-value tabular-nums">
                    {portfolioConfig.education.graduationYear} · {portfolioConfig.education.cgpa} CGPA
                  </span>
                </div>
                <div>
                  <span className="hero-meta-label">Location</span>
                  <span className="hero-meta-value">{portfolioConfig.location}</span>
                </div>
              </motion.div>
            </div>

            <Floating3DIcons />
          </div>

          <motion.a
            href="#featured-work"
            className="hero-scroll-cue"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.72 }}
          >
            <ArrowDown size={15} aria-hidden="true" />
            <span>Scroll to explore featured engineering work</span>
          </motion.a>
        </div>
      </section>

      <section id="featured-work" className="home-highlights-section" aria-label="Featured Project">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-kicker">01. Selected Work</span>
              <h2 className="section-heading">{portfolioConfig.hero.alternativeHeadline}</h2>
            </div>
            <Link to="/projects" className="btn btn-secondary btn-sm">
              <span>All Projects</span>
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <ProjectCard project={featuredProject} featured />

          <div className="divider-line" />

          <div
            className="surface-card"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 24,
            }}
          >
            <div>
              <span className="section-kicker" style={{ marginBottom: 8 }}>
                Connect & Profiles
              </span>
              <h2 style={{ fontSize: '1.45rem', marginBottom: 8 }}>
                Explore repositories, coding activity, or reach out directly.
              </h2>
              <p style={{ fontSize: '0.95rem' }}>
                Currently open to Java, backend, and full-stack software engineering internships or
                entry-level roles.
              </p>
            </div>
            <SocialLinks compact />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
