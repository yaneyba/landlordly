import type { IDataProvider } from './IDataProvider';
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
 * MockDataProvider - In-memory implementation of IDataProvider for development and testing
 */
export class MockDataProvider implements IDataProvider {
  private properties: Property[] = [];
  private tenants: Tenant[] = [];
  private leases: Lease[] = [];
  private payments: Payment[] = [];
  private maintenanceRequests: MaintenanceRequest[] = [];

  constructor() {
    this.initializeMockData();
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeMockData(): void {
    // Create mock properties
    this.properties = [
      {
        id: '1',
        address: '123 Oak Street',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102',
        propertyType: 'apartment',
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1200,
        monthlyRent: 3500,
        status: 'occupied',
        description: 'Modern apartment in downtown SF',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: '2',
        address: '456 Maple Avenue',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94110',
        propertyType: 'house',
        bedrooms: 3,
        bathrooms: 2.5,
        squareFeet: 1800,
        monthlyRent: 4500,
        status: 'occupied',
        description: 'Beautiful family home with backyard',
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01'),
      },
      {
        id: '3',
        address: '789 Pine Court',
        city: 'Oakland',
        state: 'CA',
        zipCode: '94612',
        propertyType: 'condo',
        bedrooms: 1,
        bathrooms: 1,
        squareFeet: 800,
        monthlyRent: 2200,
        status: 'vacant',
        description: 'Cozy condo near transit',
        createdAt: new Date('2024-03-10'),
        updatedAt: new Date('2024-03-10'),
      },
      {
        id: '4',
        address: '321 Elm Boulevard',
        city: 'Berkeley',
        state: 'CA',
        zipCode: '94704',
        propertyType: 'townhouse',
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1500,
        monthlyRent: 3800,
        status: 'occupied',
        description: 'Spacious townhouse near UC Berkeley',
        createdAt: new Date('2024-02-20'),
        updatedAt: new Date('2024-02-20'),
      },
    ];

    // Create mock tenants
    this.tenants = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        phone: '555-0101',
        emergencyContact: {
          name: 'Jane Doe',
          phone: '555-0102',
          relationship: 'Spouse',
        },
        status: 'active',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20'),
      },
      {
        id: '2',
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.j@email.com',
        phone: '555-0201',
        emergencyContact: {
          name: 'Bob Johnson',
          phone: '555-0202',
          relationship: 'Father',
        },
        status: 'active',
        createdAt: new Date('2024-02-05'),
        updatedAt: new Date('2024-02-05'),
      },
      {
        id: '3',
        firstName: 'Michael',
        lastName: 'Smith',
        email: 'michael.smith@email.com',
        phone: '555-0301',
        emergencyContact: {
          name: 'Sarah Smith',
          phone: '555-0302',
          relationship: 'Sister',
        },
        status: 'active',
        createdAt: new Date('2024-02-25'),
        updatedAt: new Date('2024-02-25'),
      },
    ];

    // Create mock leases
    this.leases = [
      {
        id: '1',
        propertyId: '1',
        tenantId: '1',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2025-01-31'),
        monthlyRent: 3500,
        securityDeposit: 3500,
        status: 'active',
        terms: '12-month lease, utilities not included',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20'),
      },
      {
        id: '2',
        propertyId: '2',
        tenantId: '2',
        startDate: new Date('2024-03-01'),
        endDate: new Date('2025-02-28'),
        monthlyRent: 4500,
        securityDeposit: 4500,
        status: 'active',
        terms: '12-month lease, tenant responsible for utilities',
        createdAt: new Date('2024-02-05'),
        updatedAt: new Date('2024-02-05'),
      },
      {
        id: '3',
        propertyId: '4',
        tenantId: '3',
        startDate: new Date('2024-03-15'),
        endDate: new Date('2025-03-14'),
        monthlyRent: 3800,
        securityDeposit: 3800,
        status: 'active',
        terms: '12-month lease',
        createdAt: new Date('2024-02-25'),
        updatedAt: new Date('2024-02-25'),
      },
    ];

