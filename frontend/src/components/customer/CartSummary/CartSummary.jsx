import Button from "../../common/Button/Button";
import styles from "./CartSummary.module.css";

function CartSummary({ items, onUpdateQty, onRemoveItem, onProceed }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlePayment = async () => {
    try {
      // Generate a unique order ID for this test
      const orderId = `ORDER${Date.now()}`;

      // Step 1: Call backend to get a real PayHere hash
      const res = await fetch("/api/v1/payment/generate-hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: orderId,
          items: items.map((i) => i.name).join(", "),
          amount: total.toFixed(2),
          currency: "LKR",
          first_name: "John",
          last_name: "Doe",
          email: "john@example.com",
          phone: "0771234567",
          address: "No. 1, Main Street",
          city: "Colombo",
        }),
      });

      const json = await res.json();

      if (!json.success) {
        throw new Error(json.message);
      }

      const payment = json.data.payment;

      // Step 2: Set up PayHere callbacks
      window.payhere.onCompleted = (orderId) => {
        console.log("Payment Completed ✅ Order ID:", orderId);
      };

      window.payhere.onDismissed = () => {
        console.log("Payment Dismissed ❌");
      };

      window.payhere.onError = (error) => {
        console.error("Payment Error ⚠️", error);
      };

      // Step 3: Start PayHere checkout with the real hash
      window.payhere.startPayment(payment);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to start payment: " + error.message);
    }
  };

  return (
    <div className={styles.summary}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Order Summary</h2>
        <span className={styles.itemCount}>
          {items.length} item{items.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Ticket items */}
      <ul className={styles.itemList}>
        {items.map((item) => (
          <li key={item.id} className={styles.itemRow}>
            <div className={styles.itemInfo}>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemPrice}>
                ${(item.price * item.qty).toFixed(2)}
              </span>
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

      <Button variant="primary" size="lg" fullWidth onClick={handlePayment}>
        Proceed to Payment
      </Button>
    </div>
  );
}

export default CartSummary;
