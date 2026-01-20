import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../utils/auth';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const authenticated = isAuthenticated();
    const userRole = getUserRole();

    if (!authenticated) {
        // Not logged in, redirect to login
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // User doesn't have the right role, redirect to appropriate dashboard
        if (userRole === 'ROLE_PROVIDER' || userRole === 'provider' || userRole === 'admin') {
            return <Navigate to="/dashboard2" replace />;
        } else {
            return <Navigate to="/dashboard" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
