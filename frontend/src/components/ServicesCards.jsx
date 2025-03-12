import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTools, FaBroom, FaWrench, FaBolt, FaRecycle, FaHeart } from "react-icons/fa";

// Map to associate service names with icons
const iconMap = {
  "Restoration": <FaRecycle className="text-blue-500" />,
  "House Cleaning": <FaBroom className="text-green-500" />,
  "Plumbing": <FaWrench className="text-indigo-500" />,
  "Electrician": <FaBolt className="text-yellow-500" />,
  "Repairs": <FaTools className="text-red-500" />,
  "Mental Well-being": <FaHeart className="text-pink-500" />,
  // Default icon for any new services added by admin
  "default": <FaTools className="text-gray-500" />
};

export default function ServiceCards({ title }) {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const serviceURL = import.meta.env.VITE_ADMIN_SERVER;
        console.log(serviceURL);
        
        // Get token from local storage
        const token = localStorage.getItem('token');
        
        // Set up request headers with bearer token
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        
        const response = await axios.get(serviceURL+'/admin/getServices', config);
        console.log("API Response:", response.data);
        
        // Extract services from the correct location in the response
        const servicesData = response.data.message || [];
        
        // Transform the data to include slug and appropriate icon
        const formattedServices = servicesData.map(service => ({
          name: service.serviceName, // Change from service.name to service.serviceName
          slug: service.serviceName.toLowerCase().replace(/\s+/g, '-'),
          icon: iconMap[service.serviceName] || iconMap.default,
          description: service.description,
          image: service.image
        }));
        
        setServices(formattedServices);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch services:", err);
        setError("Failed to load services. Please try again later.");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="main-content w-full px-6 mt-10">
        <div className="my-6 px-2 text-center">
          <p>Loading services...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="main-content w-full px-6 mt-10">
        <div className="my-6 px-2 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="main-content w-full px-6 mt-10">
      <div className="my-6 px-2">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center text-center space-y-4 border border-gray-200 hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/services/${service.slug}`)}
              >
                <div className="text-6xl">{service.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-700">{service.name}</h3>
                <p className="text-gray-500 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
