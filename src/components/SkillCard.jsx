import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Atom,
  Binary,
  Boxes,
  BrainCircuit,
  Cloud,
  CloudCog,
  Code2,
  Coffee,
  Container,
  Cpu,
  Database,
  FileCode2,
  FolderGit2,
  GitBranch,
  Globe,
  HardDrive,
  Layers,
  Layout,
  LineChart,
  Network,
  Palette,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Table2,
  Terminal,
} from 'lucide-react';
import { useTiltEffect } from '../hooks/useTiltEffect';
import { useReducedMotion } from '../hooks/useReducedMotion';

const skillIcons = {
  Atom,
  Binary,
  Boxes,
  BrainCircuit,
  Cloud,
  CloudCog,
  Code2,
  Coffee,
  Container,
  Cpu,
  Database,
  FileCode2,
  FolderGit2,
  GitBranch,
  Globe,
  HardDrive,
  Layers,
  Layout,
  LineChart,
  Network,
  Palette,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Table2,
  Terminal,
};

export function SkillCard({ skill, index = 0 }) {
  const { tilt, isDisabled, handlers } = useTiltEffect(10);
  const prefersReducedMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);

  const Icon = skillIcons[skill.icon] || Code2;

  return (
    <motion.button
      type="button"
      className={`skill-card ${expanded ? 'is-expanded' : ''}`}
      onClick={() => setExpanded((prev) => !prev)}
      aria-expanded={expanded}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.36, delay: prefersReducedMotion ? 0 : Math.min(index * 0.04, 0.25) }}
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
      <div className="skill-card-top">
        <span className="skill-icon-box" aria-hidden="true">
          <Icon size={20} />
        </span>
        <span className="mono-meta" style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
          {skill.level}
        </span>
      </div>

      <h3 className="skill-name">{skill.name}</h3>
      <p className="skill-level-text">
        {expanded ? skill.focus : 'Tap or hover for focus areas'}
      </p>
    </motion.button>
  );
}
