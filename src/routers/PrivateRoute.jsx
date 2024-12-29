import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, requiredRole }) => {
  const { auth } = useAuth();
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !auth.isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PrivateRoute;