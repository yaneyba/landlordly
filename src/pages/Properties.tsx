import { useEffect, useState } from 'react';
import { useDataProvider } from '../hooks/useDataProvider';
import type { Property } from '../models';

export const Properties = () => {
  const dataProvider = useDataProvider();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const result = await dataProvider.getProperties({ limit: 100 });
      setProperties(result.data);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProperty = () => {
    setEditingProperty(null);
    setShowAddForm(true);
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setShowAddForm(true);
  };

  const handleDeleteProperty = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      await dataProvider.deleteProperty(id);
      await loadProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property');
    }
  };

  const handleFormClose = async (refresh: boolean) => {
    setShowAddForm(false);
    setEditingProperty(null);
    if (refresh) {
      await loadProperties();
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading properties...</p>
      </div>
    );
  }

  return (
    <div className="properties-page">
      <div className="page-header">
        <div>
          <h1>Properties</h1>
          <p className="subtitle">Manage your rental properties</p>
        </div>
        <button className="btn-primary" onClick={handleAddProperty}>
          + Add Property
        </button>
      </div>

      {showAddForm && (
        <PropertyForm
          property={editingProperty}
          onClose={handleFormClose}
        />
      )}

      {properties.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🏠</div>
          <h2>No properties yet</h2>
          <p>Get started by adding your first rental property</p>
          <button className="btn-primary" onClick={handleAddProperty}>
            Add Your First Property
          </button>
        </div>
      ) : (
        <div className="properties-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onEdit={handleEditProperty}
              onDelete={handleDeleteProperty}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface PropertyCardProps {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
}

const PropertyCard = ({ property, onEdit, onDelete }: PropertyCardProps) => {
  const statusColors = {
    vacant: 'status-vacant',
    occupied: 'status-occupied',
    maintenance: 'status-maintenance',
  };

  return (
    <div className="property-card">
      <div className={`property-status ${statusColors[property.status]}`}>
        {property.status}
      </div>
      <div className="property-header">
        <h3>{property.address}</h3>
        <p className="property-location">
          {property.city}, {property.state} {property.zipCode}
        </p>
      </div>
      <div className="property-details">
        <div className="property-specs">
          <span>🛏️ {property.bedrooms} bed</span>
          <span>🚿 {property.bathrooms} bath</span>
          <span>📐 {property.squareFeet} sq ft</span>
        </div>
        <div className="property-type">{property.propertyType}</div>
      </div>
      <div className="property-rent">
        <span className="rent-label">Monthly Rent</span>
        <span className="rent-amount">${property.monthlyRent.toLocaleString()}</span>
      </div>
      {property.description && (
        <p className="property-description">{property.description}</p>
      )}
      <div className="property-actions">
        <button className="btn-secondary" onClick={() => onEdit(property)}>
          Edit
        </button>
        <button className="btn-danger" onClick={() => onDelete(property.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

interface PropertyFormProps {
  property: Property | null;
  onClose: (refresh: boolean) => void;
}

const PropertyForm = ({ property, onClose }: PropertyFormProps) => {
  const dataProvider = useDataProvider();
  const [formData, setFormData] = useState({
    address: property?.address || '',
    city: property?.city || '',
    state: property?.state || '',
    zipCode: property?.zipCode || '',
    propertyType: property?.propertyType || 'apartment',
    bedrooms: property?.bedrooms || 1,
    bathrooms: property?.bathrooms || 1,
    squareFeet: property?.squareFeet || 0,
    monthlyRent: property?.monthlyRent || 0,
    status: property?.status || 'vacant',
    description: property?.description || '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (property) {
        await dataProvider.updateProperty(property.id, formData);
      } else {
        await dataProvider.createProperty(formData);
      }
      onClose(true);
    } catch (error) {
      console.error('Error saving property:', error);
      alert('Failed to save property');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{property ? 'Edit Property' : 'Add New Property'}</h2>
          <button className="modal-close" onClick={() => onClose(false)}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="property-form">
          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State *</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                maxLength={2}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">Zip Code *</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="propertyType">Property Type *</label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="status">Status *</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="vacant">Vacant</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="bedrooms">Bedrooms *</label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bathrooms">Bathrooms *</label>
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                min="0"
                step="0.5"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="squareFeet">Square Feet *</label>
              <input
                type="number"
                id="squareFeet"
                name="squareFeet"
                value={formData.squareFeet}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="monthlyRent">Monthly Rent ($) *</label>
              <input
                type="number"
                id="monthlyRent"
                name="monthlyRent"
                value={formData.monthlyRent}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
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
              {submitting ? 'Saving...' : property ? 'Update Property' : 'Add Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
