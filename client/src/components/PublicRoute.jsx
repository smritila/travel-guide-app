import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../hooks/AuthProvider";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  const from = location.state?.from?.pathname || "/manage-bookings"; // Default to /manage-bookings

  return isAuthenticated ? <Navigate to={from} replace /> : children;
};

export default PublicRoute;
