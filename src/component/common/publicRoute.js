import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PublicRoute = () => {
  const { isAuthenticated } = useSelector((state) => state?.auth);

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
