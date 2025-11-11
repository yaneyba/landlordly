import { useEffect, useState } from 'react';
import { useDataProvider } from '../hooks/useDataProvider';
import type { Lease, Property, Tenant } from '../models';

export const Leases = () => {
  const dataProvider = useDataProvider();
  const [leases, setLeases] = useState<Lease[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [leasesResult, propertiesResult, tenantsResult] = await Promise.all([
        dataProvider.getLeases({ limit: 100 }),
        dataProvider.getProperties({ limit: 100 }),
        dataProvider.getTenants({ limit: 100 }),
      ]);
      setLeases(leasesResult.data);
      setProperties(propertiesResult.data);
      setTenants(tenantsResult.data);
    } catch (error) {
      console.error('Error loading leases:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPropertyAddress = (propertyId: string) => {
    const property = properties.find((p) => p.id === propertyId);
    return property ? property.address : 'Unknown';
  };

  const getTenantName = (tenantId: string) => {
    const tenant = tenants.find((t) => t.id === tenantId);
    return tenant ? `${tenant.firstName} ${tenant.lastName}` : 'Unknown';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading leases...</p>
      </div>
    );
  }

  return (
    <div className="leases-page">
      <div className="page-header">
        <div>
          <h1>Leases</h1>
          <p className="subtitle">Manage lease agreements</p>
        </div>
      </div>

      {leases.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📄</div>
          <h2>No leases yet</h2>
          <p>Create lease agreements for your properties and tenants</p>
        </div>
      ) : (
        <div className="leases-list">
          <table className="data-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Tenant</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Monthly Rent</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leases.map((lease) => (
                <tr key={lease.id}>
                  <td>{getPropertyAddress(lease.propertyId)}</td>
                  <td>{getTenantName(lease.tenantId)}</td>
                  <td>{new Date(lease.startDate).toLocaleDateString()}</td>
                  <td>{new Date(lease.endDate).toLocaleDateString()}</td>
                  <td>${lease.monthlyRent.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge status-${lease.status}`}>
                      {lease.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
