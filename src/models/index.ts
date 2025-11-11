// Domain Models for Rental Property Management

export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: 'apartment' | 'house' | 'condo' | 'townhouse';
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  monthlyRent: number;
  status: 'vacant' | 'occupied' | 'maintenance';
  imageUrl?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  status: 'active' | 'inactive' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}

export interface Lease {
  id: string;
  propertyId: string;
  tenantId: string;
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
  securityDeposit: number;
  status: 'active' | 'expired' | 'terminated' | 'pending';
  terms?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  leaseId: string;
  tenantId: string;
  amount: number;
  dueDate: Date;
  paidDate?: Date;
  status: 'pending' | 'paid' | 'late' | 'overdue';
  paymentMethod?: 'cash' | 'check' | 'bank_transfer' | 'credit_card';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MaintenanceRequest {
  id: string;
  propertyId: string;
  tenantId?: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  category: 'plumbing' | 'electrical' | 'hvac' | 'appliance' | 'structural' | 'other';
  estimatedCost?: number;
  actualCost?: number;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

// Filter and Query types
export interface QueryOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
