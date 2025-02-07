import React, { useState } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";
const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }
    try {
    const AUTH_URL = process.env.REACT_APP_AUTH_URL;
    console.log(AUTH_URL);
    const response = await axios.post(AUTH_URL + "/auth/register", formData, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.status === 200) {
        alert("Registration successful");
        redirect("/login");
    }
} catch (error) {
    if (error.response) {
        // Handle specific status codes
        if (error.response.status === 409) {
            setError(error.response.data  );
            console.log(error.response.data);
        } else {
            setError(error.response.data || "Registration failed");
        }
    } else if (error.request) {
        // Network error
        setError("Network error. Please try again later.");
    } else {
        // Other errors
        setError("An error occurred. Please try again.");
    }
}
    };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}


export default Register;