# Landlordly - Rental Property Management SaaS

A comprehensive rental property management system built for small landlords. Manage properties, tenants, leases, payments, and maintenance requests all in one place.

## Features

### Dashboard
- Overview statistics for properties, tenants, and revenue
- Occupancy rate tracking
- Alerts for overdue payments and pending maintenance
- Quick access to all management sections

### Property Management
- Add, edit, and delete rental properties
- Track property status (vacant, occupied, maintenance)
- Detailed property information (bedrooms, bathrooms, square footage, rent)
- Property descriptions and location details

### Tenant Management
- Manage tenant information and contacts
- Track tenant status (active, inactive, pending)
- Emergency contact information
- Email and phone contact details

### Lease Management
- Create and manage lease agreements
- Link properties to tenants
- Track lease dates and rental amounts
- Security deposit tracking
- Lease terms and conditions

### Payment Tracking
- Monitor rent payment status (pending, paid, overdue)
- Payment history and records
- Multiple payment methods support
- Quick payment status updates
- Overdue payment alerts

### Maintenance Requests
- Track maintenance requests by property
- Priority levels (low, medium, high, urgent)
- Status tracking (open, in progress, completed, cancelled)
- Cost estimation and actual cost tracking
- Categories (plumbing, electrical, HVAC, etc.)

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Custom CSS with CSS Variables
- **State Management**: React Hooks (useState, useEffect)
- **Data Layer**: DataProvider Pattern with MockDataProvider

## Architecture

### DataProvider Pattern
The application uses the DataProvider pattern to abstract data access:

```
IDataProvider (interface)
    ↓
MockDataProvider (in-memory implementation)
    ↓
DataProviderFactory (creates provider instances)
```

This pattern allows easy switching between data sources (mock data, REST API, GraphQL, etc.) without changing component code.

### Project Structure

```
src/
├── models/              # TypeScript interfaces for domain models
│   └── index.ts        # Property, Tenant, Lease, Payment, etc.
├── providers/          # Data provider implementations
│   ├── IDataProvider.ts           # Interface definition
│   ├── MockDataProvider.ts       # In-memory implementation
│   ├── DataProviderFactory.ts    # Factory for creating providers
│   └── index.ts
├── hooks/              # Custom React hooks
│   └── useDataProvider.ts  # Hook to access data provider
├── pages/              # Page components
│   ├── Dashboard.tsx
│   ├── Properties.tsx
│   ├── Tenants.tsx
│   ├── Leases.tsx
│   └── Payments.tsx
├── components/         # Reusable UI components (future)
├── utils/             # Utility functions (future)
├── App.tsx            # Main app component with routing
├── App.css            # Global styles
└── main.tsx           # Application entry point
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd landlordly
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

### Adding a Property
1. Navigate to the Properties page
2. Click "Add Property"
3. Fill in property details
4. Click "Add Property" to save

### Managing Tenants
1. Navigate to the Tenants page
2. Click "Add Tenant"
3. Enter tenant information including emergency contact
4. Click "Add Tenant" to save

### Tracking Payments
1. Navigate to the Payments page
2. View payments organized by status (overdue, pending, paid)
3. Click "Mark as Paid" to update payment status

### Viewing Dashboard
The dashboard provides an at-a-glance view of:
- Total properties and occupancy status
- Active tenants
- Expected monthly revenue
- Payment alerts
- Maintenance requests

## Data Provider Pattern

### Using the DataProvider

All pages use the `useDataProvider` hook:

```typescript
import { useDataProvider } from '../hooks/useDataProvider';

const MyComponent = () => {
  const dataProvider = useDataProvider();

  // Use provider methods
  const properties = await dataProvider.getProperties();
};
```

### Available Methods

The IDataProvider interface includes methods for:
- `getProperties()`, `getProperty()`, `createProperty()`, `updateProperty()`, `deleteProperty()`
- `getTenants()`, `getTenant()`, `createTenant()`, `updateTenant()`, `deleteTenant()`
- `getLeases()`, `getLease()`, `createLease()`, `updateLease()`, `deleteLease()`
- `getPayments()`, `getPayment()`, `createPayment()`, `updatePayment()`, `deletePayment()`
- `getMaintenanceRequests()`, etc.
- `getDashboardStats()`

### Switching Data Providers

To switch from MockDataProvider to an API implementation:

1. Create a new provider implementing IDataProvider:
```typescript
export class ApiDataProvider implements IDataProvider {
  // Implement all IDataProvider methods using API calls
}
```

2. Update DataProviderFactory:
```typescript
case 'api':
  return new ApiDataProvider();
```

3. Set the provider type:
```typescript
DataProviderFactory.setProviderType('api');
```

## Future Enhancements

- User authentication and authorization
- Real-time notifications
- Document management (leases, contracts)
- Financial reporting and analytics
- Rent collection integration
- Tenant portal
- Mobile app
- Multi-property portfolio support
- Expense tracking
- Tax report generation

## Development

### TypeScript Configuration
The project uses strict TypeScript settings with `verbatimModuleSyntax` enabled. Make sure to use type-only imports for types:

```typescript
import type { Property } from '../models';
```

### Code Style
- Use TypeScript for all new files
- Follow React best practices
- Use functional components with hooks
- Keep components focused and reusable

## License

This project is licensed under the MIT License.

## Support

For issues, questions, or contributions, please open an issue on GitHub.
