import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import CustomerLayout from '../layouts/CustomerLayout';
import AdminLayout from '../layouts/AdminLayout';

// Customer pages
import LoginPage from '../pages/customer/LoginPage';
import RegisterPage from '../pages/customer/RegisterPage';
import MenuPage from '../pages/customer/MenuPage';
import CartPage from '../pages/customer/CartPage';
import RedirectingPage from '../pages/customer/RedirectingPage';
import ConfirmationPage from '../pages/customer/ConfirmationPage';

// Admin pages
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import DashboardPage from '../pages/admin/DashboardPage';
import CustomerDetailsPage from '../pages/admin/CustomerDetailsPage';
import FoodManagementPage from '../pages/admin/FoodManagementPage';
import OrderStatusPage from '../pages/admin/OrderStatusPage';

function AppRoutes() {
  return (
    <Routes>
      {/* ── Customer routes ── */}
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<Navigate to="/menu" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<RedirectingPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Route>

      {/* ── Admin routes ── */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/admin/customers" element={<CustomerDetailsPage />} />
        <Route path="/admin/foods" element={<FoodManagementPage />} />
        <Route path="/admin/orders" element={<OrderStatusPage />} />
      </Route>

      {/* ── Catch-all ── */}
      <Route path="*" element={<Navigate to="/menu" replace />} />
    </Routes>
  );
}

export default AppRoutes;
