import Badge from "../../common/Badge/Badge";
import Button from "../../common/Button/Button";
import Card from "../../common/Card/Card";
import styles from "./OrderConfirmation.module.css";

function OrderConfirmation({ orderNumber, items, total, onBackToMenu }) {
  return (
    <div className={styles.confirmation}>
      {/* Teal checkmark stamp */}
      <div className={styles.stamp}>
        <div className={styles.checkmark}>✓</div>
      </div>

      <h1 className={styles.heading}>Order Confirmed!</h1>
      <p className={styles.subtext}>
        Your order has been placed and is being prepared.
      </p>

      <Badge variant="success" size="lg">
        Order {orderNumber}
      </Badge>

      {/* Summary ticket recap */}
      <Card className={styles.summaryCard}>
        <div className={styles.summaryHeader}>
          <h3 className={styles.summaryTitle}>Order Recap</h3>
          <span className={styles.orderNum}>{orderNumber}</span>
        </div>

        <hr className={styles.divider} />

        <ul className={styles.itemList}>
          {items.map((item, i) => (
            <li key={i} className={styles.itemRow}>
              <span className={styles.itemQty}>×{item.qty}</span>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemPrice}>
                ${(item.price * item.qty).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>

        <hr className={styles.divider} />

        <div className={styles.totalRow}>
          <span>Total</span>
          <span className={styles.totalAmount}>${total?.toFixed(2)}</span>
        </div>
      </Card>

      <Button variant="primary" size="lg" onClick={onBackToMenu}>
        Back to Menu
      </Button>
    </div>
  );
}

export default OrderConfirmation;
