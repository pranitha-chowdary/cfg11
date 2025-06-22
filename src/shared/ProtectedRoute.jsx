import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // You can return a loader instead

  if (!user) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Logged in but wrong role
    return <Navigate to="/" replace />;
  }

  return children; // Authorized
};

export default ProtectedRoute;
