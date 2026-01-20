import React from 'react';
import { FaStar } from 'react-icons/fa';
import moment from 'moment';

export default function ReviewList({ reviews }) {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="bg-gray-50 p-6 rounded-lg text-center">
                <p className="text-gray-600">No reviews yet. Be the first to review!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Customer Reviews ({reviews.length})
            </h3>

            {reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {review.consumerID?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <div>
                                <p className="font-medium text-gray-800">
                                    {review.consumerID}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {moment(review.createdAt).format('MMM DD, YYYY')}
                                </p>
                            </div>
                        </div>

                        {/* Star Rating */}
                        <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    className={`w-4 h-4 ${star <= review.rating
                                            ? 'text-yellow-400'
                                            : 'text-gray-300'
                                        }`}
                                />
                            ))}
                            <span className="ml-2 text-gray-600 font-medium">
                                {review.rating}/5
                            </span>
                        </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-700 leading-relaxed">
                        {review.review}
                    </p>
                </div>
            ))}
        </div>
    );
}
