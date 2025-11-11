import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import './LandingPage.css';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

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
              The all-in-one platform to manage properties, tenants, leases, and payments effortlessly.
            </p>
            <div className="hero-buttons">
              <button
                className="btn btn-primary"
                onClick={() => navigate('/login')}
              >
                Get Started
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
                Track all your properties in one place with detailed information and occupancy status.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3 className="feature-title">Tenant Tracking</h3>
              <p className="feature-description">
                Manage tenant information, contact details, and rental history effortlessly.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📄</div>
              <h3 className="feature-title">Lease Management</h3>
              <p className="feature-description">
                Store and manage all lease agreements with automatic renewal reminders.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3 className="feature-title">Payment Processing</h3>
              <p className="feature-description">
                Track rent payments, send reminders, and generate financial reports.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Analytics Dashboard</h3>
              <p className="feature-description">
                Get insights into your rental business with comprehensive analytics and reports.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h3 className="feature-title">Smart Alerts</h3>
              <p className="feature-description">
                Stay informed with automatic notifications for important events and deadlines.
              </p>
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
              Start Managing Properties
            </button>
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
