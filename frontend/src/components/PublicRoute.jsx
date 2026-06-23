import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Loader from "./common/Loader/Loader";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) return <Loader />;
  if (isAuthenticated) return <Navigate to="/menu" replace />;

  return children;
};

export default PublicRoute;
