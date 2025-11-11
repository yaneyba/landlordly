import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import './LandingPage.css';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [signupSubmitted, setSignupSubmitted] = useState(false);

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      // For now, just show success message
      // In production, this would send to a backend endpoint
      console.log('Early access signup:', email);
      setSignupSubmitted(true);
      setEmail('');
      setTimeout(() => setSignupSubmitted(false), 5000);
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim()) {
      // For now, just show success message
      // In production, this would send to a backend endpoint
      console.log('Feedback submitted:', feedback);
      setFeedbackSubmitted(true);
      setFeedback('');
      setTimeout(() => setFeedbackSubmitted(false), 3000);
    }
  };

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="landing-nav-content">
          <div className="logo">
            <span className="logo-icon">🏠</span>
            <span className="logo-text">Landlordly</span>
          </div>
          <button
            className="nav-button"
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>
        </div>
      </nav>

      <main className="landing-main">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Simplify Your Property Management
            </h1>
            <p className="hero-subtitle">
              The fast, friendly platform for small landlords managing up to 20 doors—no more spreadsheets or stress.
            </p>
            <form onSubmit={handleSignupSubmit} className="early-access-form">
              <input
                type="email"
                className="early-access-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary early-access-button">
                Get Early Access
              </button>
            </form>
            {signupSubmitted && (
              <div className="signup-success">
                Thanks! We'll be in touch soon.
              </div>
            )}
            <div className="hero-buttons">
              <button
                className="btn btn-primary"
                onClick={() => navigate('/login')}
              >
                Try Free – No Card Needed
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  const featuresSection = document.getElementById('features');
                  featuresSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-illustration">
              <span className="illustration-icon">🏘️</span>
            </div>
          </div>
        </section>

        <section id="features" className="features-section">
          <h2 className="section-title">Everything You Need</h2>
          <p className="section-subtitle">Powerful features to streamline your rental business</p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3 className="feature-title">Property Management</h3>
              <p className="feature-description">
                Instantly see which units need your attention—no more guessing!
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3 className="feature-title">Tenant Tracking</h3>
              <p className="feature-description">
                Never hunt for a tenant's info again—keep it all in one place.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📄</div>
              <h3 className="feature-title">Lease Management</h3>
              <p className="feature-description">
                Avoid costly missed renewals with automatic reminders.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3 className="feature-title">Payment Processing</h3>
              <p className="feature-description">
                Stop chasing rent—set up automatic reminders and easy tracking.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Analytics Dashboard</h3>
              <p className="feature-description">
                Know your cashflow and income at a glance with smart reports.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h3 className="feature-title">Smart Alerts</h3>
              <p className="feature-description">
                Get notified before problems happen—not after.
              </p>
            </div>
          </div>
        </section>

        <section className="value-prop-section">
          <div className="value-prop-content">
            <h2 className="value-prop-title">Built for Landlords, By a Landlord</h2>
            <p className="value-prop-text">
              Tired of losing track of payments and documents? Landlordly is built with your real headaches in mind.
              No clunky systems, no endless paperwork—just simple tools that work the way you do.
            </p>
            <div className="trust-signals">
              <div className="trust-item">
                <span className="trust-icon">🔒</span>
                <span className="trust-text">Your data is secure & private</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">⚡</span>
                <span className="trust-text">Free for early users</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">💡</span>
                <span className="trust-text">Shape the roadmap with us</span>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-subtitle">
              Join landlords who are simplifying their property management today.
            </p>
            <button
              className="btn btn-large btn-primary"
              onClick={() => navigate('/login')}
            >
              Start Free – No Card Required
            </button>
          </div>
        </section>
        <section className="feedback-section">
          <div className="feedback-content">
            <h2 className="feedback-title">Help Us Build What You Need</h2>
            <p className="feedback-subtitle">
              What feature would make your life easier? We're listening!
            </p>
            <form onSubmit={handleFeedbackSubmit} className="feedback-form">
              <textarea
                className="feedback-textarea"
                placeholder="Tell us what you'd like to see in Landlordly..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
              />
              <button type="submit" className="btn btn-primary feedback-submit">
                Send Feedback
              </button>
              {feedbackSubmitted && (
                <div className="feedback-success">
                  Thank you! Your feedback helps us improve.
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-icon">🏠</span>
            <span className="logo-text">Landlordly</span>
          </div>
          <p className="footer-text">
            © 2025 Landlordly. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
