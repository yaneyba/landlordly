import { useEffect, useState } from 'react';
import { useDataProvider } from '../hooks/useDataProvider';
import { Link } from 'react-router-dom';

interface DashboardStats {
  totalProperties: number;
  occupiedProperties: number;
  vacantProperties: number;
  totalTenants: number;
  activeTenants: number;
  totalMonthlyRevenue: number;
  pendingPayments: number;
  overduePayments: number;
  openMaintenanceRequests: number;
}

export const Dashboard = () => {
  const dataProvider = useDataProvider();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await dataProvider.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [dataProvider]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="error-container">
        <p>Failed to load dashboard statistics</p>
      </div>
    );
  }

  const occupancyRate = stats.totalProperties > 0
    ? ((stats.occupiedProperties / stats.totalProperties) * 100).toFixed(1)
    : '0';

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="subtitle">Overview of your rental property business</p>
      </div>

      <div className="stats-grid">
        <Link to="/properties" className="stat-card">
          <div className="stat-icon">🏠</div>
          <div className="stat-content">
            <h3>Total Properties</h3>
            <p className="stat-value">{stats.totalProperties}</p>
            <p className="stat-detail">
              {stats.occupiedProperties} occupied, {stats.vacantProperties} vacant
            </p>
          </div>
        </Link>

        <Link to="/tenants" className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Active Tenants</h3>
            <p className="stat-value">{stats.activeTenants}</p>
            <p className="stat-detail">of {stats.totalTenants} total</p>
          </div>
        </Link>

        <Link to="/payments" className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Monthly Revenue</h3>
            <p className="stat-value">${stats.totalMonthlyRevenue.toLocaleString()}</p>
            <p className="stat-detail">Expected monthly income</p>
          </div>
        </Link>

        <div className="stat-card occupancy-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Occupancy Rate</h3>
            <p className="stat-value">{occupancyRate}%</p>
            <p className="stat-detail">
              {stats.occupiedProperties} of {stats.totalProperties} occupied
            </p>
          </div>
        </div>
      </div>

      <div className="alerts-section">
        <h2>Alerts & Actions</h2>
        <div className="alerts-grid">
          {stats.overduePayments > 0 && (
            <Link to="/payments?filter=overdue" className="alert-card alert-critical">
              <div className="alert-icon">⚠️</div>
              <div className="alert-content">
                <h3>Overdue Payments</h3>
                <p className="alert-value">{stats.overduePayments}</p>
                <p className="alert-detail">Require immediate attention</p>
              </div>
            </Link>
          )}

          {stats.pendingPayments > 0 && (
            <Link to="/payments?filter=pending" className="alert-card alert-warning">
              <div className="alert-icon">📅</div>
              <div className="alert-content">
                <h3>Pending Payments</h3>
                <p className="alert-value">{stats.pendingPayments}</p>
                <p className="alert-detail">Upcoming or not yet received</p>
              </div>
            </Link>
          )}

          {stats.openMaintenanceRequests > 0 && (
            <Link to="/maintenance" className="alert-card alert-info">
              <div className="alert-icon">🔧</div>
              <div className="alert-content">
                <h3>Maintenance Requests</h3>
                <p className="alert-value">{stats.openMaintenanceRequests}</p>
                <p className="alert-detail">Open or in progress</p>
              </div>
            </Link>
          )}

          {stats.vacantProperties > 0 && (
            <Link to="/properties?filter=vacant" className="alert-card alert-info">
              <div className="alert-icon">🏚️</div>
              <div className="alert-content">
                <h3>Vacant Properties</h3>
                <p className="alert-value">{stats.vacantProperties}</p>
                <p className="alert-detail">Ready for new tenants</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
