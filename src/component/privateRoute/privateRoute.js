import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  // const isAuthenticated = useSelector((state) => state?.auth.isAuthenticated);
  const { isAuthenticated } = useSelector((state) => state?.auth);
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};
