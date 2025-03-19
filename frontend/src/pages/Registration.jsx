import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const navigate = useNavigate();
    // Hardcoded Google OAuth2 URL
    const googleAuthUrl = `${import.meta.env.VITE_AUTH_SERVER}/auth-api/oauth2/authorize/google`;
    
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
    
    // Track current form step
    const [step, setStep] = useState(1);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Form validation
    const validateStep = (currentStep) => {
        if (currentStep === 1) {
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
        } else if (currentStep === 2) {
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
        }
        return true;
    };

    // Handle next step - key fix here
    const handleNextStep = (e) => {
        e.preventDefault(); // Prevent form submission
        if (validateStep(step)) {
            setError('');
            setStep(prevStep => prevStep + 1);
        }
    };

    // Handle previous step
    const handlePrevStep = () => {
        setStep(prevStep => prevStep - 1);
        setError('');
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep(step)) {
            return;
        }

        try {
            const AUTH_API = import.meta.env.VITE_AUTH_SERVER;
            const response = await axios.post(AUTH_API + '/auth-api/public/register', formData);
            
            if (response.status === 200) {
                setSuccess('Registration successful!');
                setError('');
                setTimeout(() => navigate('/login'), 1500);
            }
        } catch (err) {
            setError(err.response?.data || 'An error occurred during registration');
            setSuccess('');
        }
    };

    return (
        <div className="flex items-center h-screen justify-center bg-gradient-to-br from-cyan-100 via-pink-100 to-blue-100">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-96 max-w-md transition-all duration-500 ease-in-out">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Join Us</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {step === 1 ? 'Start with your account details' : 'Tell us about yourself'}
                    </p>
                </div>

                {/* Progress Indicator */}
                <div className="flex justify-center mb-8">
                    <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>1</div>
                        <div className={`w-12 h-1 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>2</div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 rounded mb-4 text-sm">
                        {success}
                    </div>
                )}

                {step === 1 ? (
                    // First step form - Note: separate form for step 1
                    <form onSubmit={handleNextStep} className="space-y-4">
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
                                Sign up with Google
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

                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                placeholder="you@example.com"
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
                                value={formData.password}
                                className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                placeholder="••••••••"
                                onChange={handleChange}
                            />
                            <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2.5 mt-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:opacity-95 transition-opacity font-medium"
                        >
                            Continue
                        </button>
                    </form>
                ) : (
                    // Second step form
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                    placeholder="John"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                    placeholder="Doe"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">
                                I am a
                            </label>
                            <div className="grid grid-cols-2 gap-3 mt-1">
                                <div
                                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                                        formData.role === 'user' 
                                            ? 'border-purple-500 bg-purple-50' 
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                    onClick={() => setFormData({...formData, role: 'user'})}
                                >
                                    <div className="font-medium">User</div>
                                    <div className="text-xs text-gray-500">Looking for services</div>
                                </div>
                                <div
                                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                                        formData.role === 'provider' 
                                            ? 'border-purple-500 bg-purple-50' 
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                    onClick={() => setFormData({...formData, role: 'provider'})}
                                >
                                    <div className="font-medium">Provider</div>
                                    <div className="text-xs text-gray-500">Offering services</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={handlePrevStep}
                                className="w-1/3 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="w-2/3 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:opacity-95 transition-opacity font-medium"
                            >
                                Complete Sign Up
                            </button>
                        </div>
                    </form>
                )}

                <div className="text-center mt-6">
                    <p className="text-gray-600 text-sm">
                        Already have an account?{' '}
                        <a href="/login" className="text-purple-600 hover:text-purple-800 font-medium transition-colors">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;