import { Clock, MapPin } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserOrdersApi } from "../../api/orderApi";
import Badge from "../../components/common/Badge/Badge";
import Loader from "../../components/common/Loader/Loader";
import styles from "./OrdersPage.module.css";

const statusVariantMap = {
  Pending: "warning",
  Preparing: "warning",
  Paid: "success",
  Delivered: "success",
  Cancelled: "danger",
};

/** Capitalise first letter for display ("paid" → "Paid") */
const displayStatus = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async () => {
    try {
      const res = await getUserOrdersApi();
      if (res.success) {
        setOrders(res.data.orders);
      } else {
        setError("Failed to load orders.");
      }
    } catch {
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading) return <Loader message="Loading your orders…" />;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>My Orders</h1>
        <p className={styles.subtitle}>
          {orders.length > 0
            ? `${orders.length} order${orders.length > 1 ? "s" : ""} placed`
            : "No orders yet"}
        </p>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {orders.length === 0 && !error && (
        <div className={styles.empty}>
          <p>You haven&apos;t placed any orders yet.</p>
          <button
            className={styles.browseBtn}
            onClick={() => navigate("/menu")}
          >
            Browse Menu
          </button>
        </div>
      )}

      <div className={styles.list}>
        {orders.map((order) => {
          const status = displayStatus(order.orderStatus);
          const variant = statusVariantMap[status] || "default";
          const itemCount = order.orderItems.reduce(
            (sum, i) => sum + i.quantity,
            0,
          );

          return (
            <div
              key={order.orderId}
              className={styles.card}
              onClick={() => navigate(`/confirmation/${order.orderId}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate(`/confirmation/${order.orderId}`);
              }}
            >
              <div className={styles.cardTop}>
                <div className={styles.cardLeft}>
                  <span className={styles.orderNumber}>
                    {order.displayOrderId || order.orderId}
                  </span>
                  <Badge variant={variant} size="sm">
                    {status}
                  </Badge>
                </div>
                <span className={styles.total}>
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>

              {/* Items summary */}
              <ul className={styles.items}>
                {order.orderItems.map((item, idx) => (
                  <li key={idx} className={styles.itemRow}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemMeta}>
                      ×{item.quantity}
                      <span className={styles.itemSep}>·</span>$
                      {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
                {itemCount > 3 && (
                  <li className={styles.moreItems}>
                    +{itemCount - 3} more item
                    {itemCount - 3 !== 1 ? "s" : ""}
                  </li>
                )}
              </ul>

              {/* Footer: delivery address + time */}
              <div className={styles.cardFooter}>
                <span className={styles.footerItem}>
                  <MapPin size={12} />
                  {order.deliveryAddress}
                </span>
                <span className={styles.footerItem}>
                  <Clock size={12} />
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrdersPage;
