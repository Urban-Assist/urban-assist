import React, { useState } from "react";
 import bg from '../assets/terms-cond-bg.png';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TermsAndConditions = () => {
  const [isChecked, setIsChecked] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const name = params.get('service');

  const handleAgree = () => {
    if (isChecked) {
      localStorage.setItem("hasAgreedToTerms", "true"); // Store agreement in localStorage
      onAgree();
    } else {
      alert("Please agree to the terms and conditions to proceed.");
    }
  };

  const onAgree = async () => {
    console.log(token);
    const API_URL = "http://localhost:8083/api/provider?service=" + name;
    try {
      const response = await axios.post(
        API_URL,
        {}, // Request body (empty object if no body is needed)
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const status = response.status; // axios automatically parses JSON
      console.log(status);

      if (status === 201) {
        navigate("/provider/profile?service=" + name);
      }
    } catch (error) {
      console.error("Error:", error);
    }

  }

  return (


    <div >
      <div class="w-screen h-screen overflow-hidden ">
        <img src={bg} className="blur-sm object-fit " />
      </div>
      <div className="flex absolute inset-0 items-center justify-center bg-black/50 mt-15">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Terms and Conditions for Urban Assist
          </h1>
          <div className="overflow-y-auto h-96 mb-6 p-4 border border-gray-200 rounded-lg">
            <p className="mb-4">
              Welcome to Urban Assist! Before you proceed to create your profile and offer your
              services, please read and agree to the following terms and conditions.
            </p>
            <p className="mb-4">
              <strong>1. Acceptance of Terms:</strong> By using this platform, you agree to comply
              with and be bound by these terms and conditions.
            </p>
            <p className="mb-4">
              <strong>2. Eligibility:</strong> You must be at least 18 years old to create a profile
              and offer services on this platform.
            </p>
            <p className="mb-4">
              <strong>3. Service Provider Responsibilities:</strong> You are solely responsible for
              the quality and delivery of the services you offer.
            </p>
            <p className="mb-4">
              <strong>4. Fees and Payments:</strong> Urban Assist may charge a commission or fee for
              services provided through the platform.
            </p>
            <p className="mb-4">
              <strong>5. Intellectual Property:</strong> You retain ownership of any intellectual
              property you create or provide as part of your services.
            </p>
            <p className="mb-4">
              <strong>6. Privacy and Data Use:</strong> Your personal information will be handled in
              accordance with our Privacy Policy.
            </p>
            <p className="mb-4">
              <strong>7. Termination:</strong> Urban Assist reserves the right to suspend or
              terminate your profile at any time if you violate these terms.
            </p>
            <p className="mb-4">
              <strong>8. Limitation of Liability:</strong> Urban Assist is not liable for any damages
              or losses resulting from your use of the platform.
            </p>
            <p className="mb-4">
              <strong>9. Changes to Terms:</strong> Urban Assist reserves the right to update or
              modify these terms and conditions at any time.
            </p>
            <p className="mb-4">
              <strong>10. Governing Law:</strong> These terms are governed by the laws of Canada.
            </p>
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="agree"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="agree" className="text-sm">
              I have read and agree to the terms and conditions.
            </label>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleAgree}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Agree and Continue
            </button>
          </div>
        </div>
      </div>
    </div>



  );
};

export default TermsAndConditions;