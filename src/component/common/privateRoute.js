import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  // const isAuthenticated = useSelector((state) => state?.auth.isAuthenticated);

  const { isAuthenticated } = useSelector((state) => state?.auth);

  console.log("hkjkjkj", isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
