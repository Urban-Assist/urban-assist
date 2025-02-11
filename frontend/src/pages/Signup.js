import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiRefreshCcw } from 'react-icons/fi';
import axios from 'axios';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !acceptTerms) {
      setError('Please fill in all fields and accept the terms.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage('');

    const payload = { name, email, password };

    try {
      const response = await axios.post('http://172.17.0.99:8080/api/v1/all/register', payload);
      setSuccessMessage('Registration successful! Please check your email for verification.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const LoadingScreen = () => (
    <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <FiRefreshCcw className="text-blue-300 text-4xl" />
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      {isLoading && <LoadingScreen />}
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-12 rounded-2xl shadow-2xl flex w-full max-w-5xl mx-4 relative overflow-hidden"
      >
        <motion.div 
          className="w-1/2 pr-12 relative z-10"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-10"
          >
            <h1 className="font-display text-4xl font-bold text-gray-900 mb-3">
              Create an Account
            </h1>
            <p className="text-gray-600 text-lg">
              Join HandyShare to explore unique rental opportunities!
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative group">
                <FiUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full h-12 pl-12 pr-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative group">
                <FiMail className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-12 pl-12 pr-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Create Password
              </label>
              <div className="relative group">
                <FiLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 pl-12 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
              </label>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-500 text-sm p-4 rounded-lg"
                role="alert"
              >
                {error}
              </motion.div>
            )}

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 text-green-500 text-sm p-4 rounded-lg"
                role="alert"
              >
                {successMessage}
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="w-full h-12 bg-blue-400 text-white rounded-xl hover:bg-blue-500 transition-all duration-200 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Sign Up
            </motion.button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  Log in here
                </Link>
              </motion.span>
            </p>
          </div>
        </motion.div>

        <div className="w-1/2 pl-12 border-l border-gray-100 relative flex items-center justify-center">
          <motion.img 
            src="/Assets/Logo.png" 
            alt="HandyShare Logo" 
            className="w-64 h-auto"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M0 100 C 20 0, 50 0, 100 100 Z"
              fill="url(#gradient)"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="gradient" gradientTransform="rotate(90)">
                <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>
    </div>
  );
}