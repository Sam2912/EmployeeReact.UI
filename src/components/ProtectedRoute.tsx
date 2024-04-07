// ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth, UserRole } from "../context/AuthContext";
import Forbidden from "./Forbidden"; // Import the Forbidden component

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  element,
}) => {
  const { isAuthenticated, userRole } = useAuth();

  if (isAuthenticated && allowedRoles) {
    if (!userRole) {
      return <Forbidden />; // Render the Forbidden component when userRole is null
    }

    const hasAllowedRole = allowedRoles.some(role => userRole.includes(role));
    if (!hasAllowedRole) {
      return <Forbidden />; // Render the Forbidden component when role is not allowed
    }
  }

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
