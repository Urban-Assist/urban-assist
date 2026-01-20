import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaStar, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaLinkedin } from "react-icons/fa";
import UserSidenav from "../components/UserSidenav";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

const REVIEWS_URL = import.meta.env.VITE_REVIEWS_URL || 'http://localhost:8002/reviews';

export default function ServiceProviders() {
    const { service } = useParams();
    const [serviceProviders, setServiceProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviewsData, setReviewsData] = useState({});

    // Fetch reviews for all providers
    const fetchReviewsForProviders = async (providers) => {
        const reviewsMap = {};
        try {
            const reviewPromises = providers.map(async (provider) => {
                try {
                    const response = await axios.get(`${REVIEWS_URL}/provider/${provider.id}`);
                    const reviews = response.data.data || [];
                    const averageRating = reviews.length > 0
                        ? (reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length).toFixed(1)
                        : (provider.stars || 0);
                    return { id: provider.id, averageRating, reviewCount: reviews.length };
                } catch (err) {
                    console.error(`Error fetching reviews for provider ${provider.id}:`, err);
                    return { id: provider.id, averageRating: provider.stars || 0, reviewCount: 0 };
                }
            });

            const results = await Promise.all(reviewPromises);
            results.forEach(result => {
                reviewsMap[result.id] = result;
            });
            setReviewsData(reviewsMap);
        } catch (err) {
            console.error('Error fetching reviews:', err);
        }
    };

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                setLoading(true);
                const providerUrl = import.meta.env.VITE_PROVIDER_URL || 'http://localhost:8083/api/providers';
                const response = await fetch(`${providerUrl}/service/${service}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch providers');
                }

                const data = await response.json();
                setServiceProviders(data);
                setError(null);

                // Fetch reviews for all providers
                if (data.length > 0) {
                    await fetchReviewsForProviders(data);
                }
            } catch (err) {
                console.error('Error fetching providers:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (service) {
            fetchProviders();
        }
    }, [service]);

    return (
        <div className="flex flex-col items-center p-4 sm:p-5 lg:p-12 min-h-screen mt-10">

            <div className="flex items-start">
                <section className="main-content w-full px-6">
                    <div className="my-6 px-2">
                        <div className="container mx-auto px-6 py-10">
                            <h2 className="text-4xl font-bold text-gray-800 text-center mb-8 capitalize">
                                {service?.replace("-", " ")} Providers
                            </h2>

                            {loading && (
                                <p className="text-center text-gray-600">Loading providers...</p>
                            )}

                            {error && (
                                <div className="text-center text-red-600">
                                    <p>Error loading providers: {error}</p>
                                    <p className="text-sm mt-2">Make sure the userManagement service is running on port 8083</p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                                {!loading && !error && serviceProviders.length > 0 ? (
                                    serviceProviders.map((provider, index) => (
                                        <Link
                                            key={provider.id || index}
                                            to={`/portfolio/${provider.id}`}
                                        >
                                            <div
                                                className="relative bg-white border border-gray-200 rounded-3xl shadow-lg p-6 transition-all transform hover:scale-105 hover:shadow-2xl"
                                            >
                                                {/* Profile Image */}
                                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                                    <img
                                                        src={provider.profilePic || provider.profile_pic || "https://randomuser.me/api/portraits/men/1.jpg"}
                                                        alt={`${provider.firstName} ${provider.lastName}`}
                                                        className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                                                    />
                                                </div>

                                                <div className="mt-12 text-center">
                                                    <h3 className="text-xl font-semibold text-gray-800">
                                                        {provider.firstName} {provider.lastName}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm mt-2">{provider.description}</p>
                                                </div>

                                                {/* Address, Rating & Reviews */}
                                                <div className="flex items-center justify-between mt-6">
                                                    <div className="flex items-center text-gray-500">
                                                        <FaMapMarkerAlt className="text-red-500 mr-2" />
                                                        <span className="text-sm">{provider.address}</span>
                                                    </div>
                                                    <div className="flex items-center text-yellow-500 font-semibold">
                                                        <FaStar className="mr-1" />
                                                        {reviewsData[provider.id]?.averageRating || provider.stars || 0}
                                                    </div>
                                                </div>

                                                {/* Years of Experience */}
                                                {provider.experience && (
                                                    <div className="mt-4">
                                                        <span className="text-sm text-gray-600">Experience: {provider.experience} years</span>
                                                    </div>
                                                )}

                                                {/* Price */}
                                                <div className="mt-6">
                                                    <span className="text-lg font-bold text-gray-900">{provider.price}</span>
                                                </div>

                                                {/* Button */}
                                                <button className="w-full mt-6 py-2 text-white hover:cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-md hover:opacity-90 transition-all">
                                                    View Profile
                                                </button>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    !loading && !error && <p className="text-center text-gray-600">No providers available for this service.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

    );
}
