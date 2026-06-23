import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/Loader/Loader";
import CartSummary from "../../components/customer/CartSummary/CartSummary";
import useCartStore from "../../store/useCartStore";
import { showToast } from "../../utils/toast";
import styles from "./CartPage.module.css";

function CartPage() {
  const navigate = useNavigate();
  const { items, isLoading, fetchCart, increment, decrement, removeItem } =
    useCartStore();

  useEffect(() => {
    fetchCart();
  }, []);
  console.log("items:", items);

  const handleUpdateQty = async (itemId, newQty, currentQty) => {
    try {
      if (newQty > currentQty) await increment(itemId);
      else await decrement(itemId);
    } catch {
      showToast.error("Error", "Could not update quantity.");
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeItem(itemId);
      showToast.success("Removed", "Item removed from cart.");
    } catch {
      showToast.error("Error", "Could not remove item.");
    }
  };

  if (isLoading) return <Loader message="Loading your cart..." />;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Your Order</h1>
      </div>
      <CartSummary
        items={items}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onProceed={() => navigate("/payment")}
      />
    </div>
  );
}

export default CartPage;
