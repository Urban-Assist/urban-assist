import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ServiceProviders() {
    const { service } = useParams();
    const [serviceProviders, setServiceProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await axios.get(`http://localhost:8083/api/provider/service?service=${service}`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response);
                if (!response.status === 200) {
                    throw new Error("Failed to fetch providers");
                }
                const data = await response.data;
                setServiceProviders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProviders();
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

                            {loading ? (
                                <p className="text-center text-gray-600">Loading providers...</p>
                            ) : error ? (
                                <p className="text-center text-red-500">{error}</p>
                            ) : serviceProviders.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                                    {serviceProviders.map((provider, index) => (
                                        <Link key={index} to={`/portfolio/${provider.id}?service=${service.toLocaleLowerCase()}`}>
                                            <div className="relative bg-white border border-gray-200 rounded-3xl shadow-lg p-6 transition-all transform hover:scale-105 hover:shadow-2xl">
                                                {/* Profile Image */}
                                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                                    <img
                                                        src={provider.profilePic || "https://via.placeholder.com/150"}
                                                        alt={provider.name}
                                                        className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                                                    />
                                                </div>

                                                <div className="mt-12 text-center">
                                                    <h3 className="text-xl font-semibold text-gray-800">{provider.firstName} {provider.lastName}</h3>
                                                    <p className="text-gray-600 text-sm mt-2">{provider.description}</p>
                                                </div>

                                                {/* Address, Rating & Reviews */}
                                                <div className="flex items-center justify-between mt-6">
                                                    <div className="flex items-center text-gray-500">
                                                        <FaMapMarkerAlt className="text-red-500 mr-2" />
                                                        <span className="text-sm">{provider.address}</span>
                                                    </div>
                                                    <div className="flex items-center text-yellow-500 font-semibold">
                                                        <FaStar className="mr-1" /> {provider.stars} 
                                                    </div>
                                                </div>

                                                {/* Price */}
                                                <div className="mt-6">
                                                   $ <span className="text-lg font-bold text-gray-900">{provider.price}</span>
                                                </div>

                                                {/* Button */}
                                                <button className="w-full mt-6 py-2 text-white hover:cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-md hover:opacity-90 transition-all">
                                                    View Profile
                                                </button>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-600">No providers available for this service.</p>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
