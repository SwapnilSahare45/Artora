import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import Loader from "./Loader";

const PublicRoute = () => {
    const { isAuthenticated, user, profile, isLoading } = useAuthStore();

    useEffect(() => {
        if (!user) profile();
    }, [user, profile]);

    if (isLoading) return <Loader />;

    if (isAuthenticated) {
        if (user?.role === "admin") return <Navigate to="/admin" replace />;
        return <Navigate to="/" replace />;
    };

    return <Outlet />;
};

export default PublicRoute;
