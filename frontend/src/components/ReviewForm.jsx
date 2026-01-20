import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { getUserEmail } from '../utils/auth';

const REVIEWS_URL = import.meta.env.VITE_REVIEWS_URL || 'http://localhost:8002/reviews';
const PROVIDER_URL = import.meta.env.VITE_PROVIDER_URL || 'http://localhost:8083/api/providers';

export default function ReviewForm({ providerId, providerEmail, providerName, onReviewSubmitted }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            setMessage('Please select a rating');
            return;
        }

        if (!reviewText.trim()) {
            setMessage('Please write a review');
            return;
        }

        try {
            setLoading(true);
            const userEmail = getUserEmail();

            // If providerId is not a number, fetch it using providerEmail
            let actualProviderId = providerId;
            if (isNaN(providerId) || !providerId) {
                // Fetch provider by email to get the ID
                const token = localStorage.getItem('token');
                const providerResponse = await axios.get(`${PROVIDER_URL}/email/${providerEmail || providerId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                actualProviderId = providerResponse.data.id;
            }

            const reviewData = {
                providerID: actualProviderId,
                consumerID: userEmail, // Using email as consumer ID for now
                review: reviewText,
                rating: rating
            };

            const token = localStorage.getItem('token');
            await axios.post(`${REVIEWS_URL}/addReview`, reviewData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setMessage('Review submitted successfully!');
            setRating(0);
            setReviewText('');

            // Notify parent component
            if (onReviewSubmitted) {
                onReviewSubmitted();
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            setMessage('Failed to submit review. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Write a Review for {providerName}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Star Rating */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating <span className="text-red-500">*</span>
                    </label>
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                                className="focus:outline-none"
                            >
                                <FaStar
                                    className={`w-8 h-8 transition-colors ${star <= (hover || rating)
                                            ? 'text-yellow-400'
                                            : 'text-gray-300'
                                        }`}
                                />
                            </button>
                        ))}
                        {rating > 0 && (
                            <span className="ml-2 text-gray-600">{rating}/5</span>
                        )}
                    </div>
                </div>

                {/* Review Text */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        rows="4"
                        placeholder="Share your experience with this service provider..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>

                {/* Message */}
                {message && (
                    <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                        {message}
                    </p>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                    {loading ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
}
