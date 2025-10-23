// src/components/ProtectedRoute/ProtectedRoute.js
import React, { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { auth } = useContext(AuthContext);
  const token = auth?.token || localStorage.getItem("token");
  const location = useLocation();

  // ✅ Check for token
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  // ✅ Extra check: if user goes directly to /results without state → redirect
  if (location.pathname === "/results" && !location.state) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
