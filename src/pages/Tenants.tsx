import { useEffect, useState } from 'react';
import { useDataProvider } from '../hooks/useDataProvider';
import type { Tenant } from '../models';

export const Tenants = () => {
  const dataProvider = useDataProvider();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);

  useEffect(() => {
    loadTenants();
  }, []);

  const loadTenants = async () => {
    try {
      const result = await dataProvider.getTenants({ limit: 100 });
      setTenants(result.data);
    } catch (error) {
      console.error('Error loading tenants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTenant = () => {
    setEditingTenant(null);
    setShowAddForm(true);
  };

  const handleEditTenant = (tenant: Tenant) => {
    setEditingTenant(tenant);
    setShowAddForm(true);
  };

  const handleDeleteTenant = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tenant?')) return;

    try {
      await dataProvider.deleteTenant(id);
      await loadTenants();
    } catch (error) {
      console.error('Error deleting tenant:', error);
      alert('Failed to delete tenant');
    }
  };

  const handleFormClose = async (refresh: boolean) => {
    setShowAddForm(false);
    setEditingTenant(null);
    if (refresh) {
      await loadTenants();
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading tenants...</p>
      </div>
    );
  }

  return (
    <div className="tenants-page">
      <div className="page-header">
        <div>
          <h1>Tenants</h1>
          <p className="subtitle">Manage your tenants</p>
        </div>
        <button className="btn-primary" onClick={handleAddTenant}>
          + Add Tenant
        </button>
      </div>

      {showAddForm && (
        <TenantForm tenant={editingTenant} onClose={handleFormClose} />
      )}

      {tenants.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h2>No tenants yet</h2>
          <p>Add tenants to start managing your rental relationships</p>
          <button className="btn-primary" onClick={handleAddTenant}>
            Add Your First Tenant
          </button>
        </div>
      ) : (
        <div className="tenants-list">
          {tenants.map((tenant) => (
            <TenantCard
              key={tenant.id}
              tenant={tenant}
              onEdit={handleEditTenant}
              onDelete={handleDeleteTenant}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface TenantCardProps {
  tenant: Tenant;
  onEdit: (tenant: Tenant) => void;
  onDelete: (id: string) => void;
}

const TenantCard = ({ tenant, onEdit, onDelete }: TenantCardProps) => {
  const statusColors = {
    active: 'status-active',
    inactive: 'status-inactive',
    pending: 'status-pending',
  };

  return (
    <div className="tenant-card">
      <div className="tenant-header">
        <div className="tenant-avatar">
          {tenant.firstName[0]}
          {tenant.lastName[0]}
        </div>
        <div className="tenant-info">
          <h3>
            {tenant.firstName} {tenant.lastName}
          </h3>
          <div className={`tenant-status ${statusColors[tenant.status]}`}>
            {tenant.status}
          </div>
        </div>
      </div>
      <div className="tenant-details">
        <div className="detail-row">
          <span className="detail-label">📧 Email:</span>
          <span className="detail-value">{tenant.email}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">📱 Phone:</span>
          <span className="detail-value">{tenant.phone}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">🚨 Emergency Contact:</span>
          <span className="detail-value">
            {tenant.emergencyContact.name} ({tenant.emergencyContact.relationship}) -{' '}
            {tenant.emergencyContact.phone}
          </span>
        </div>
      </div>
      <div className="tenant-actions">
        <button className="btn-secondary" onClick={() => onEdit(tenant)}>
          Edit
        </button>
        <button className="btn-danger" onClick={() => onDelete(tenant.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

interface TenantFormProps {
  tenant: Tenant | null;
  onClose: (refresh: boolean) => void;
}

const TenantForm = ({ tenant, onClose }: TenantFormProps) => {
  const dataProvider = useDataProvider();
  const [formData, setFormData] = useState({
    firstName: tenant?.firstName || '',
    lastName: tenant?.lastName || '',
    email: tenant?.email || '',
    phone: tenant?.phone || '',
    status: tenant?.status || 'pending',
    emergencyContact: {
      name: tenant?.emergencyContact.name || '',
      phone: tenant?.emergencyContact.phone || '',
      relationship: tenant?.emergencyContact.relationship || '',
    },
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (tenant) {
        await dataProvider.updateTenant(tenant.id, formData);
      } else {
        await dataProvider.createTenant(formData);
      }
      onClose(true);
    } catch (error) {
      console.error('Error saving tenant:', error);
      alert('Failed to save tenant');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith('emergency_')) {
      const field = name.replace('emergency_', '');
      setFormData((prev) => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{tenant ? 'Edit Tenant' : 'Add New Tenant'}</h2>
          <button className="modal-close" onClick={() => onClose(false)}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="tenant-form">
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="status">Status *</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Emergency Contact</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="emergency_name">Name *</label>
                <input
                  type="text"
                  id="emergency_name"
                  name="emergency_name"
                  value={formData.emergencyContact.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="emergency_relationship">Relationship *</label>
                <input
                  type="text"
                  id="emergency_relationship"
                  name="emergency_relationship"
                  value={formData.emergencyContact.relationship}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="emergency_phone">Phone *</label>
                <input
                  type="tel"
                  id="emergency_phone"
                  name="emergency_phone"
                  value={formData.emergencyContact.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => onClose(false)}
              disabled={submitting}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : tenant ? 'Update Tenant' : 'Add Tenant'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
