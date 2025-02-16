import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaTools, FaBroom, FaWrench, FaBolt, FaRecycle, FaHeart } from "react-icons/fa";

const services = [
  { name: "Restoration", slug: "restoration", icon: <FaRecycle className="text-blue-500" />, description: "Bringing life back to your spaces with expert restoration services." },
  { name: "House Cleaning", slug: "house-cleaning", icon: <FaBroom className="text-green-500" />, description: "Sparkling clean homes with our professional cleaning services." },
  { name: "Plumbing", slug: "plumbing", icon: <FaWrench className="text-indigo-500" />, description: "Fixing leaks and ensuring smooth water flow in your home." },
  { name: "Electrician", slug: "electrician", icon: <FaBolt className="text-yellow-500" />, description: "Reliable electrical solutions for your safety and convenience." },
  { name: "Repairs", slug: "repairs", icon: <FaTools className="text-red-500" />, description: "Quick and efficient repair services to keep things running." },
  { name: "Mental Well-being", slug: "mental-wellbeing", icon: <FaHeart className="text-pink-500" />, description: "Nurturing your mind and soul with care and support." },
];

export default function ServiceCards({ title }) {
  const navigate = useNavigate();

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
