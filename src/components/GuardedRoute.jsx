import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const GuardedRoute = ({ children, requiredRole }) => {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/" replace />; // Or to an unauthorized page
    }

    return children;
};

export default GuardedRoute;