import { useEffect, useState } from 'react';
import { useDataProvider } from '../hooks/useDataProvider';
import type { Payment, Tenant } from '../models';

export const Payments = () => {
  const dataProvider = useDataProvider();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [paymentsResult, tenantsResult] = await Promise.all([
        dataProvider.getPayments({ limit: 100 }),
        dataProvider.getTenants({ limit: 100 }),
      ]);
      setPayments(paymentsResult.data);
      setTenants(tenantsResult.data);
    } catch (error) {
      console.error('Error loading payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTenantName = (tenantId: string) => {
    const tenant = tenants.find((t) => t.id === tenantId);
    return tenant ? `${tenant.firstName} ${tenant.lastName}` : 'Unknown';
  };

  const handleMarkAsPaid = async (payment: Payment) => {
    try {
      await dataProvider.updatePayment(payment.id, {
        status: 'paid',
        paidDate: new Date(),
        paymentMethod: 'bank_transfer',
      });
      await loadData();
    } catch (error) {
      console.error('Error updating payment:', error);
      alert('Failed to update payment');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading payments...</p>
      </div>
    );
  }

  const pendingPayments = payments.filter((p) => p.status === 'pending');
  const overduePayments = payments.filter((p) => p.status === 'overdue');
  const paidPayments = payments.filter((p) => p.status === 'paid');

  return (
    <div className="payments-page">
      <div className="page-header">
        <div>
          <h1>Payments</h1>
          <p className="subtitle">Track rent payments</p>
        </div>
      </div>

      {overduePayments.length > 0 && (
        <div className="payments-section">
          <h2 className="section-title critical">Overdue Payments</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Tenant</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {overduePayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{getTenantName(payment.tenantId)}</td>
                  <td className="amount-cell">${payment.amount.toLocaleString()}</td>
                  <td>{new Date(payment.dueDate).toLocaleDateString()}</td>
                  <td>
                    <span className="status-badge status-overdue">Overdue</span>
                  </td>
                  <td>
                    <button
                      className="btn-small btn-primary"
                      onClick={() => handleMarkAsPaid(payment)}
                    >
                      Mark as Paid
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pendingPayments.length > 0 && (
        <div className="payments-section">
          <h2 className="section-title">Pending Payments</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Tenant</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{getTenantName(payment.tenantId)}</td>
                  <td className="amount-cell">${payment.amount.toLocaleString()}</td>
                  <td>{new Date(payment.dueDate).toLocaleDateString()}</td>
                  <td>
                    <span className="status-badge status-pending">Pending</span>
                  </td>
                  <td>
                    <button
                      className="btn-small btn-primary"
                      onClick={() => handleMarkAsPaid(payment)}
                    >
                      Mark as Paid
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {paidPayments.length > 0 && (
        <div className="payments-section">
          <h2 className="section-title">Recent Paid Payments</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Tenant</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Paid Date</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paidPayments.slice(0, 10).map((payment) => (
                <tr key={payment.id}>
                  <td>{getTenantName(payment.tenantId)}</td>
                  <td className="amount-cell">${payment.amount.toLocaleString()}</td>
                  <td>{new Date(payment.dueDate).toLocaleDateString()}</td>
                  <td>
                    {payment.paidDate
                      ? new Date(payment.paidDate).toLocaleDateString()
                      : '-'}
                  </td>
                  <td>{payment.paymentMethod || '-'}</td>
                  <td>
                    <span className="status-badge status-paid">Paid</span>
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
