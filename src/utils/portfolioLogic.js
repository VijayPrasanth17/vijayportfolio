export const INITIAL_TILT_STATE = {
  rotateX: 0,
  rotateY: 0,
  imageTranslateX: 0,
  imageTranslateY: 0,
  glareX: 50,
  glareY: 50,
  isHovering: false,
};

export function clampNumber(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function calculateTiltTransform(clientX, clientY, rect, maxTilt = 10) {
  if (!rect || rect.width <= 0 || rect.height <= 0) {
    return INITIAL_TILT_STATE;
  }

  const ratioX = clampNumber((clientX - rect.left) / rect.width, 0, 1);
  const ratioY = clampNumber((clientY - rect.top) / rect.height, 0, 1);

  const centeredX = (ratioX - 0.5) * 2;
  const centeredY = (ratioY - 0.5) * 2;

  return {
    rotateX: Number((-centeredY * maxTilt).toFixed(2)),
    rotateY: Number((centeredX * maxTilt).toFixed(2)),
    imageTranslateX: Number((-centeredX * 8).toFixed(2)),
    imageTranslateY: Number((-centeredY * 8).toFixed(2)),
    glareX: Number((ratioX * 100).toFixed(1)),
    glareY: Number((ratioY * 100).toFixed(1)),
    isHovering: true,
  };
}

export function filterProjects(projects, activeCategory) {
  if (!Array.isArray(projects)) return [];
  if (!activeCategory || activeCategory === 'All') {
    return projects;
  }
  return projects.filter((project) => project.filterGroup === activeCategory);
}

export function filterAndSortArticles(
  articles,
  { searchQuery = '', category = 'All', sortOrder = 'newest' } = {}
) {
  if (!Array.isArray(articles)) return [];
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filtered = articles.filter((article) => {
    const matchesCategory = category === 'All' || article.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      article.title.toLowerCase().includes(normalizedQuery) ||
      article.description.toLowerCase().includes(normalizedQuery) ||
      article.category.toLowerCase().includes(normalizedQuery)
    );
  });

  return [...filtered].sort((a, b) => {
    const timeA = Date.parse(a.publishedAt) || 0;
    const timeB = Date.parse(b.publishedAt) || 0;
    return sortOrder === 'oldest' ? timeA - timeB : timeB - timeA;
  });
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(values) {
  const errors = {};
  const name = (values?.name || '').trim();
  const email = (values?.email || '').trim();
  const subject = (values?.subject || '').trim();
  const message = (values?.message || '').trim();

  if (name.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }
  if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (subject.length < 3) {
    errors.subject = 'Please provide a brief subject (at least 3 characters).';
  }
  if (message.length < 10) {
    errors.message = 'Please enter a message of at least 10 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildMailtoHref(recipientEmail, values) {
  const subject = encodeURIComponent((values?.subject || '').trim());
  const bodyLines = [
    `Name: ${(values?.name || '').trim()}`,
    `Email: ${(values?.email || '').trim()}`,
    '',
    (values?.message || '').trim(),
  ];
  const body = encodeURIComponent(bodyLines.join('\n'));
  return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
}
