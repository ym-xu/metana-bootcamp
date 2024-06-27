import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children, requiredRole }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role;

    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/blogs" state={{ from: location }} replace />;
    }
  } catch (error) {
    console.error('Token decoding failed:', error);
    return <Navigate to="/blogs" state={{ from: location }} replace />;
  }

  return children;
};



export default ProtectedRoute;