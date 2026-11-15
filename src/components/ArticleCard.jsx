import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function ArticleCard({ article, featured = false, onSelectPlaceholder }) {
  const prefersReducedMotion = useReducedMotion();
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.article
      className={`article-card ${featured ? 'featured' : ''}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="article-cover">
        {!imgFailed && article.coverImage ? (
          <img
            src={article.coverImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              minHeight: 190,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: 20,
              background:
                'radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.24), rgba(16, 16, 24, 0.96) 72%)',
            }}
          >
            <BookOpen size={28} color="#22D3EE" aria-hidden="true" />
            <span className="mono-meta" style={{ color: 'var(--text-secondary)' }}>
              {article.category}
            </span>
          </div>
        )}
      </div>

      <div className="article-body">
        <div>
          <div className="meta-line">
            <span className="meta-accent">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{article.displayDate}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{article.readingTime}</span>
          </div>
          <h2 className="article-title">{article.title}</h2>
          <p style={{ fontSize: '0.92rem', marginTop: 10, lineHeight: 1.6 }}>
            {article.description}
          </p>
        </div>

        <div style={{ paddingTop: 10, borderTop: '1px solid var(--border-subtle)' }}>
          {article.externalUrl ? (
            <a
              href={article.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <span>Read Article</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          ) : (
            <button
              type="button"
              onClick={() => onSelectPlaceholder?.(article)}
              className="btn btn-ghost btn-sm"
            >
              <span>Draft Slot · Preview Summary</span>
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
