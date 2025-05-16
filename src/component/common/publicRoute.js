import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const { isAuthenticated } = useSelector((state) => state?.auth);

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
};
