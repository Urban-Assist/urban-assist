import React, { useState } from 'react';
import axios from 'axios';

const RegistrationPage = () => {
    // State for form data
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        role: '',
        email: '',
        password: ''
    });

    // State for error handling
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Form validation
    const validateForm = () => {
        if (!formData.firstName.trim()) {
            setError('First name is required');
            return false;
        }
        if (!formData.lastName.trim()) {
            setError('Last name is required');
            return false;
        }
        if (!formData.role) {
            setError('Please select a role');
            return false;
        }
        if (!formData.email.trim()) {
            setError('Email is required');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }

        return true;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const AUTH_API = import.meta.env.VITE_AUTH_SERVER;
            const response = await axios.post(AUTH_API+'/auth/register', formData);
            if (response.status === 200) {
                setSuccess('Registration successful!');
                setError('');
                // Optionally, you can redirect the user to the login page or clear the form
                setFormData({
                    firstName: '',
                    lastName: '',
                    role: '',
                    email: '',
                    password: ''
                });
            }
        } catch (err) {
            const AUTH_API = import.meta.env.VITE_AUTH_SERVER;
            console.log(AUTH_API);
            setError(err.response?.data?.message || 'An error occurred during registration');
            setSuccess('');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
            <div className="bg-white p-8 rounded-3xl shadow-2xl w-110 transform transition-transform hover:scale-105 duration-500">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Create account</h1>
                    <p className="text-gray-500">Sign up to get started</p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 animate-pulse">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 animate-pulse">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition-colors ease-out duration-300"
                            placeholder="Enter your first name"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition-colors ease-out duration-300"
                            placeholder="Enter your last name"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition-colors ease-out duration-300"
                            placeholder="Enter your email"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Role
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition-colors ease-out duration-300"
                            required
                            onChange={handleChange}
                        >
                            <option value="">Select your role</option>
                            <option value="user">User</option>
                            <option value="admin">Service Provider</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition-colors ease-out duration-300"
                            placeholder="Enter your password"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium "
                    >
                        Sign Up
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-purple-600 hover:text-purple-800 transition-colors duration-300">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;