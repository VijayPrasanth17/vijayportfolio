import { useState } from 'react';
import { PageTransition } from '../components/PageTransition.jsx';
import { SkillCard } from '../components/SkillCard.jsx';
import { skillCategories } from '../data/skills.js';

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const visibleCategories =
    selectedCategory === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === selectedCategory);

  return (
    <PageTransition variant="skills">
      <section className="page-section">
        <div className="container">
          <span className="section-kicker">03. Technical Stack</span>
          <h1 className="page-title">Core Engineering Skills & Foundations.</h1>
          <p className="page-lead">
            A practical breakdown of programming languages, frameworks, tools, and computer science
            fundamentals. Labels reflect honest working familiarity and current learning focus.
          </p>

          <div className="filter-bar">
            <div className="filter-tabs" role="tablist" aria-label="Skill Categories">
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategory === 'all'}
                className={`filter-tab-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All Categories
              </button>
              {skillCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === category.id}
                  className={`filter-tab-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          {visibleCategories.map((category) => (
            <div key={category.id} className="skills-category-block">
              <h2 className="skills-category-title">{category.title}</h2>
              <div className="skills-grid">
                {category.items.map((skill, idx) => (
                  <SkillCard key={`${category.id}-${skill.name}`} skill={skill} index={idx} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
