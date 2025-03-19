import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTools, FaBroom, FaWrench, FaBolt, FaRecycle, FaHeart } from "react-icons/fa";


// Define a consistent color and icon mapping
const serviceStyles = {
  Restoration: { 
    icon: FaRecycle, 
    color: "text-teal-600",
    image: "https://img.freepik.com/free-photo/painting-red_1385-599.jpg?semt=ais_hybrid" // These would be replaced with actual image paths in production
  },
  "House Cleaning": { 
    icon: FaBroom, 
    color: "text-emerald-600",
    image: "https://img.freepik.com/free-photo/professional-cleaning-service-person-using-vacuum-cleaner-office_23-2150520594.jpg?semt=ais_hybrid"
  },
  Plumbing: { 
    icon: FaWrench, 
    color: "text-blue-600",
    image: "https://img.freepik.com/free-photo/plumbing-professional-doing-his-job_23-2150721533.jpg?semt=ais_hybrid"
  },
  Electrician: { 
    icon: FaBolt, 
    color: "text-amber-600",
    image: "https://img.freepik.com/free-photo/male-electrician-works-switchboard-with-electrical-connecting-cable_169016-15085.jpg?semt=ais_hybrid"
  },
  Repairs: { 
    icon: FaTools, 
    color: "text-rose-600",
    image: "https://img.freepik.com/free-photo/full-shot-man-woman-standing-ladder_23-2149366705.jpg?semt=ais_hybrid"
  },
  "Mental Well-being": { 
    icon: FaHeart, 
    color: "text-pink-600",
    image: "https://img.freepik.com/free-photo/woman-consoling-person-group-therapy-session_23-2148752111.jpg?semt=ais_hybrid"
  },
  default: { 
    icon: FaTools, 
    color: "text-gray-500",
    image: "/api/placeholder/600/400"
  },
};

// Enhanced Card component with image
const ServiceCard = ({ name, description, icon: Icon, color, image, onClick }) => (
  <motion.div
    className="bg-white rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl"
    whileHover={{ y: -4, transition: { duration: 0.3 } }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    role="button"
    tabIndex={0}
    aria-label={`Select ${name} service`}
    onKeyPress={(e) => e.key === "Enter" && onClick()}
  >
    <div className="relative h-48 w-full overflow-hidden">
      <img 
        src={image} 
        alt={`${name} service`} 
        className="w-full h-full object-cover transform transition-transform hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-4 left-4 flex items-center">
        <Icon className={`w-6 h-6 ${color}`} />
        <h3 className="ml-2 text-xl font-bold text-white">{name}</h3>
      </div>
    </div>
    <div className="p-5">
      <p className="text-gray-600">{description}</p>
      <button 
        className={`mt-4 px-4 py-2 rounded-md bg-opacity-10 ${color} font-medium text-sm transition-colors hover:bg-opacity-20 flex items-center`}
      >
        Learn more
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </motion.div>
);

// Enhanced Skeleton Loader for better UX
const SkeletonCard = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg">
    <div className="h-48 w-full bg-gray-200 animate-pulse" />
    <div className="p-5">
      <div className="w-3/4 h-5 bg-gray-200 rounded animate-pulse mb-3" />
      <div className="w-full h-4 bg-gray-100 rounded animate-pulse mb-2" />
      <div className="w-full h-4 bg-gray-100 rounded animate-pulse mb-2" />
      <div className="w-1/3 h-8 bg-gray-200 rounded animate-pulse mt-4" />
    </div>
  </div>
);

export default function ServiceCards({ title }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleNavigate = (name) => {
    if (role === "user") {
      navigate(`/services/${name}`);
    } else if (role === "provider") {
      navigate(`/provider/profile?service=${name.toLowerCase()}`);
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {

        if(token == null) navigate("/login");

        setLoading(true);
        const serviceURL = import.meta.env.VITE_ADMIN_SERVER;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`${serviceURL}/admin/getServices`, config);
        const servicesData = response.data.message || [];

        const formattedServices = servicesData.map((service) => {
          const style = serviceStyles[service.serviceName] || serviceStyles.default;
          return {
            name: service.serviceName,
            slug: service.serviceName.toLowerCase().replace(/\s+/g, "-"),
            icon: style.icon,
            color: style.color,
            description: service.description,
            image: style.image, // Use provided image or fallback to default
          };
        });

        setServices(formattedServices);
        setLoading(false);
      } catch (err) {
        if (err.response?.status === 401) navigate("/login");
        setError("Failed to load services. Please try again.");
        setLoading(false);
      }
    };

    fetchServices();
  }, [navigate, token]);

  return (
    <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our range of professional services tailored to meet your specific needs
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center bg-red-50 rounded-lg p-6 mx-auto max-w-md">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-600 font-medium">{error}</p>
            <button 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 hover:cursor-pointer">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                name={service.name}
                description={service.description}
                icon={service.icon}
                color={service.color}
                image={service.image}
                onClick={() => handleNavigate(service.name)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}