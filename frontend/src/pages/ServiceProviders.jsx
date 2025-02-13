import { useParams } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaLinkedin } from "react-icons/fa";
import UserSidenav from "../components/UserSidenav";
import { Link } from "react-router-dom";

const providers = {
    restoration: [
        { name: "John Doe", description: "Expert in home restoration", stars: 4.5, price: "$150/hr", profilePic: "https://randomuser.me/api/portraits/men/1.jpg", address: "New York, NY" },
        { name: "Jane Smith", description: "20 years of experience", stars: 4.8, price: "$180/hr", profilePic: "https://randomuser.me/api/portraits/women/2.jpg", address: "Los Angeles, CA" },
    ],
    "house-cleaning": [
        { name: "Mike Johnson", description: "Professional cleaner with 5 years experience", stars: 4.7, price: "$100/hr", profilePic: "https://randomuser.me/api/portraits/men/3.jpg", address: "Chicago, IL" },
    ],
    plumbing: [
        { name: "Robert White", description: "Fixing leaks for over a decade", stars: 4.9, price: "$120/hr", profilePic: "https://randomuser.me/api/portraits/men/4.jpg", address: "Houston, TX" },
    ],
    electrician: [
        { name: "Lisa Green", description: "Licensed electrician with great reviews", stars: 4.6, price: "$130/hr", profilePic: "https://randomuser.me/api/portraits/women/5.jpg", address: "Miami, FL" },
    ],
    repairs: [
        { name: "Paul Brown", description: "General repair specialist", stars: 4.5, price: "$140/hr", profilePic: "https://randomuser.me/api/portraits/men/6.jpg", address: "Seattle, WA" },
    ],
    "mental-wellbeing": [
        { name: "Dr. Emily Carter", description: "Certified mental health professional", stars: 5.0, price: "$200/hr", profilePic: "https://randomuser.me/api/portraits/women/6.jpg", address: "San Francisco, CA" },
    ],
};

export default function ServiceProviders() {
    const { service } = useParams();
    const serviceProviders = providers[service] || [];

    return (
        <div class="relative bg-[#f7f6f9] h-full min-h-screen font-[sans-serif]">
            <div class="flex items-start">
                <UserSidenav />
                <section className="main-content w-full px-6">
                    <div className="my-6 px-2">
                        <div className="container mx-auto px-6 py-10">
                            <h2 className="text-4xl font-bold text-gray-800 text-center mb-8 capitalize">
                                {service?.replace("-", " ")} Providers
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                                {serviceProviders.length > 0 ? (
                                    serviceProviders.map((provider, index) => (
                                        <Link
                                            key={index}
                                            to={`/portfolio/${provider.name}`} // This link will go to the provider's detailed portfolio page
                                        >
                                            <div
                                                key={index}
                                                className="relative bg-white border border-gray-200 rounded-3xl shadow-lg p-6 transition-all transform hover:scale-105 hover:shadow-2xl"
                                            >
                                                {/* Profile Image */}
                                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                                    <img
                                                        src={provider.profilePic} // Online profile image URL
                                                        alt={provider.name}
                                                        className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                                                    />
                                                </div>

                                                <div className="mt-12 text-center">
                                                    <h3 className="text-xl font-semibold text-gray-800">{provider.name}</h3>
                                                    <p className="text-gray-600 text-sm mt-2">{provider.description}</p>
                                                </div>

                                                {/* Special Offer */}
                                                {provider.specialOffer && (
                                                    <div className="mt-4">
                                                        <span className="text-sm text-green-500 font-semibold">{provider.specialOffer}</span>
                                                    </div>
                                                )}

                                                {/* Address, Rating & Reviews */}
                                                <div className="flex items-center justify-between mt-6">
                                                    <div className="flex items-center text-gray-500">
                                                        <FaMapMarkerAlt className="text-red-500 mr-2" />
                                                        <span className="text-sm">{provider.address}</span>
                                                    </div>
                                                    <div className="flex items-center text-yellow-500 font-semibold">
                                                        <FaStar className="mr-1" /> {provider.stars} ({provider.reviews} reviews)
                                                    </div>
                                                </div>

                                                {/* Years of Experience */}
                                                <div className="mt-4">
                                                    <span className="text-sm text-gray-600">Experience: {provider.yearsExperience} years</span>
                                                </div>

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
                                    <p className="text-center text-gray-600">No providers available for this service.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

    );
}
