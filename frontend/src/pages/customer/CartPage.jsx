import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrderApi } from "../../api/orderApi";
import Loader from "../../components/common/Loader/Loader";
import CartSummary from "../../components/customer/CartSummary/CartSummary";
import { useAuthStore } from "../../store/useAuthStore";
import useCartStore from "../../store/useCartStore";
import { showToast } from "../../utils/toast";
import styles from "./CartPage.module.css";

function CartPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    items,
    isLoading,
    fetchCart,
    increment,
    decrement,
    removeItem,
    clearCart,
    resetCart,
  } = useCartStore();
  const [processing, setProcessing] = useState(false);

  // Delivery address state — initialise from user profile
  const [deliveryAddress, setDeliveryAddress] = useState("");

  useEffect(() => {
    if (user?.address) {
      setDeliveryAddress(user.address);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, []);

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
    } catch {
      showToast.error("Error", "Could not remove item.");
    }
  };

  const handleProceed = async () => {
    if (!deliveryAddress?.trim()) {
      showToast.error("Address required", "Please enter a delivery address.");
      return;
    }

    setProcessing(true);
    try {
      const res = await createOrderApi(deliveryAddress);
      if (!res.success) {
        showToast.error("Error", res.message || "Could not create order.");
        setProcessing(false);
        return;
      }

      const { payment, order } = res.data;

      if (!window.payhere) {
        showToast.error("Error", "PayHere SDK not loaded.");
        setProcessing(false);
        return;
      }

      window.payhere.onCompleted = function () {
        console.log("✅ Payment completed");
        resetCart();
        navigate(`/confirmation/${order.orderId}`, { replace: true });
      };

      window.payhere.onDismissed = function () {
        console.log("Payment dismissed");
        setProcessing(false);
      };

      window.payhere.onError = function (error) {
        console.log("Error:", error);
        showToast.error("Payment Error", String(error));
        setProcessing(false);
      };

      window.payhere.startPayment(payment);
    } catch (err) {
      showToast.error(
        "Error",
        err?.response?.data?.message || "Could not create order.",
      );
      setProcessing(false);
    }
  };

  if (isLoading) return <Loader message="Loading your cart..." />;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Your Order</h1>
      </div>
      {processing && <Loader message="Processing your order..." />}
      {!processing && (
        <CartSummary
          items={items}
          onUpdateQty={handleUpdateQty}
          onRemoveItem={handleRemoveItem}
          onClearCart={clearCart}
          onProceed={handleProceed}
          deliveryAddress={deliveryAddress}
          onAddressChange={setDeliveryAddress}
        />
      )}
    </div>
  );
}

export default CartPage;
