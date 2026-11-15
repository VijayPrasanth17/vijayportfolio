import { Link } from 'react-router-dom';
import { portfolioConfig } from '../data/portfolio.js';
import { SocialLinks } from './SocialLinks.jsx';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <p style={{ color: 'var(--text-main)', fontWeight: 600, marginBottom: 4 }}>
              {portfolioConfig.fullName}
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              {portfolioConfig.role} · {portfolioConfig.location} · © {year}
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer Navigation">
            <Link to="/about">About</Link>
            <Link to="/skills">Skills</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/articles">Articles</Link>
            <Link to="/profiles">Profiles</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          <SocialLinks compact />
        </div>
      </div>
    </footer>
  );
}
