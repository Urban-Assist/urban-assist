// src/OAuthRedirectHandler.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OAuthRedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the token from the URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (token) {
      // Store the token in local storage
      localStorage.setItem('token', token);

      // Redirect to the dashboard
      navigate('/dashboard');
    } else {
      // Handle the case where there is no token in the URL
      console.error('No token found in the URL');
      navigate('/login'); // Redirect to login or another appropriate page
    }
  }, [location, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default OAuthRedirectHandler;