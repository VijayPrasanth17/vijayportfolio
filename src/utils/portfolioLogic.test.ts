import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTiltTransform,
  INITIAL_TILT_STATE,
  filterProjects,
  filterAndSortArticles,
  validateContactForm,
  buildMailtoHref,
} from './portfolioLogic.js';
import { projectsData } from '../data/projects.js';
import { articlesData } from '../data/articles.js';

test('calculateTiltTransform computes bounded 3D tilt angles and glare coordinates', () => {
  const rect = { left: 100, top: 100, width: 400, height: 200 };
  const centerTilt = calculateTiltTransform(300, 200, rect, 12);
  assert.equal(centerTilt.rotateX, 0);
  assert.equal(centerTilt.rotateY, 0);
  assert.equal(centerTilt.glareX, 50);
  assert.equal(centerTilt.glareY, 50);
  assert.equal(centerTilt.isHovering, true);

  const cornerTilt = calculateTiltTransform(500, 100, rect, 12);
  assert.equal(cornerTilt.rotateY, 12);
  assert.equal(cornerTilt.rotateX, 12);

  const invalidRect = calculateTiltTransform(10, 10, { left: 0, top: 0, width: 0, height: 0 });
  assert.deepEqual(invalidRect, INITIAL_TILT_STATE);
});

test('filterProjects returns all or category-matched projects', () => {
  assert.equal(filterProjects(projectsData, 'All').length, 4);
  const mlProjects = filterProjects(projectsData, 'Machine Learning');
  assert.equal(mlProjects.length, 1);
  assert.equal(mlProjects[0].id, 'air-quality-ml');
});

test('filterAndSortArticles filters by search, category, and sorts by date', () => {
  const javaOnly = filterAndSortArticles(articlesData, { category: 'Java Programming' });
  assert.equal(javaOnly.length, 1);
  assert.equal(javaOnly[0].category, 'Java Programming');

  const searchMatches = filterAndSortArticles(articlesData, { searchQuery: 'fraud' });
  assert.equal(searchMatches.length, 1);
  assert.equal(searchMatches[0].id, 'article-fraud-graph-thinking');

  const oldestFirst = filterAndSortArticles(articlesData, { sortOrder: 'oldest' });
  assert.ok(Date.parse(oldestFirst[0].publishedAt) <= Date.parse(oldestFirst[1].publishedAt));

  const newestFirst = filterAndSortArticles(articlesData, { sortOrder: 'newest' });
  assert.ok(Date.parse(newestFirst[0].publishedAt) >= Date.parse(newestFirst[1].publishedAt));
});

test('validateContactForm rejects invalid inputs and accepts complete payloads', () => {
  const emptyCheck = validateContactForm({ name: '', email: 'bad', subject: 'Hi', message: 'Short' });
  assert.equal(emptyCheck.isValid, false);
  assert.ok(emptyCheck.errors.name);
  assert.ok(emptyCheck.errors.email);
  assert.ok(emptyCheck.errors.subject);
  assert.ok(emptyCheck.errors.message);

  const validCheck = validateContactForm({
    name: 'Recruiter',
    email: 'hiring@example.com',
    subject: 'Java Internship Opportunity',
    message: 'Hello Vijay, we would like to discuss a software engineering internship.',
  });
  assert.equal(validCheck.isValid, true);
  assert.deepEqual(validCheck.errors, {});
});

test('buildMailtoHref encodes subject and message fields cleanly', () => {
  const href = buildMailtoHref('vijayprasanth2005@gmail.com', {
    name: 'Alex',
    email: 'alex@example.com',
    subject: 'Role Inquiry',
    message: 'Let us connect soon.',
  });
  assert.ok(href.startsWith('mailto:vijayprasanth2005@gmail.com?subject=Role%20Inquiry'));
  assert.ok(href.includes('alex%40example.com'));
});
