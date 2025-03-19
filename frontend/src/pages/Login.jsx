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
  const googleAuthUrl = `${import.meta.env.VITE_AUTH_SERVER}/auth-api/oauth2/authorize/google`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const AUTH_API = import.meta.env.VITE_AUTH_SERVER;
      const response = await axios.post(AUTH_API + '/auth-api/public/authenticate', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center h-screen justify-center bg-gradient-to-br from-purple-100 to-yellow-100">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-96 max-w-md transition-all duration-500 ease-in-out">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Google OAuth Button */}
        <div className="mb-6">
          <a
            href={googleAuthUrl}
            className="w-full flex items-center justify-center py-2.5 bg-white border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm"
          >
            <img
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/16px.svg"
              alt="Google Logo"
              className="w-5 h-5 mr-2"
            />
            Sign in with Google
          </a>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
              placeholder="you@example.com"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
              placeholder="••••••••"
              required
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <a
              href="/forgot-password"
              className="text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 mt-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:opacity-95 transition-opacity font-medium"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <a href="/register" className="text-purple-600 hover:text-purple-800 font-medium transition-colors">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;