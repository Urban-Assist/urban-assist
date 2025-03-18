import { useParams, useLocation } from "react-router-dom";
import { FaStar, FaPhoneAlt, FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaBriefcase, FaQuoteRight, FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PortfolioPage() {
  const { Id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const service = queryParams.get('service');
  const [provider, setProvider] = useState(null);
  const [isCarouselOpen, setCarouselOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8083/api/provider/profile/${Id}?service=${service}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setProvider(response.data);
        } else {
          throw new Error("Failed to fetch provider data");
        }
      } catch (error) {
        console.error("Error fetching provider:", error);
        setError("Unable to load provider information. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [Id, service, token]);

  const openCarousel = (index) => {
    setCurrentImageIndex(index);
    setCarouselOpen(true);
    // Prevent page scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeCarousel = () => {
    setCarouselOpen(false);
    // Restore page scrolling
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (provider.workImages && provider.workImages.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === provider.workImages.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (provider.workImages && provider.workImages.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? provider.workImages.length - 1 : prevIndex - 1
      );
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isCarouselOpen) return;
      
      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'Escape') {
        closeCarousel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCarouselOpen, provider]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Provider Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "We couldn't find the provider you're looking for."}</p>
          <Link to="/" className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    if (!price) return "Price unavailable";
    return typeof price === 'string' ? price : `$${price.toFixed(2)}`;
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Hero Section */}
        <div className="relative h-64 bg-gradient-to-r from-cyan-100 via-pink-100 to-yellow-100">
          <div className="absolute -bottom-16 left-12">
            <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-xl">
              {provider.profilePic ? (
                <img
                  src={provider.profilePic}
                  alt={`${provider.firstName} ${provider.lastName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-500 text-2xl font-bold">
                  {provider.firstName?.[0]}{provider.lastName?.[0]}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-20 px-12 pb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-800">
                {provider.firstName || ''} {provider.lastName || ''}
              </h1>
              <div className="flex items-center mt-2 text-gray-600">
                <FaBriefcase className="mr-2 text-indigo-500" />
                <span>{service || "Service Provider"}</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
              <div className="flex items-center px-4 py-2 bg-gray-100 rounded-full">
                <FaStar className="text-yellow-500 mr-2" />
                <span className="font-semibold">{provider.stars || "New"}</span>
              </div>
              <div className="px-4 py-2 bg-indigo-100 text-indigo-700 font-semibold rounded-full">
                $ {formatPrice(provider.price)}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8 p-6 bg-gray-100 rounded-lg border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">About</h2>
            <p className="text-gray-600 leading-relaxed">
              {provider.description || "No description provided."}
            </p>
          </div>

          {/* Location */}
          {provider.address && (
            <div className="mt-6 flex items-start">
              <FaMapMarkerAlt className="text-red-500 mt-1 mr-3 flex-shrink-0" />
              <span className="text-gray-600">{provider.address}</span>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-200">
          <div className="px-12 py-8">
            {/* Work Samples */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                
                Work Samples
              </h2>
              
              {provider.workImages && provider.workImages.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {provider.workImages.map((image, index) => (
                    <div 
                      key={index} 
                      className="cursor-pointer group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                      onClick={() => openCarousel(index)}
                    >
                      <img
                        src={image}
                        alt={`work ${index + 1}`}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-100 rounded-lg">
                  <p className="text-gray-500">No work samples available</p>
                </div>
              )}
            </div>

            {/* Testimonials */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                
                Client Testimonials
              </h2>
              
              {provider.testimonials && provider.testimonials.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {provider.testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg p-6 relative shadow-md hover:shadow-lg transition-all">
                      <FaQuoteRight className="absolute top-4 right-4 text-gray-200 text-3xl" />
                      <p className="text-gray-700 italic mb-4 leading-relaxed">{testimonial}</p>
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mr-3">
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-800">Client {index + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-100 rounded-lg">
                  <p className="text-gray-500">No testimonials available</p>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                
                Contact Information
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <div className="grid md:grid-cols-2 gap-6">
                  {provider.phoneNumber && (
                    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <FaPhoneAlt className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{provider.phoneNumber}</p>
                      </div>
                    </div>
                  )}
                  
                  {provider.email && (
                    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <FaEnvelope className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{provider.email}</p>
                      </div>
                    </div>
                  )}
                  
                  {provider.linkedin && (
                    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <FaLinkedin className="text-blue-700" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">LinkedIn</p>
                        <a 
                          href={provider.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 hover:text-blue-800"
                        >
                          View Profile
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Call to Action Button */}
            <div className="text-center mt-12">
              <Link
                to={`/booking/${provider.id}?service=${service}`}
                className="inline-block py-2 px-8 text-lg font-medium text-white bg-indigo-500 rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-1 transition-all"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Carousel Modal */}
      {isCarouselOpen && provider.workImages && provider.workImages.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="relative w-full max-w-6xl p-4">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-10 bg-white/80 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              onClick={closeCarousel}
            >
              <FaTimes className="text-gray-800" />
            </button>
            
            {/* Main image */}
            <div className="flex items-center justify-center h-[80vh] relative">
              <img
                src={provider.workImages[currentImageIndex]}
                alt={`work ${currentImageIndex + 1}`}
                className="max-h-full max-w-full object-contain"
              />
              
              {/* Navigation buttons */}
              <button
                className="absolute left-4 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white transition-colors"
                onClick={prevImage}
              >
                <FaArrowLeft className="text-gray-800 text-xl" />
              </button>
              
              <button
                className="absolute right-4 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white transition-colors"
                onClick={nextImage}
              >
                <FaArrowRight className="text-gray-800 text-xl" />
              </button>
            </div>
            
            {/* Thumbnails */}
            <div className="flex justify-center mt-4 space-x-2 overflow-x-auto py-2">
              {provider.workImages.map((image, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 cursor-pointer rounded-md overflow-hidden ${
                    currentImageIndex === index ? 'ring-2 ring-indigo-500' : ''
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            
            {/* Image counter */}
            <div className="text-center text-white mt-2">
              {currentImageIndex + 1} / {provider.workImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}