import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const urlParams = new URLSearchParams(location.search);
  const tokenFromUrl = urlParams.get('token');

  // Allow access if either there's a token in localStorage or in the URL
  if (token || tokenFromUrl) {
    return children;
  }

  // Redirect to login if no token is found
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;