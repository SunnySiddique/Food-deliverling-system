import Badge from '../../common/Badge/Badge';
import styles from './OrdersTable.module.css';

const statusVariantMap = {
  Pending: 'warning',
  Preparing: 'warning',
  Paid: 'success',
  Delivered: 'success',
  Cancelled: 'danger',
};

function OrdersTable({ orders, onSelectOrder }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th>Order #</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr
              key={order.id}
              className={`${styles.row} ${idx % 2 === 1 ? styles.alt : ''}`}
              onClick={() => onSelectOrder(order.id)}
            >
              <td className={styles.mono}>{order.orderNumber}</td>
              <td>{order.customerName}</td>
              <td>{order.itemCount}</td>
              <td className={styles.mono}>${order.total.toFixed(2)}</td>
              <td>
                <Badge variant={statusVariantMap[order.status] || 'default'} size="sm">
                  {order.status}
                </Badge>
              </td>
              <td className={styles.time}>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {orders.length === 0 && (
        <p className={styles.empty}>No orders to display.</p>
      )}
    </div>
  );
}

export default OrdersTable;
