import Badge from '../../common/Badge/Badge';
import styles from './StatusUpdateControl.module.css';

const STATUSES = ['Pending', 'Preparing', 'Paid', 'Delivered', 'Cancelled'];

const statusVariantMap = {
  Pending: 'warning',
  Preparing: 'warning',
  Paid: 'success',
  Delivered: 'success',
  Cancelled: 'danger',
};

function StatusUpdateControl({ currentStatus, onUpdate }) {
  return (
    <div className={styles.control}>
      <label className={styles.label}>Update Status</label>

      <div className={styles.segmented}>
        {STATUSES.map((status) => (
          <button
            key={status}
            className={`${styles.option} ${currentStatus === status ? styles.active : ''}`}
            onClick={() => onUpdate(status)}
          >
            <Badge
              variant={currentStatus === status ? statusVariantMap[status] : 'default'}
              size="sm"
            >
              {status}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
}

export default StatusUpdateControl;
