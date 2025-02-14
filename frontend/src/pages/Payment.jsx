import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const selectedSlot = location.state?.selectedSlot;
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

        const cardElement = elements.getElement(CardElement);
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            setMessage(error.message);
            setLoading(false);
            return;
        }

        const response = await fetch("http://localhost:5002/api/payments/card-pay", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount: 50, // Assuming a fixed price for the booking
                currency: "usd",
                paymentMethodId: paymentMethod.id,
            }),
        });

        const data = await response.json();
        setLoading(false);

        if (data.success) {
            setMessage("Payment successful!");
            setPaymentSuccess(true); // Show confirmation modal
        } else {
            setMessage(`Payment failed: ${data.error}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
                <p><strong>Date:</strong> {moment(selectedSlot.date).format("LL")}</p>
                <p><strong>Time:</strong> {moment(selectedSlot.startTime, "HH:mm").format("h:mm A")} - {moment(selectedSlot.endTime, "HH:mm").format("h:mm A")}</p>
                <p><strong>Service Fee:</strong> $50</p>

                {/* Payment Form */}
                {!paymentSuccess && (
                    <form onSubmit={handlePayment} className="space-y-4">
                        <CardElement className="p-3 border rounded" />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
                        >
                            {loading ? "Processing..." : "Pay"}
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
    );
};

export default Payment;
