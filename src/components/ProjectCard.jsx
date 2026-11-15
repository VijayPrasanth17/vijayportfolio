import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, ChevronUp, Github, Layers } from 'lucide-react';
import { useTiltEffect } from '../hooks/useTiltEffect';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function ProjectCard({ project, featured = false }) {
  const { tilt, isDisabled, handlers } = useTiltEffect(8);
  const prefersReducedMotion = useReducedMotion();
  const [imgFailed, setImgFailed] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(featured);

  const visibleFeatures = mobileExpanded ? project.features : project.features.slice(0, 2);

  return (
    <motion.article
      className={`project-card ${featured ? 'featured' : ''}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={
        isDisabled
          ? undefined
          : {
              transform: `perspective(1100px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${
                tilt.isHovering ? 1.012 : 1
              })`,
              transition: tilt.isHovering ? 'transform 90ms ease-out' : 'transform 320ms cubic-bezier(0.16, 1, 0.3, 1)',
            }
      }
      {...handlers}
    >
      {!isDisabled && (
        <div
          className="project-card-glare"
          aria-hidden="true"
          style={{
            opacity: tilt.isHovering ? 1 : 0,
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.11), transparent 52%)`,
          }}
        />
      )}

      <div className="project-media-wrap">
        {!imgFailed && project.image ? (
          <img
            src={project.image}
            alt={`${project.title} visualization`}
            referrerPolicy="no-referrer"
            className="project-media-img"
            onError={() => setImgFailed(true)}
            style={
              isDisabled
                ? undefined
                : {
                    transform: `translate3d(${tilt.imageTranslateX}px, ${tilt.imageTranslateY}px, 0) scale(${
                      tilt.isHovering ? 1.04 : 1
                    })`,
                  }
            }
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
              padding: 24,
              background: 'linear-gradient(135deg, #131324 0%, #1c1836 60%, #0d222e 100%)',
            }}
          >
            <Layers size={32} color="#22D3EE" aria-hidden="true" />
            <span className="mono-meta" style={{ color: '#F5F5F7', textAlign: 'center' }}>
              {project.title}
            </span>
          </div>
        )}
        <div className="project-media-scrim" aria-hidden="true" />
      </div>

      <div className="project-body">
        <div>
          <div className="meta-line">
            <span className="mono-meta meta-accent">Project {project.number}</span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.status}</span>
          </div>

          <h2 className="project-title">{project.title}</h2>
          <p className="project-desc">{project.description}</p>
        </div>

        <div>
          <p className="project-stack-line">
            <strong style={{ color: 'var(--text-main)', fontWeight: 600 }}>
              {project.stackLabel}:{' '}
            </strong>
            {project.technologies.join(' · ')}
          </p>
        </div>

        <div>
          <ul className="project-feature-list" aria-label="Key features">
            {visibleFeatures.map((feature) => (
              <li key={feature} className="project-feature-item">
                <span style={{ color: 'var(--accent-secondary)' }} aria-hidden="true">
                  –
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {project.features.length > 2 && (
            <button
              type="button"
              className="mobile-expand-btn"
              onClick={() => setMobileExpanded((prev) => !prev)}
              aria-expanded={mobileExpanded}
            >
              {mobileExpanded ? (
                <>
                  <span>Show fewer details</span>
                  <ChevronUp size={15} aria-hidden="true" />
                </>
              ) : (
                <>
                  <span>Tap to expand all features</span>
                  <ChevronDown size={15} aria-hidden="true" />
                </>
              )}
            </button>
          )}
        </div>

        <div className="project-actions">
          <Link to={`/projects/${project.slug}`} className="btn btn-primary btn-sm">
            <span>View Case Study</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
            aria-label={`View ${project.title} on GitHub`}
          >
            <Github size={15} aria-hidden="true" />
            <span>GitHub Profile</span>
          </a>

          {project.liveDemoUrl ? (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
            >
              <span>Live Demo</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          ) : (
            <span className="mono-meta" style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
              Demo Link Pending
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
