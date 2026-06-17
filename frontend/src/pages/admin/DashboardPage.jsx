import { useNavigate } from 'react-router-dom';
import OrdersTable from '../../components/admin/OrdersTable/OrdersTable';
import styles from './DashboardPage.module.css';

const MOCK_STATS = [
  { label: 'Total Orders', value: 48 },
  { label: 'Revenue Today', value: '$1,284' },
  { label: 'Active Orders', value: 12 },
  { label: 'Customers', value: 36 },
];

const MOCK_ORDERS = [
  { id: 1, orderNumber: '#2847', customerName: 'Sarah Johnson', itemCount: 3, total: 36.96, status: 'Preparing', time: '12:34 PM' },
  { id: 2, orderNumber: '#2846', customerName: 'Mike Chen', itemCount: 2, total: 18.98, status: 'Paid', time: '12:15 PM' },
  { id: 3, orderNumber: '#2845', customerName: 'Emily Davis', itemCount: 4, total: 52.50, status: 'Delivered', time: '11:45 AM' },
  { id: 4, orderNumber: '#2844', customerName: 'Alex Rivera', itemCount: 1, total: 11.99, status: 'Pending', time: '11:30 AM' },
  { id: 5, orderNumber: '#2843', customerName: 'Lisa Park', itemCount: 2, total: 21.98, status: 'Delivered', time: '11:00 AM' },
];

function DashboardPage() {
  const navigate = useNavigate();

  const handleSelectOrder = (orderId) => {
    navigate(`/admin/orders`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
        <p>Overview of today&apos;s operations</p>
      </div>

      {/* Stats cards */}
      <div className={styles.stats}>
        {MOCK_STATS.map((stat, idx) => (
          <div key={idx} className={styles.statCard}>
            <div className={styles.statLabel}>{stat.label}</div>
            <div className={styles.statValue}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Recent orders table */}
      <div>
        <h2 className={styles.sectionTitle}>Recent Orders</h2>
        <OrdersTable orders={MOCK_ORDERS} onSelectOrder={handleSelectOrder} />
      </div>
    </div>
  );
}

export default DashboardPage;
