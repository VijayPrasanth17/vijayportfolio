import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, Cpu, Github, Terminal, Trophy } from 'lucide-react';
import { PageTransition } from '../components/PageTransition.jsx';
import { codingProfilesData } from '../data/codingProfiles.js';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useTiltEffect } from '../hooks/useTiltEffect';

const platformIcons = {
  github: Github,
  leetcode: Code2,
  hackerrank: Terminal,
  codechef: Trophy,
  geeksforgeeks: Cpu,
};

function ProfileTiltCard({ profile, index }) {
  const { tilt, isDisabled, handlers } = useTiltEffect(8);
  const prefersReducedMotion = useReducedMotion();
  const Icon = platformIcons[profile.id] || Code2;

  return (
    <motion.article
      className="profile-card"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : index * 0.06 }}
      style={
        isDisabled
          ? undefined
          : {
              transform: `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              transition: tilt.isHovering ? 'transform 80ms ease-out' : 'transform 260ms ease-out',
            }
      }
      {...handlers}
    >
      <div>
        <div className="profile-card-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span className="profile-logo-box" aria-hidden="true">
              <Icon size={22} />
            </span>
            <div>
              <h2 style={{ fontSize: '1.3rem' }}>{profile.platform}</h2>
              <span className="mono-meta" style={{ color: 'var(--text-secondary)' }}>
                {profile.isPlaceholder ? profile.username : `@${profile.username}`}
              </span>
            </div>
          </div>

          <span
            className="mono-meta"
            style={{
              color: profile.isPlaceholder ? 'var(--text-muted)' : 'var(--accent-secondary)',
            }}
          >
            {profile.statusText}
          </span>
        </div>

        <p style={{ marginTop: 16, fontSize: '0.95rem', lineHeight: 1.6 }}>{profile.focus}</p>
        <p style={{ marginTop: 10, fontSize: '0.86rem', color: 'var(--text-muted)' }}>
          {profile.note}
        </p>
      </div>

      <div style={{ paddingTop: 12, borderTop: '1px solid var(--border-subtle)' }}>
        {profile.url ? (
          <a
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            <span>Open {profile.platform} Profile</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        ) : (
          <span className="mono-meta" style={{ color: 'var(--text-muted)' }}>
            Placeholder · Public URL not attached yet
          </span>
        )}
      </div>
    </motion.article>
  );
}

export function CodingProfiles() {
  return (
    <PageTransition variant="profiles">
      <section className="page-section">
        <div className="container">
          <span className="section-kicker">06. Coding Platforms</span>
          <h1 className="page-title">Coding Profiles & Open Source Presence.</h1>
          <p className="page-lead">
            Verified links to my active GitHub and LeetCode accounts, along with placeholder slots
            for additional competitive coding platforms. No coding metrics are fabricated here.
          </p>

          <div className="profiles-grid">
            {codingProfilesData.map((profile, idx) => (
              <ProfileTiltCard key={profile.id} profile={profile} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
