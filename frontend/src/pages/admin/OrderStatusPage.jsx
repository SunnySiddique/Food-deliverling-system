import { useState } from 'react';
import OrdersTable from '../../components/admin/OrdersTable/OrdersTable';
import StatusUpdateControl from '../../components/admin/StatusUpdateControl/StatusUpdateControl';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import styles from './DashboardPage.module.css';

const MOCK_ORDERS = [
  { id: 1, orderNumber: '#2847', customerName: 'Sarah Johnson', itemCount: 3, total: 36.96, status: 'Preparing', time: '12:34 PM' },
  { id: 2, orderNumber: '#2846', customerName: 'Mike Chen', itemCount: 2, total: 18.98, status: 'Paid', time: '12:15 PM' },
  { id: 3, orderNumber: '#2845', customerName: 'Emily Davis', itemCount: 4, total: 52.50, status: 'Delivered', time: '11:45 AM' },
  { id: 4, orderNumber: '#2844', customerName: 'Alex Rivera', itemCount: 1, total: 11.99, status: 'Pending', time: '11:30 AM' },
];

function OrderStatusPage() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(orders[0]);

  const handleSelectOrder = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    if (order) setSelectedOrder(order);
  };

  const handleUpdateStatus = (status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === selectedOrder.id ? { ...o, status } : o))
    );
    setSelectedOrder((prev) => ({ ...prev, status }));
  };

  const getBadgeVariant = (status) => {
    if (status === 'Pending' || status === 'Preparing') return 'warning';
    if (status === 'Delivered' || status === 'Paid') return 'success';
    return 'default';
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Orders</h1>
        <p>Manage and update order statuses</p>
      </div>

      {/* Orders table */}
      <div className={styles.sectionMb}>
        <OrdersTable orders={orders} onSelectOrder={handleSelectOrder} />
      </div>

      {/* Selected order detail + status update */}
      {selectedOrder && (
        <Card>
          <div className={styles.orderDetailHeader}>
            <div>
              <h3 className={styles.orderDetailName}>
                Order {selectedOrder.orderNumber}
              </h3>
              <p className={styles.orderDetailMeta}>
                {selectedOrder.customerName} &middot; {selectedOrder.itemCount} items
              </p>
            </div>
            <Badge variant={getBadgeVariant(selectedOrder.status)} size="md">
              {selectedOrder.status}
            </Badge>
          </div>

          <StatusUpdateControl
            currentStatus={selectedOrder.status}
            onUpdate={handleUpdateStatus}
          />

          <div className={styles.orderTotal}>
            <span>Total</span>
            <span>${selectedOrder.total.toFixed(2)}</span>
          </div>
        </Card>
      )}
    </div>
  );
}

export default OrderStatusPage;
