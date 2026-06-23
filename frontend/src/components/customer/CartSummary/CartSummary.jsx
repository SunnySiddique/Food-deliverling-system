import { MapPin, Pencil, Check } from "lucide-react";
import { useState } from "react";
import Button from "../../common/Button/Button";
import styles from "./CartSummary.module.css";

function CartSummary({
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onProceed,
  deliveryAddress,
  onAddressChange,
}) {
  const [editingAddress, setEditingAddress] = useState(!deliveryAddress);
  const [addressDraft, setAddressDraft] = useState(deliveryAddress || "");

  const subtotal = items.reduce(
    (sum, item) => sum + item.details.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleSaveAddress = () => {
    const trimmed = addressDraft.trim();
    if (!trimmed) return;
    onAddressChange(trimmed);
    setEditingAddress(false);
  };

  const handleEditAddress = () => {
    setAddressDraft(deliveryAddress || "");
    setEditingAddress(true);
  };

  if (items.length === 0)
    return (
      <div className={styles.empty}>
        <p>Your cart is empty.</p>
      </div>
    );

  return (
    <div className={styles.grid}>
      {/* ── Left: Delivery Address ── */}
      <div className={styles.addressPanel}>
        <h3 className={styles.panelTitle}>Delivery Address</h3>

        {editingAddress ? (
          <div className={styles.addressEdit}>
            <div className={styles.addressInputWrapper}>
              <MapPin size={16} className={styles.addressIcon} />
              <textarea
                className={styles.addressTextarea}
                value={addressDraft}
                onChange={(e) => setAddressDraft(e.target.value)}
                placeholder="Enter your delivery address…"
                rows={3}
              />
            </div>
            <button
              className={styles.saveAddressBtn}
              onClick={handleSaveAddress}
              disabled={!addressDraft.trim()}
            >
              <Check size={14} />
              Save Address
            </button>
          </div>
        ) : (
          <div className={styles.addressDisplay}>
            <div className={styles.addressDisplayRow}>
              <MapPin size={16} className={styles.addressIcon} />
              <span className={styles.addressText}>{deliveryAddress}</span>
            </div>
            <button
              className={styles.editAddressBtn}
              onClick={handleEditAddress}
            >
              <Pencil size={13} />
              Change
            </button>
          </div>
        )}

        <p className={styles.addressHint}>
          You can also update your address in{" "}
          <a href="/profile" className={styles.profileLink}>
            Profile
          </a>
          .
        </p>
      </div>

      {/* ── Right: Order Summary ── */}
      <div className={styles.summary}>
        <div className={styles.header}>
          <h2 className={styles.title}>Order Summary</h2>
          <div className={styles.headerRight}>
            <span className={styles.itemCount}>
              {items.length} item{items.length !== 1 ? "s" : ""}
            </span>
            <button className={styles.clearBtn} onClick={onClearCart}>
              Clear Cart
            </button>
          </div>
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

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={onProceed}
          disabled={!deliveryAddress}
        >
          {deliveryAddress ? "Proceed to Payment" : "Set delivery address first"}
        </Button>
      </div>
    </div>
  );
}

export default CartSummary;
