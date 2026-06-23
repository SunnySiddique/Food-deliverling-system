import Button from "../../common/Button/Button";
import styles from "./CartSummary.module.css";

function CartSummary({ items, onUpdateQty, onRemoveItem, onProceed }) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.details.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (items.length === 0)
    return (
      <div className={styles.empty}>
        <p>Your cart is empty.</p>
      </div>
    );

  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        <h2 className={styles.title}>Order Summary</h2>
        <span className={styles.itemCount}>
          {items.length} item{items.length !== 1 ? "s" : ""}
        </span>
      </div>

      <ul className={styles.itemList}>
        {items.map((item) => (
          <li key={item.itemId} className={styles.itemRow}>
            <div className={styles.itemInfo}>
              <span className={styles.itemName}>{item.details.name}</span>
              <span className={styles.itemPrice}>
                ${(item.details.price * item.quantity).toFixed(2)}
              </span>
            </div>
            <div className={styles.qtyControl}>
              <button
                className={styles.qtyBtn}
                onClick={() =>
                  onUpdateQty(item.itemId, item.quantity - 1, item.quantity)
                }
              >
                −
              </button>
              <span className={styles.qty}>{item.quantity}</span>
              <button
                className={styles.qtyBtn}
                onClick={() =>
                  onUpdateQty(item.itemId, item.quantity + 1, item.quantity)
                }
              >
                +
              </button>
              <button
                className={styles.removeBtn}
                onClick={() => onRemoveItem(item.itemId)}
                aria-label={`Remove ${item.details.name}`}
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>

      <hr className={styles.divider} />

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
