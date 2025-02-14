import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const AUTH_URL = process.env.REACT_APP_AUTH_URL;
      const response = await axios.post(AUTH_URL + '/auth/authenticate', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data);
        navigate('/homepage');
      }
    } catch (error) {
      setError(error.response?.data || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-96 transform transition-transform hover:scale-105 duration-500">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Welcome Back!</h1>
          <p className="text-gray-500">Sign in to access your account</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition-colors ease-out duration-300"
              placeholder="Enter your email"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition-colors ease-out duration-300"
              placeholder="Enter your password"
              required
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <a
              href="/forgot-password"
              className="text-sm text-purple-600 hover:text-purple-800 transition-colors duration-300"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium "
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-purple-600 hover:text-purple-800 transition-colors duration-300">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;