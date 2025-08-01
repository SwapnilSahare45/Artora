import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import Loader from "./Loader";

// If the user not authenticate then navigat to login
const ProtectedRoute = () => {
  const { isAuthenticated, profile, isLoading } = useAuthStore();
  
  useEffect(() => {
    profile();
  }, []);

  if (isLoading) return <Loader />;

  if (!isAuthenticated) return <Navigate to="/login" />;

  return <Outlet />;
};

export default ProtectedRoute;
