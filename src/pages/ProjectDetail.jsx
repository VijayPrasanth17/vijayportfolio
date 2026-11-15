import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Github, Layers } from 'lucide-react';
import { PageTransition } from '../components/PageTransition.jsx';
import { projectsData } from '../data/projects.js';

export function ProjectDetail() {
  const { slug } = useParams();
  const [imgFailed, setImgFailed] = useState(false);

  const project = projectsData.find((item) => item.slug === slug);

  if (!project) {
    return (
      <PageTransition variant="projects">
        <section className="page-section">
          <div className="container">
            <span className="section-kicker">Project Not Found</span>
            <h1 className="page-title">We couldn't find that project case study.</h1>
            <Link to="/projects" className="btn btn-primary">
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Return to Projects</span>
            </Link>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition variant="projects">
      <section className="page-section">
        <div className="container">
          <Link to="/projects" className="btn btn-ghost btn-sm" style={{ marginBottom: 24 }}>
            <ArrowLeft size={15} aria-hidden="true" />
            <span>Back to All Projects</span>
          </Link>

          <div className="meta-line" style={{ marginBottom: 12 }}>
            <span className="mono-meta meta-accent">Project {project.number}</span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.status}</span>
          </div>

          <h1 className="page-title">{project.title}</h1>
          <p className="page-lead">{project.description}</p>

          {!imgFailed && project.image ? (
            <img
              src={project.image}
              alt={`${project.title} visual overview`}
              referrerPolicy="no-referrer"
              className="detail-hero-image"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div
              className="detail-hero-image"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                background: 'linear-gradient(135deg, #131324, #1a1833)',
              }}
            >
              <Layers size={40} color="#22D3EE" aria-hidden="true" />
              <span className="mono-meta">{project.title}</span>
            </div>
          )}

          <div className="detail-columns">
            <div className="surface-card">
              <h2 style={{ fontSize: '1.4rem', marginBottom: 16 }}>Core Capabilities & Scope</h2>
              <ul className="project-feature-list" style={{ gridTemplateColumns: '1fr', gap: 12 }}>
                {project.features.map((feature) => (
                  <li key={feature} className="project-feature-item" style={{ fontSize: '0.96rem' }}>
                    <span style={{ color: 'var(--accent-secondary)' }} aria-hidden="true">
                      –
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="disclaimer-note">
                <strong style={{ display: 'block', marginBottom: 4 }}>Implementation Transparency</strong>
                {project.architectureNote}
              </div>
            </div>

            <aside className="surface-card" style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <div>
                <h2 style={{ fontSize: '1.2rem', marginBottom: 10 }}>{project.stackLabel}</h2>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.75, color: 'var(--text-main)' }}>
                  {project.technologies.join(' · ')}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <Github size={16} aria-hidden="true" />
                  <span>View GitHub Profile</span>
                </a>

                {project.liveDemoUrl ? (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    <span>Open Live Demo</span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                ) : (
                  <span className="mono-meta" style={{ color: 'var(--text-secondary)' }}>
                    Live deployment URL will be linked once hosted.
                  </span>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
