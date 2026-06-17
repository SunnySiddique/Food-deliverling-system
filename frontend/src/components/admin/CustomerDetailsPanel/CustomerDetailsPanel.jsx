import Badge from '../../common/Badge/Badge';
import styles from './CustomerDetailsPanel.module.css';

function CustomerDetailsPanel({ customer }) {
  if (!customer) {
    return (
      <div className={styles.empty}>
        <p>Select a customer to view details.</p>
      </div>
    );
  }

  const initials = customer.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={styles.panel}>
      {/* Avatar with initials */}
      <div className={styles.avatarSection}>
        <div className={styles.avatar}>{initials}</div>
        <div>
          <h3 className={styles.name}>{customer.name}</h3>
          {customer.isVIP && <Badge variant="warning" size="sm">VIP</Badge>}
        </div>
      </div>

      <hr className={styles.divider} />

      {/* Detail rows */}
      <dl className={styles.details}>
        <div className={styles.detailRow}>
          <dt>Email</dt>
          <dd>{customer.email}</dd>
        </div>
        <div className={styles.detailRow}>
          <dt>Phone</dt>
          <dd>{customer.phone}</dd>
        </div>
        <div className={styles.detailRow}>
          <dt>Address</dt>
          <dd>{customer.address}</dd>
        </div>
        <div className={styles.detailRow}>
          <dt>Total Orders</dt>
          <dd className={styles.mono}>{customer.totalOrders}</dd>
        </div>
        <div className={styles.detailRow}>
          <dt>Member Since</dt>
          <dd>{customer.memberSince}</dd>
        </div>
      </dl>
    </div>
  );
}

export default CustomerDetailsPanel;