    // Create mock payments
    this.payments = [
      {
        id: '1',
        leaseId: '1',
        tenantId: '1',
        amount: 3500,
        dueDate: new Date('2024-11-01'),
        paidDate: new Date('2024-10-28'),
        status: 'paid',
        paymentMethod: 'bank_transfer',
        createdAt: new Date('2024-10-01'),
        updatedAt: new Date('2024-10-28'),
      },
      {
        id: '2',
        leaseId: '1',
        tenantId: '1',
        amount: 3500,
        dueDate: new Date('2024-12-01'),
        status: 'pending',
        createdAt: new Date('2024-11-01'),
        updatedAt: new Date('2024-11-01'),
      },
      {
        id: '3',
        leaseId: '2',
        tenantId: '2',
        amount: 4500,
        dueDate: new Date('2024-11-01'),
        paidDate: new Date('2024-11-01'),
        status: 'paid',
        paymentMethod: 'check',
        createdAt: new Date('2024-10-01'),
        updatedAt: new Date('2024-11-01'),
      },
      {
        id: '4',
        leaseId: '2',
        tenantId: '2',
        amount: 4500,
        dueDate: new Date('2024-12-01'),
        status: 'pending',
        createdAt: new Date('2024-11-01'),
        updatedAt: new Date('2024-11-01'),
      },
      {
        id: '5',
        leaseId: '3',
        tenantId: '3',
        amount: 3800,
        dueDate: new Date('2024-10-15'),
        status: 'overdue',
        createdAt: new Date('2024-09-15'),
        updatedAt: new Date('2024-09-15'),
      },
      {
        id: '6',
        leaseId: '3',
        tenantId: '3',
        amount: 3800,
        dueDate: new Date('2024-11-15'),
        status: 'pending',
        createdAt: new Date('2024-10-15'),
        updatedAt: new Date('2024-10-15'),
      },
    ];

