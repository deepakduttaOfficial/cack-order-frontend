import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticate } from "./auth";

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticate()) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
