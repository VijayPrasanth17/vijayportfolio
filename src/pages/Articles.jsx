import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { ArticleCard } from '../components/ArticleCard.jsx';
import { PageTransition } from '../components/PageTransition.jsx';
import { articleCategories, articlesData } from '../data/articles.js';
import { filterAndSortArticles } from '../utils/portfolioLogic.js';

export function Articles() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [visibleCount, setVisibleCount] = useState(3);
  const [previewArticle, setPreviewArticle] = useState(null);

  const filteredArticles = filterAndSortArticles(articlesData, {
    searchQuery,
    category: selectedCategory,
    sortOrder,
  });

  const featuredArticle =
    searchQuery === '' && selectedCategory === 'All' && sortOrder === 'newest'
      ? filteredArticles.find((a) => a.featured)
      : null;

  const listArticles = featuredArticle
    ? filteredArticles.filter((a) => a.id !== featuredArticle.id)
    : filteredArticles;

  const paginatedArticles = listArticles.slice(0, visibleCount);
  const hasMore = paginatedArticles.length < listArticles.length;

  return (
    <PageTransition variant="articles">
      <section className="page-section">
        <div className="container">
          <span className="section-kicker">05. Technical Writing</span>
          <h1 className="page-title">Articles & Engineering Notes.</h1>
          <p className="page-lead">
            Planned and upcoming technical write-ups covering Java programming, software design,
            cybersecurity, cloud computing, and machine learning. Current entries are placeholder
            slots awaiting full publication.
          </p>

          <div className="articles-toolbar">
            <div className="search-input-wrap">
              <Search size={17} className="search-input-icon" aria-hidden="true" />
              <label htmlFor="article-search-input" className="sr-only">
                Search articles
              </label>
              <input
                id="article-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(3);
                }}
                placeholder="Search topics, Java, fraud, AQI..."
                className="text-input with-icon"
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <label htmlFor="article-sort-select" className="sr-only">
                Sort articles by date
              </label>
              <select
                id="article-sort-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="select-input"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
              </select>
            </div>
          </div>

          <div className="filter-tabs" role="tablist" aria-label="Filter articles by category">
            {articleCategories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selectedCategory === category}
                className={`filter-tab-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(category);
                  setVisibleCount(3);
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {featuredArticle && (
            <div style={{ marginTop: 28 }}>
              <ArticleCard
                article={featuredArticle}
                featured
                onSelectPlaceholder={setPreviewArticle}
              />
            </div>
          )}

          {paginatedArticles.length > 0 ? (
            <div className="articles-grid">
              {paginatedArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onSelectPlaceholder={setPreviewArticle}
                />
              ))}
            </div>
          ) : (
            !featuredArticle && (
              <div className="surface-card" style={{ marginTop: 28, textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: 8 }}>No Matching Articles</h2>
                <p style={{ marginInline: 'auto', marginBottom: 16 }}>
                  No article slots matched your search query or selected category.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )
          )}

          {hasMore && (
            <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setVisibleCount((prev) => prev + 3)}
              >
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {previewArticle && (
          <motion.div
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-preview-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setPreviewArticle(null);
            }}
          >
            <motion.div
              className="modal-panel"
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
            >
              <div className="modal-header">
                <div>
                  <span className="mono-meta meta-accent">{previewArticle.category}</span>
                  <h2 id="article-preview-title" style={{ fontSize: '1.3rem', marginTop: 6 }}>
                    {previewArticle.title}
                  </h2>
                </div>
                <button
                  type="button"
                  className="mobile-menu-toggle"
                  style={{ display: 'inline-flex', width: 38, height: 38 }}
                  onClick={() => setPreviewArticle(null)}
                  aria-label="Close article preview"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="meta-line" style={{ marginBottom: 14 }}>
                <span className="tabular-nums">{previewArticle.displayDate}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{previewArticle.readingTime}</span>
                <span aria-hidden="true">·</span>
                <span>Placeholder Draft Slot</span>
              </div>

              <p style={{ fontSize: '0.96rem', lineHeight: 1.7, marginBottom: 20 }}>
                {previewArticle.description}
              </p>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: 22 }}>
                Full external blog link will be added once this article is published.
              </p>

              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => setPreviewArticle(null)}
              >
                Close Preview
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
