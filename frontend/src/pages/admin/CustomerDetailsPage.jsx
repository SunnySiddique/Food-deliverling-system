import { useState } from 'react';
import CustomerDetailsPanel from '../../components/admin/CustomerDetailsPanel/CustomerDetailsPanel';
import Badge from '../../components/common/Badge/Badge';
import Card from '../../components/common/Card/Card';
import styles from './DashboardPage.module.css';

const MOCK_CUSTOMERS = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1 (555) 234-5678', address: '123 Oak Street, NY', totalOrders: 24, memberSince: 'Jan 2024', isVIP: true },
  { id: 2, name: 'Mike Chen', email: 'mike.chen@email.com', phone: '+1 (555) 345-6789', address: '456 Pine Ave, NY', totalOrders: 12, memberSince: 'Mar 2024', isVIP: false },
  { id: 3, name: 'Emily Davis', email: 'emily.d@email.com', phone: '+1 (555) 456-7890', address: '789 Elm Road, NY', totalOrders: 8, memberSince: 'Jun 2024', isVIP: false },
  { id: 4, name: 'Alex Rivera', email: 'alex.r@email.com', phone: '+1 (555) 567-8901', address: '321 Maple Dr, NY', totalOrders: 18, memberSince: 'Feb 2024', isVIP: true },
  { id: 5, name: 'Lisa Park', email: 'lisa.p@email.com', phone: '+1 (555) 678-9012', address: '654 Birch Ln, NY', totalOrders: 6, memberSince: 'Aug 2024', isVIP: false },
];

function CustomerDetailsPage() {
  const [selectedCustomer, setSelectedCustomer] = useState(MOCK_CUSTOMERS[0]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Customers</h1>
        <p>View customer profiles and order history</p>
      </div>

      <div className={styles.grid2col}>
        {/* Customer list */}
        <Card>
          <h3 className={styles.listTitle}>All Customers</h3>
          <div className={styles.customerList}>
            {MOCK_CUSTOMERS.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCustomer(c)}
                className={`${styles.customerItem} ${selectedCustomer?.id === c.id ? styles.customerSelected : ''}`}
              >
                <div>
                  <div className={styles.customerName}>{c.name}</div>
                  <div className={styles.customerMeta}>{c.totalOrders} orders</div>
                </div>
                {c.isVIP && <Badge variant="warning" size="sm">VIP</Badge>}
              </button>
            ))}
          </div>
        </Card>

        {/* Details panel */}
        <CustomerDetailsPanel customer={selectedCustomer} />
      </div>
    </div>
  );
}

export default CustomerDetailsPage;
