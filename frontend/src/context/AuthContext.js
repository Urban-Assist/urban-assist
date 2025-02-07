

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
    // Assume a function `checkAuth` that checks if the user is logged in
    // const token = localStorage.getItem('token'); // Example for auth check
    const token = true; // Example for auth check
    if(token){
        setIsAuthenticated(true);
    }

}, []);

return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
    {children}
    </AuthContext.Provider>
);
};

export const useAuth = () => useContext(AuthContext);