    // Create mock maintenance requests
    this.maintenanceRequests = [
      {
        id: '1',
        propertyId: '1',
        tenantId: '1',
        title: 'Leaking faucet in kitchen',
        description: 'The kitchen faucet has been dripping constantly',
        priority: 'medium',
        status: 'in_progress',
        category: 'plumbing',
        estimatedCost: 150,
        createdAt: new Date('2024-10-15'),
        updatedAt: new Date('2024-10-16'),
      },
      {
        id: '2',
        propertyId: '2',
        tenantId: '2',
        title: 'HVAC not heating properly',
        description: 'Heater is not reaching set temperature',
        priority: 'high',
        status: 'open',
        category: 'hvac',
        estimatedCost: 350,
        createdAt: new Date('2024-11-05'),
        updatedAt: new Date('2024-11-05'),
      },
      {
        id: '3',
        propertyId: '4',
        tenantId: '3',
        title: 'Broken dishwasher',
        description: 'Dishwasher stopped working mid-cycle',
        priority: 'low',
        status: 'open',
        category: 'appliance',
        createdAt: new Date('2024-11-08'),
        updatedAt: new Date('2024-11-08'),
      },
    ];
  }

  // Helper method to paginate results
  private paginate<T>(
    items: T[],
    options?: QueryOptions
  ): PaginatedResult<T> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedItems = items.slice(start, end);

    return {
      data: paginatedItems,
      total: items.length,
      page,
      limit,
      totalPages: Math.ceil(items.length / limit),
    };
  }

  // Property operations
  async getProperties(options?: QueryOptions): Promise<PaginatedResult<Property>> {
    await this.simulateDelay();
    return this.paginate(this.properties, options);
  }

  async getProperty(id: string): Promise<Property | null> {
    await this.simulateDelay();
    return this.properties.find((p) => p.id === id) || null;
  }

  async createProperty(
    property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Property> {
    await this.simulateDelay();
    const newProperty: Property = {
      ...property,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.properties.push(newProperty);
    return newProperty;
  }

  async updateProperty(id: string, property: Partial<Property>): Promise<Property> {
    await this.simulateDelay();
    const index = this.properties.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Property with id ${id} not found`);
    }
    this.properties[index] = {
      ...this.properties[index],
      ...property,
      updatedAt: new Date(),
    };
    return this.properties[index];
  }

  async deleteProperty(id: string): Promise<boolean> {
    await this.simulateDelay();
    const index = this.properties.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.properties.splice(index, 1);
    return true;
  }

  // Tenant operations
  async getTenants(options?: QueryOptions): Promise<PaginatedResult<Tenant>> {
    await this.simulateDelay();
    return this.paginate(this.tenants, options);
  }

  async getTenant(id: string): Promise<Tenant | null> {
    await this.simulateDelay();
    return this.tenants.find((t) => t.id === id) || null;
  }

  async createTenant(
    tenant: Omit<Tenant, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Tenant> {
    await this.simulateDelay();
    const newTenant: Tenant = {
      ...tenant,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tenants.push(newTenant);
    return newTenant;
  }

  async updateTenant(id: string, tenant: Partial<Tenant>): Promise<Tenant> {
    await this.simulateDelay();
    const index = this.tenants.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error(`Tenant with id ${id} not found`);
    }
    this.tenants[index] = {
      ...this.tenants[index],
      ...tenant,
      updatedAt: new Date(),
    };
    return this.tenants[index];
  }

  async deleteTenant(id: string): Promise<boolean> {
    await this.simulateDelay();
    const index = this.tenants.findIndex((t) => t.id === id);
    if (index === -1) return false;
    this.tenants.splice(index, 1);
    return true;
  }

  // Lease operations
  async getLeases(options?: QueryOptions): Promise<PaginatedResult<Lease>> {
    await this.simulateDelay();
    return this.paginate(this.leases, options);
  }

  async getLease(id: string): Promise<Lease | null> {
    await this.simulateDelay();
    return this.leases.find((l) => l.id === id) || null;
  }

  async getLeasesByProperty(propertyId: string): Promise<Lease[]> {
    await this.simulateDelay();
    return this.leases.filter((l) => l.propertyId === propertyId);
  }

  async getLeasesByTenant(tenantId: string): Promise<Lease[]> {
    await this.simulateDelay();
    return this.leases.filter((l) => l.tenantId === tenantId);
  }

  async createLease(
    lease: Omit<Lease, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Lease> {
    await this.simulateDelay();
    const newLease: Lease = {
      ...lease,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.leases.push(newLease);
    return newLease;
  }

  async updateLease(id: string, lease: Partial<Lease>): Promise<Lease> {
    await this.simulateDelay();
    const index = this.leases.findIndex((l) => l.id === id);
    if (index === -1) {
      throw new Error(`Lease with id ${id} not found`);
    }
    this.leases[index] = {
      ...this.leases[index],
      ...lease,
      updatedAt: new Date(),
    };
    return this.leases[index];
  }

  async deleteLease(id: string): Promise<boolean> {
    await this.simulateDelay();
    const index = this.leases.findIndex((l) => l.id === id);
    if (index === -1) return false;
    this.leases.splice(index, 1);
    return true;
  }

  // Payment operations
  async getPayments(options?: QueryOptions): Promise<PaginatedResult<Payment>> {
    await this.simulateDelay();
    return this.paginate(this.payments, options);
  }

  async getPayment(id: string): Promise<Payment | null> {
    await this.simulateDelay();
    return this.payments.find((p) => p.id === id) || null;
  }

  async getPaymentsByLease(leaseId: string): Promise<Payment[]> {
    await this.simulateDelay();
    return this.payments.filter((p) => p.leaseId === leaseId);
  }

  async getPaymentsByTenant(tenantId: string): Promise<Payment[]> {
    await this.simulateDelay();
    return this.payments.filter((p) => p.tenantId === tenantId);
  }

  async createPayment(
    payment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Payment> {
    await this.simulateDelay();
    const newPayment: Payment = {
      ...payment,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.payments.push(newPayment);
    return newPayment;
  }

  async updatePayment(id: string, payment: Partial<Payment>): Promise<Payment> {
    await this.simulateDelay();
    const index = this.payments.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Payment with id ${id} not found`);
    }
    this.payments[index] = {
      ...this.payments[index],
      ...payment,
      updatedAt: new Date(),
    };
    return this.payments[index];
  }

  async deletePayment(id: string): Promise<boolean> {
    await this.simulateDelay();
    const index = this.payments.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.payments.splice(index, 1);
    return true;
  }

  // Maintenance Request operations
  async getMaintenanceRequests(
    options?: QueryOptions
  ): Promise<PaginatedResult<MaintenanceRequest>> {
    await this.simulateDelay();
    return this.paginate(this.maintenanceRequests, options);
  }

  async getMaintenanceRequest(id: string): Promise<MaintenanceRequest | null> {
    await this.simulateDelay();
    return this.maintenanceRequests.find((m) => m.id === id) || null;
  }

  async getMaintenanceRequestsByProperty(
    propertyId: string
  ): Promise<MaintenanceRequest[]> {
    await this.simulateDelay();
    return this.maintenanceRequests.filter((m) => m.propertyId === propertyId);
  }

  async createMaintenanceRequest(
    request: Omit<MaintenanceRequest, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<MaintenanceRequest> {
    await this.simulateDelay();
    const newRequest: MaintenanceRequest = {
      ...request,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.maintenanceRequests.push(newRequest);
    return newRequest;
  }

  async updateMaintenanceRequest(
    id: string,
    request: Partial<MaintenanceRequest>
  ): Promise<MaintenanceRequest> {
    await this.simulateDelay();
    const index = this.maintenanceRequests.findIndex((m) => m.id === id);
    if (index === -1) {
      throw new Error(`Maintenance request with id ${id} not found`);
    }
    this.maintenanceRequests[index] = {
      ...this.maintenanceRequests[index],
      ...request,
      updatedAt: new Date(),
    };
    return this.maintenanceRequests[index];
  }

  async deleteMaintenanceRequest(id: string): Promise<boolean> {
    await this.simulateDelay();
    const index = this.maintenanceRequests.findIndex((m) => m.id === id);
    if (index === -1) return false;
    this.maintenanceRequests.splice(index, 1);
    return true;
  }

  // Dashboard & Analytics
  async getDashboardStats() {
    await this.simulateDelay();

    const totalProperties = this.properties.length;
    const occupiedProperties = this.properties.filter((p) => p.status === 'occupied').length;
    const vacantProperties = this.properties.filter((p) => p.status === 'vacant').length;

    const totalTenants = this.tenants.length;
    const activeTenants = this.tenants.filter((t) => t.status === 'active').length;

    const activeLeases = this.leases.filter((l) => l.status === 'active');
    const totalMonthlyRevenue = activeLeases.reduce((sum, lease) => sum + lease.monthlyRent, 0);

    const pendingPayments = this.payments.filter((p) => p.status === 'pending').length;
    const overduePayments = this.payments.filter((p) => p.status === 'overdue').length;

    const openMaintenanceRequests = this.maintenanceRequests.filter(
      (m) => m.status === 'open' || m.status === 'in_progress'
    ).length;

    return {
      totalProperties,
      occupiedProperties,
      vacantProperties,
      totalTenants,
      activeTenants,
      totalMonthlyRevenue,
      pendingPayments,
      overduePayments,
      openMaintenanceRequests,
    };
  }

  // Simulate network delay for realistic behavior
  private simulateDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 100));
  }
}
