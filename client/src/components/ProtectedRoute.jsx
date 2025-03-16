import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, allowedRoles }) => {
    const role = localStorage.getItem('role'); // Get the role from localStorage (or context if you use it)

    if (!role) {
        // Redirect if no role is found (i.e., the user is not logged in)
        return <Navigate to="/login" />;
    }

    // If the role is 'admin', allow access to all pages (both user and admin)
    if (role === 'admin') {
        return element;
    }

    // If the role is not 'admin' but is included in the allowedRoles, allow access
    if (allowedRoles.includes(role)) {
        return element;
    }

    // Redirect to a "Not Authorized" page or a default route if the role is not authorized
    return <Navigate to="/" />;
};

export default ProtectedRoute;
