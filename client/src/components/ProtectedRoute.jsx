import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import Loader from "./Loader";

const ProtectedRoute = ({ requiredRole }) => {

  const { isAuthenticated, user, profile, isLoading } = useAuthStore();

  useEffect(() => {
        if (!user) {
            profile();
        }
    }, [user, profile]);

    if (isLoading) return <Loader />;

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    const requiredRolesArray = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

    if (requiredRole && !requiredRolesArray.includes(user?.role)) {
        
        if (user?.role === "admin") {
            return <Navigate to="/admin" replace />;
        };

        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
