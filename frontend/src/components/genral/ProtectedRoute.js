// src/components/genral/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Wait for auth check to complete
  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  // Redirect if not authenticated
  if (!user) {
      alert("You have to login first");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
