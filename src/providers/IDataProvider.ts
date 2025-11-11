import type {
  Property,
  Tenant,
  Lease,
  Payment,
  MaintenanceRequest,
  QueryOptions,
  PaginatedResult,
} from '../models';

/**
 * IDataProvider interface defines the contract for data access operations
 * This allows switching between different data sources (mock, API, etc.)
 */
export interface IDataProvider {
  // Property operations
  getProperties(options?: QueryOptions): Promise<PaginatedResult<Property>>;
  getProperty(id: string): Promise<Property | null>;
  createProperty(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property>;
  updateProperty(id: string, property: Partial<Property>): Promise<Property>;
  deleteProperty(id: string): Promise<boolean>;

  // Tenant operations
  getTenants(options?: QueryOptions): Promise<PaginatedResult<Tenant>>;
  getTenant(id: string): Promise<Tenant | null>;
  createTenant(tenant: Omit<Tenant, 'id' | 'createdAt' | 'updatedAt'>): Promise<Tenant>;
  updateTenant(id: string, tenant: Partial<Tenant>): Promise<Tenant>;
  deleteTenant(id: string): Promise<boolean>;

  // Lease operations
  getLeases(options?: QueryOptions): Promise<PaginatedResult<Lease>>;
  getLease(id: string): Promise<Lease | null>;
  getLeasesByProperty(propertyId: string): Promise<Lease[]>;
  getLeasesByTenant(tenantId: string): Promise<Lease[]>;
  createLease(lease: Omit<Lease, 'id' | 'createdAt' | 'updatedAt'>): Promise<Lease>;
  updateLease(id: string, lease: Partial<Lease>): Promise<Lease>;
  deleteLease(id: string): Promise<boolean>;

  // Payment operations
  getPayments(options?: QueryOptions): Promise<PaginatedResult<Payment>>;
  getPayment(id: string): Promise<Payment | null>;
  getPaymentsByLease(leaseId: string): Promise<Payment[]>;
  getPaymentsByTenant(tenantId: string): Promise<Payment[]>;
  createPayment(payment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Payment>;
  updatePayment(id: string, payment: Partial<Payment>): Promise<Payment>;
  deletePayment(id: string): Promise<boolean>;

  // Maintenance Request operations
  getMaintenanceRequests(options?: QueryOptions): Promise<PaginatedResult<MaintenanceRequest>>;
  getMaintenanceRequest(id: string): Promise<MaintenanceRequest | null>;
  getMaintenanceRequestsByProperty(propertyId: string): Promise<MaintenanceRequest[]>;
  createMaintenanceRequest(
    request: Omit<MaintenanceRequest, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<MaintenanceRequest>;
  updateMaintenanceRequest(
    id: string,
    request: Partial<MaintenanceRequest>
  ): Promise<MaintenanceRequest>;
  deleteMaintenanceRequest(id: string): Promise<boolean>;

  // Dashboard & Analytics
  getDashboardStats(): Promise<{
    totalProperties: number;
    occupiedProperties: number;
    vacantProperties: number;
    totalTenants: number;
    activeTenants: number;
    totalMonthlyRevenue: number;
    pendingPayments: number;
    overduePayments: number;
    openMaintenanceRequests: number;
  }>;
}
