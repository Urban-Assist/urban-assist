import React from 'react'
import { AuthProvider } from './context/AuthContext.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login.js';
import HomePage from './pages/HomePage.js';
import Register from './pages/Register.js';
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login" element={<ProtectedRoute><Login/></ProtectedRoute>} />
        </Routes>
    </AuthProvider>
  )
}

export default App