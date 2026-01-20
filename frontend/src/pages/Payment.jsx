import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getUserEmail } from "../utils/auth";

const USER_MGMT_URL = import.meta.env.VITE_USER_MANAGEMENT_URL || 'http://localhost:8083';
const EMAIL_SERVICE_URL = import.meta.env.VITE_EMAIL_SERVICE_URL || 'http://localhost:9001';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const selectedSlot = location.state?.selectedSlot;
    const providerEmail = location.state?.providerEmail || "provider@example.com";
    const providerName = location.state?.providerName || "Service Provider";
    const serviceType = location.state?.serviceType || "General Service";

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    if (!selectedSlot) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl font-bold">No booking information available.</p>
            </div>
        );
    }

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            setMessage("Stripe has not loaded yet.");
            setLoading(false);
            return;
        }

        try {
            // Step 1: Create the booking first
            const userEmail = getUserEmail();
            const token = localStorage.getItem('token');

            const bookingData = {
                userEmail: userEmail,
                providerEmail: providerEmail,
                serviceType: serviceType,
                bookingDate: selectedSlot.date,
                startTime: selectedSlot.startTime,
                endTime: selectedSlot.endTime,
                status: "PENDING", // Will be updated to CONFIRMED after payment
                providerName: providerName,
                userName: userEmail.split('@')[0]
            };

            console.log('Creating booking with data:', bookingData);

            const bookingResponse = await axios.post(`${USER_MGMT_URL}/api/bookings`, bookingData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const bookingId = bookingResponse.data.id || bookingResponse.data.bookingId;
            console.log('Booking created with ID:', bookingId);

            // Step 2: Create payment method with Stripe
            const cardNumberElement = elements.getElement(CardNumberElement);
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: "card",
                card: cardNumberElement,
            });

            if (error) {
                setMessage(error.message);
                setLoading(false);
                return;
            }

            // Step 3: Process payment with bookingId
            const response = await fetch("http://localhost:5002/api/payments/card-pay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: 50, // Assuming a fixed price for the booking
                    currency: "usd",
                    paymentMethodId: paymentMethod.id,
                    bookingId: bookingId
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Update booking status to CONFIRMED
                await axios.put(`${USER_MGMT_URL}/api/bookings/${bookingId}`,
                    { status: "CONFIRMED" },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                console.log('Booking confirmed after successful payment');

                setMessage("Payment successful!");
                setPaymentSuccess(true);
            } else {
                setMessage(`Payment failed: ${data.error}`);
                // Optionally delete or mark the booking as failed
            }
        } catch (error) {
            console.error('Error during payment process:', error);
            setMessage(`Error: ${error.message}`);
        }

        setLoading(false);
    };

    return (

        <div className="flex w-1/2 h-[75vh] p-8 max-auto mt-8 absolute left-1/4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-lg bg-white">
            {/* Left Section - Booking Details */}
            <div className="w-1/3 bg-gray-700 text-white flex flex-col justify-center p-8 rounded-l-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Restoration</h2>
                <p className="text-lg">John Doe</p>
                <p className="text-lg font-semibold mt-2">Price: $150</p>
            </div>

            {/* Right Section - Payment Form */}
            <div className="w-2/3 flex items-center justify-center bg-gray-50 rounded-r-lg">
                <div className="bg-gray-50 p-8 rounded-lg w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Payment Details</h2>

                    {/* Payment Form */}
                    {!paymentSuccess && (
                        <form onSubmit={handlePayment} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Cardholder Name"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />

                            <CardNumberElement className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
                            <div className="flex space-x-2">
                                <CardExpiryElement className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
                                <CardCvcElement className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                {loading ? "Processing..." : "Pay: $150"}
                            </button>
                        </form>
                    )}

                    {message && <p className="text-center mt-4 text-red-600">{message}</p>}

                    {/* Booking Confirmation Modal */}
                    {paymentSuccess && (
                        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                            <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                                <h2 className="text-xl font-bold mb-4">Booking Confirmed</h2>
                                <p>
                                    Your booking for{" "}
                                    {moment(selectedSlot.date).format("LL")} -{" "}
                                    {moment(selectedSlot.startTime, "HH:mm").format("h:mm A")} to{" "}
                                    {moment(selectedSlot.endTime, "HH:mm").format("h:mm A")} has been confirmed!
                                </p>
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={() => navigate("/")} // Redirect to home page
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-600"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Payment;
