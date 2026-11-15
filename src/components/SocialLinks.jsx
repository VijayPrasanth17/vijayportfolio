import { Github, Linkedin, Instagram, AtSign, Mail } from 'lucide-react';
import { portfolioConfig } from '../data/portfolio.js';

const iconMap = {
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
  threads: AtSign,
  email: Mail,
};

export function SocialLinks({ compact = false }) {
  return (
    <div className="social-links-row" aria-label="Social Media Profiles">
      {portfolioConfig.socialLinks.map((item) => {
        const Icon = iconMap[item.id] || Mail;
        const isEmail = item.id === 'email';
        return (
          <a
            key={item.id}
            href={item.url}
            target={isEmail ? undefined : '_blank'}
            rel={isEmail ? undefined : 'noopener noreferrer'}
            className="social-link-tile"
            aria-label={`${item.label} (${item.handle})`}
          >
            <Icon size={17} color="#22D3EE" aria-hidden="true" />
            <span>{compact ? item.label : `${item.label} · ${item.handle}`}</span>
          </a>
        );
      })}
    </div>
  );
}
