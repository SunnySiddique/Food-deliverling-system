import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderApi } from "../../api/orderApi";
import Loader from "../../components/common/Loader/Loader";
import OrderConfirmation from "../../components/customer/OrderConfirmation/OrderConfirmation";

function ConfirmationPage() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      navigate("/menu", { replace: true });
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await getOrderApi(orderId);
        if (res.success) {
          setOrder(res.data.order);
        } else {
          navigate("/menu", { replace: true });
        }
      } catch {
        navigate("/menu", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <Loader message="Loading your order..." />;
  if (!order) return null;

  const items = (order.orderItems || []).map((item) => ({
    name: item.name,
    qty: item.quantity,
    price: item.price,
  }));

  return (
    <OrderConfirmation
      orderNumber={order.displayOrderId || order.orderId}
      items={items}
      total={order.totalAmount}
      onBackToMenu={() => navigate("/menu")}
    />
  );
}

export default ConfirmationPage;
