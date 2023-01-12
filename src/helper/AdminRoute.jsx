import React from "react";
import { Navigate } from "react-router-dom";
import { getLocalUser, isAuthenticate } from "./auth";

const AdminRoute = ({ children }) => {
  if (!isAuthenticate()) {
    return <Navigate to="/" replace />;
  }
  if (!getLocalUser()) {
    return <Navigate to="/" replace />;
  }
  if (getLocalUser().role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
