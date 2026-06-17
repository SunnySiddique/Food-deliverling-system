import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartSummary from '../../components/customer/CartSummary/CartSummary';
import styles from './CartPage.module.css';

const MOCK_CART_ITEMS = [
  { id: 1, name: 'Margherita Pizza', price: 12.99, qty: 2 },
  { id: 2, name: 'Chocolate Milkshake', price: 5.99, qty: 1 },
  { id: 3, name: 'French Fries', price: 4.99, qty: 1 },
];

function CartPage() {
  const [items, setItems] = useState(MOCK_CART_ITEMS);
  const navigate = useNavigate();

  const handleUpdateQty = (id, qty) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: Math.max(1, qty) } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Your Order</h1>
      </div>
      <CartSummary
        items={items}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onProceed={() => navigate('/payment')}
      />
    </div>
  );
}

export default CartPage;
