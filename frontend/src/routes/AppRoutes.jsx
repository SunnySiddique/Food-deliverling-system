import { Navigate, Route, Routes } from "react-router-dom";

// Layouts
import AdminLayout from "../layouts/AdminLayout";
import CustomerLayout from "../layouts/CustomerLayout";

// Customer pages
import CartPage from "../pages/customer/CartPage";
import ConfirmationPage from "../pages/customer/ConfirmationPage";
import LoginPage from "../pages/customer/LoginPage";
import MenuPage from "../pages/customer/MenuPage";
import ProfilePage from "../pages/customer/ProfilePage";
import RedirectingPage from "../pages/customer/RedirectingPage";
import RegisterPage from "../pages/customer/RegisterPage";

// Admin pages
import { useEffect } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import CustomerDetailsPage from "../pages/admin/CustomerDetailsPage";
import DashboardPage from "../pages/admin/DashboardPage";
import FoodManagementPage from "../pages/admin/FoodManagementPage";
import OrderStatusPage from "../pages/admin/OrderStatusPage";
import { useAuthStore } from "../store/useAuthStore";

function AppRoutes() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Routes>
      {/* ── Customer routes ── */}
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<Navigate to="/menu" replace />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route path="/menu" element={<MenuPage />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <RedirectingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/confirmation"
          element={
            <ProtectedRoute>
              <ConfirmationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
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
