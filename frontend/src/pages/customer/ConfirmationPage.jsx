import { useNavigate } from 'react-router-dom';
import OrderConfirmation from '../../components/customer/OrderConfirmation/OrderConfirmation';

const MOCK_ORDER = {
  orderNumber: 'ORD-2847',
  items: [
    { name: 'Margherita Pizza', qty: 2, price: 12.99 },
    { name: 'Chocolate Milkshake', qty: 1, price: 5.99 },
    { name: 'French Fries', qty: 1, price: 4.99 },
  ],
  total: 36.96,
};

function ConfirmationPage() {
  const navigate = useNavigate();

  return (
    <OrderConfirmation
      orderNumber={MOCK_ORDER.orderNumber}
      items={MOCK_ORDER.items}
      total={MOCK_ORDER.total}
      onBackToMenu={() => navigate('/menu')}
    />
  );
}

export default ConfirmationPage;
