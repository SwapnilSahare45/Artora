import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import Loader from "./Loader";

// If user is autheniticate then user navigat to artworks
const PublicRoute = () => {
    const { isAuthenticated, profile, isLoading } = useAuthStore();

    useEffect(() => {
        profile();
    }, [profile]);

    if (isLoading) return <Loader/>;

    if (isAuthenticated) return <Navigate to="/artworks" />;

    return <Outlet />;
};

export default PublicRoute;
