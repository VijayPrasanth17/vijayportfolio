import { useState } from 'react';
import { PageTransition } from '../components/PageTransition.jsx';
import { ProjectCard } from '../components/ProjectCard.jsx';
import { projectFilterCategories, projectsData } from '../data/projects.js';
import { filterProjects } from '../utils/portfolioLogic.js';

export function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = filterProjects(projectsData, activeCategory);
  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => !featured || p.id !== featured.id);

  return (
    <PageTransition variant="projects">
      <section className="page-section">
        <div className="container">
          <span className="section-kicker">04. Engineering Projects</span>
          <h1 className="page-title">Applied Systems in AI, ML & Software Engineering.</h1>
          <p className="page-lead">
            Selected academic and independent project architectures exploring fraud investigation,
            environmental prediction, pollution alerting, and conversational information systems.
          </p>

          <div className="filter-bar">
            <div className="filter-tabs" role="tablist" aria-label="Filter projects by category">
              {projectFilterCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === category}
                  className={`filter-tab-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <span className="mono-meta" style={{ color: 'var(--text-secondary)' }}>
              Showing {filtered.length} of {projectsData.length} projects
            </span>
          </div>

          {featured && (
            <div className="projects-featured-slot">
              <ProjectCard project={featured} featured />
            </div>
          )}

          {rest.length > 0 && (
            <div className="projects-grid">
              {rest.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
