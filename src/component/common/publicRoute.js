import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const dadadd = useSelector((state) => state?.auth);

  console.log(dadadd, "hhkhhk");

  const { isAuthenticated } = useSelector((state) => state?.auth);

  return isAuthenticated ? <Navigate to="/event" /> : <Outlet />;
};
