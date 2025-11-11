import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Properties } from './pages/Properties';
import { Tenants } from './pages/Tenants';
import { Leases } from './pages/Leases';
import { Payments } from './pages/Payments';
import './App.css';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <Router>
      <div className="app">
        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div className="mobile-overlay" onClick={closeMobileMenu}></div>
        )}

        <nav className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="sidebar-header">
            <h1 className="app-title">🏠 Landlordly</h1>
            <p className="app-subtitle">Property Management</p>
          </div>
          <ul className="nav-menu">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">📊</span>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/properties"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">🏠</span>
                Properties
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tenants"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">👥</span>
                Tenants
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/leases"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">📄</span>
                Leases
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/payments"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">💰</span>
                Payments
              </NavLink>
            </li>
          </ul>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/tenants" element={<Tenants />} />
            <Route path="/leases" element={<Leases />} />
            <Route path="/payments" element={<Payments />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
