import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaStar, FaMapMarkerAlt, FaSearch, FaFilter, FaChevronRight, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ServiceProviders() {
    const { service } = useParams();
    const [serviceProviders, setServiceProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [priceRange, setPriceRange] = useState(1000);
    const [minRating, setMinRating] = useState(0);
    const token = localStorage.getItem("token");

    // For hero section
    const serviceImages = {
        "plumbing": "/api/placeholder/1600/400",
        "house-cleaning": "/api/placeholder/1600/400",
        "electrician": "/api/placeholder/1600/400",
        "repairs": "/api/placeholder/1600/400",
        "restoration": "https://img.freepik.com/free-photo/full-shot-man-woman-standing-ladder_23-2149366705.jpg?semt=ais_hybrid",
        "mental-well-being": "/api/placeholder/1600/400",
        "default": "/api/placeholder/1600/400"
    };

    const heroImage = "https://img.freepik.com/free-photo/full-shot-man-woman-standing-ladder_23-2149366705.jpg?semt=ais_hybrid";

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await axios.get(`http://localhost:8083/api/provider/service?service=${service}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status !== 200) {
                    throw new Error("Failed to fetch providers");
                }

                setServiceProviders(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProviders();
    }, [service, token]);

    // Filter and search functionality
    const filteredProviders = serviceProviders.filter(provider => {
        const nameMatch = `${provider.firstName} ${provider.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
        const descriptionMatch = provider.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const addressMatch = provider.address?.toLowerCase().includes(searchTerm.toLowerCase());
        const ratingMatch = provider.stars >= minRating;
        const priceMatch = provider.price <= priceRange;

        return (nameMatch || descriptionMatch || addressMatch) && ratingMatch && priceMatch;
    });

    // Skeleton loader component
    const ProviderSkeleton = () => (
        <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
            <div className="flex justify-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
            </div>
            <div className="mt-6 flex flex-col items-center">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="flex justify-between mt-6">
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-1/4 mt-4"></div>
            <div className="h-10 bg-gray-200 rounded w-full mt-6"></div>
        </div>
    );

    // Rating star component
    const RatingStars = ({ rating, setRating }) => {
        return (
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                        key={star}
                        className={`cursor-pointer ${star <= minRating ? 'text-yellow-500' : 'text-gray-300'}`}
                        onClick={() => setRating(star)}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">

            {/* Search and Filter Section */}
            <div className="py-4 sticky top-0 z-10 mt-22">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="relative w-full md:w-1/2">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, description or location..."
                                className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                            onClick={() => setFilterOpen(!filterOpen)}
                        >
                            <FaFilter />
                            Filters
                        </button>
                    </div>

                    {/* Filters Panel */}
                    {filterOpen && (
                        <div className="mt-4 border-t pt-4 pb-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range: ${priceRange}</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                                <RatingStars rating={minRating} setRating={setMinRating} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 md:px-8 py-10 w-[60vw]">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <ProviderSkeleton key={item} />
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-16">
                        <div className="bg-red-50 border border-red-100 rounded-lg p-8 max-w-md mx-auto">
                            <div className="flex flex-col items-center">
                                <svg className="w-12 h-12 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                </svg>
                                <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Providers</h3>
                                <p className="text-red-600">{error}</p>
                                <button
                                    className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                    onClick={() => window.location.reload()}
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                ) : filteredProviders.length > 0 ? (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-600">{filteredProviders.length} providers found</p>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Sort by:</span>
                                <select className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>Highest Rating</option>
                                    <option>Lowest Price</option>
                                    <option>Highest Price</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProviders.map((provider, index) => (
                                <Link
                                    key={index}
                                    to={`/portfolio/${provider.id}?service=${service.toLowerCase()}`}
                                    className="block"
                                >
                                    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl h-full flex flex-col">
                                        <div className="bg-gray-100 p-6 text-center relative">
                                            
                                            <div className="inline-block p-1 bg-white rounded-full">
                                                <img
                                                    src={provider.profilePic || "/api/placeholder/150/150"}
                                                    alt={provider.firstName}
                                                    className="w-24 h-24 rounded-full object-cover"
                                                />
                                            </div>



                                            <div className="flex items-center align-center justify-between mt-1 ">
                                                <h3 className="text-xl font-bold  ">
                                                    {provider.firstName} {provider.lastName}
                                                </h3>
                                                <div className="flex items-center">
                                                    <FaStar className="text-yellow-400 mr-1" />
                                                    <span>{provider.stars?.toFixed(1) || "New"}</span>
                                                </div>
                                            </div>

                                            {provider.verified && (
                                                <div className="absolute top-3 right-3 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                                                    <FaCheckCircle className="mr-1" />
                                                    Verified
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6 flex-grow">
                                            <p className="text-gray-600 mb-4 line-clamp-3">{provider.description || "No description available"}</p>

                                            <div className="flex items-start text-gray-500 mb-4">
                                                <FaMapMarkerAlt className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                                                <span className="text-sm">{provider.address || "Location not specified"}</span>
                                            </div>

                                            {/* Services & Badges */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {provider.specialties?.slice(0, 3).map((specialty, idx) => (
                                                    <span key={idx} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                                        {specialty}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="font-semibold text-gray-900">
                                                    ${provider.price} <span className="text-sm text-gray-500 font-normal">/ hour</span>
                                                </div>
                                                <span className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
                                                    View Profile <FaChevronRight className="ml-1" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    
                                </Link>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16">
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-8 max-w-md mx-auto">
                            <div className="flex flex-col items-center">
                                <svg className="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                                <h3 className="text-lg font-semibold text-blue-800 mb-2">No Providers Found</h3>
                                <p className="text-blue-600">We couldn't find any {service?.replace(/-/g, " ")} providers matching your criteria.</p>
                                {(searchTerm || minRating > 0 || priceRange < 1000) && (
                                    <button
                                        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                        onClick={() => {
                                            setSearchTerm("");
                                            setMinRating(0);
                                            setPriceRange(1000);
                                        }}
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Quick Connect Section */}
            {!loading && !error && filteredProviders.length > 0 && (
                <div className="bg-gradient-to-br from-cyan-100 via-pink-100 to-yellow-100 py-12 px-4 md:px-8 mt-12">
                    <div className="container mx-auto text-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Need help finding the right provider?</h2>
                        <p className="max-w-2xl mx-auto mb-8">Our matching service can help you find the perfect professional for your specific needs.</p>
                        <button className="bg-white text-indigo-500 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                            Get Matched Now
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}