import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const token = sessionStorage.getItem("token");
  const perfil = sessionStorage.getItem("perfil");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && perfil && !allowedRoles.includes(perfil)) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};
