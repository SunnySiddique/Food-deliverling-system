import Button from '../../common/Button/Button';
import styles from './CartSummary.module.css';

function CartSummary({ items, onUpdateQty, onRemoveItem, onProceed }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className={styles.summary}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Order Summary</h2>
        <span className={styles.itemCount}>{items.length} item{items.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Ticket items */}
      <ul className={styles.itemList}>
        {items.map((item) => (
          <li key={item.id} className={styles.itemRow}>
            <div className={styles.itemInfo}>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemPrice}>${(item.price * item.qty).toFixed(2)}</span>
            </div>
            <div className={styles.qtyControl}>
              <button
                className={styles.qtyBtn}
                onClick={() => onUpdateQty(item.id, item.qty - 1)}
                disabled={item.qty <= 1}
              >
                −
              </button>
              <span className={styles.qty}>{item.qty}</span>
              <button
                className={styles.qtyBtn}
                onClick={() => onUpdateQty(item.id, item.qty + 1)}
              >
                +
              </button>
              <button
                className={styles.removeBtn}
                onClick={() => onRemoveItem(item.id)}
                aria-label={`Remove ${item.name}`}
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>

      <hr className={styles.divider} />

      {/* Totals */}
      <div className={styles.totals}>
        <div className={styles.totalRow}>
          <span>Subtotal</span>
          <span className={styles.mono}>${subtotal.toFixed(2)}</span>
        </div>
        <div className={styles.totalRow}>
          <span>Tax (8%)</span>
          <span className={styles.mono}>${tax.toFixed(2)}</span>
        </div>
        <div className={`${styles.totalRow} ${styles.grandTotal}`}>
          <span>Total</span>
          <span className={styles.mono}>${total.toFixed(2)}</span>
        </div>
      </div>

      <Button variant="primary" size="lg" fullWidth onClick={onProceed}>
        Proceed to Payment
      </Button>
    </div>
  );
}

export default CartSummary;
