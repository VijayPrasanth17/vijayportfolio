import { useState } from 'react';
import { Check, Copy, Mail, Send, MapPin } from 'lucide-react';
import { PageTransition } from '../components/PageTransition.jsx';
import { SocialLinks } from '../components/SocialLinks.jsx';
import { portfolioConfig } from '../data/portfolio.js';
import { buildMailtoHref, validateContactForm } from '../utils/portfolioLogic.js';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [mailtoHref, setMailtoHref] = useState('');
  const [copied, setCopied] = useState(false);

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(portfolioConfig.email);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setMailtoHref('');
      return;
    }

    setErrors({});
    setIsSending(true);
    const href = buildMailtoHref(portfolioConfig.email, formData);

    window.setTimeout(() => {
      setIsSending(false);
      setMailtoHref(href);
      window.location.href = href;
    }, 220);
  };

  return (
    <PageTransition variant="contact">
      <section className="page-section">
        <div className="container">
          <span className="section-kicker">07. Contact</span>
          <h1 className="page-title">Let's Build Something Meaningful.</h1>
          <p className="page-lead">
            Interested in discussing software development internships, entry-level Java roles, or
            collaborative projects? Reach out directly via email or use the composer below.
          </p>

          <div className="contact-grid">
            <div className="surface-card">
              <h2 style={{ fontSize: '1.35rem', marginBottom: 10 }}>Direct Contact Details</h2>
              <p style={{ fontSize: '0.94rem' }}>
                {portfolioConfig.availability} · Based in {portfolioConfig.location}.
              </p>

              <div className="email-copy-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Mail size={18} color="#22D3EE" aria-hidden="true" />
                  <a
                    href={`mailto:${portfolioConfig.email}`}
                    style={{ fontWeight: 600, color: 'var(--text-main)' }}
                  >
                    {portfolioConfig.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="btn btn-secondary btn-sm"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check size={15} aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={15} aria-hidden="true" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  marginBottom: 24,
                }}
              >
                <MapPin size={16} color="#8B5CF6" aria-hidden="true" />
                <span>{portfolioConfig.location}</span>
              </div>

              <h3 style={{ fontSize: '1.05rem', marginBottom: 14 }}>Social Profiles</h3>
              <SocialLinks compact />
            </div>

            <div className="surface-card">
              <h2 style={{ fontSize: '1.35rem', marginBottom: 18 }}>Compose an Email</h2>
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-field">
                  <label htmlFor="contact-name" className="form-label">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange('name')}
                    className="text-input"
                    placeholder="Your full name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'error-name' : undefined}
                  />
                  {errors.name && (
                    <span id="error-name" className="field-error" role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="contact-email" className="form-label">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    className="text-input"
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'error-email' : undefined}
                  />
                  {errors.email && (
                    <span id="error-email" className="field-error" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="contact-subject" className="form-label">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange('subject')}
                    className="text-input"
                    placeholder="Internship opportunity / Project collaboration"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? 'error-subject' : undefined}
                  />
                  {errors.subject && (
                    <span id="error-subject" className="field-error" role="alert">
                      {errors.subject}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="contact-message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange('message')}
                    className="textarea-input"
                    placeholder="Share details about the opportunity or project..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'error-message' : undefined}
                  />
                  {errors.message && (
                    <span id="error-message" className="field-error" role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>

                <button type="submit" className="btn btn-primary" disabled={isSending}>
                  <Send size={16} aria-hidden="true" />
                  <span>{isSending ? 'Preparing Email Client...' : 'Send Message'}</span>
                </button>

                {mailtoHref && (
                  <div className="form-feedback" role="status">
                    <p style={{ color: 'var(--text-main)', marginBottom: 6 }}>
                      Opening your default email application to send directly to{' '}
                      <strong>{portfolioConfig.email}</strong>.
                    </p>
                    <a
                      href={mailtoHref}
                      style={{
                        color: 'var(--accent-secondary)',
                        textDecoration: 'underline',
                        fontSize: '0.88rem',
                      }}
                    >
                      Click here if your email client did not open automatically
                    </a>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
