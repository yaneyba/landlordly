import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Properties } from './pages/Properties';
import { Tenants } from './pages/Tenants';
import { Leases } from './pages/Leases';
import { Payments } from './pages/Payments';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';
import './App.css';

// Component for the authenticated app layout
function AuthenticatedApp() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout, user } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  return (
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
          {user && (
            <div className="user-info">
              <span className="user-icon">👤</span>
              <span className="user-name">{user.name}</span>
            </div>
          )}
        </div>
        <ul className="nav-menu">
          <li>
            <NavLink
              to="/dashboard"
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
        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            Sign Out
          </button>
        </div>
      </nav>
      <main className="main-content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/leases" element={<Leases />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AuthenticatedApp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
