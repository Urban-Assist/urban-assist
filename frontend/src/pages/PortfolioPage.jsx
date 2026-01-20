import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaPhoneAlt, FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import UserSidenav from "../components/UserSidenav";
import { useState, useEffect } from "react";
import { Carousel } from "@material-tailwind/react";
import Header from "../components/Header";
import ReviewList from "../components/ReviewList";
import axios from "axios";

const REVIEWS_URL = import.meta.env.VITE_REVIEWS_URL || 'http://localhost:8002/reviews';

export default function PortfolioPage() {
  const { providerName } = useParams(); // Getting the provider ID from URL
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const [isCarouselOpen, setCarouselOpen] = useState(false); // State to manage carousel visibility
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State to track current image

  const fetchReviews = async (providerId) => {
    try {
      setReviewsLoading(true);
      const response = await axios.get(`${REVIEWS_URL}/provider/${providerId}`);
      setReviews(response.data.data || []);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        setLoading(true);
        const providerUrl = import.meta.env.VITE_PROVIDER_URL || 'http://localhost:8083/api/providers';
        const response = await fetch(`${providerUrl}/${providerName}`);

        if (!response.ok) {
          throw new Error('Provider not found');
        }

        const data = await response.json();
        setProvider(data);
        setError(null);

        // Fetch reviews using provider ID
        if (data.id) {
          fetchReviews(data.id);
        }
      } catch (err) {
        console.error('Error fetching provider:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (providerName) {
      fetchProvider();
    }
  }, [providerName]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <p className="text-gray-600">Loading provider profile...</p>
        </div>
      </div>
    );
  }

  if (!provider || error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Provider Not Found</h2>
          <p className="text-gray-600 mb-2">{error || "The provider profile you're looking for doesn't exist yet."}</p>
          {error && <p className="text-sm text-gray-500 mb-6">Make sure the userManagement service is running on port 8083</p>}
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Open the carousel and set the clicked image
  const openCarousel = (index) => {
    setCurrentImageIndex(index);
    setCarouselOpen(true);
  };

  // Close the carousel
  const closeCarousel = () => {
    setCarouselOpen(false);
  };

  // Calculate average rating from reviews
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length).toFixed(1)
    : (provider.stars || 0);

  return (

    <div className="flex flex-col items-center p-4 sm:p-5 lg:p-12 min-h-screen mt-10">

      <div className="flex items-start">


        <div className="w-full mx-auto px-10 py-12 bg-gray-50">
          {/* Profile Header */}
          <div className="flex items-center space-x-6 mb-10">
            <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-md">
              <img
                src={provider.profilePic || provider.profile_pic || "https://randomuser.me/api/portraits/men/1.jpg"}
                alt={`${provider.firstName} ${provider.lastName}`}
                className="w-full h-full object-cover transform hover:scale-105 transition-all"
              />
            </div>
            <div className="text-gray-800">
              <h1 className="text-3xl font-semibold tracking-tight">{provider.firstName} {provider.lastName}</h1>
              <p className="text-lg text-gray-600 mt-2">{provider.description}</p>
            </div>
          </div>

          {/* Rating, Location, and Price */}
          <div className="flex justify-between mb-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <FaStar className="text-yellow-400" />
              <span className="font-medium">{averageRating} Rating {reviews.length > 0 && `(${reviews.length} reviews)`}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-red-500" />
              <span>{provider.address}</span>
            </div>
            <div className="text-lg font-semibold">{provider.price}</div>
          </div>

          {/* Work Samples - Click to Open Carousel */}
          {provider.workImages && provider.workImages.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Work Samples</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {provider.workImages.map((image, index) => (
                  <div key={index} className="cursor-pointer">
                    <img
                      src={image}
                      alt={`work ${index + 1}`}
                      className="w-full h-40 object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
                      onClick={() => openCarousel(index)} // Open the carousel on image click
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Testimonials */}
          {provider.testimonials && provider.testimonials.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Client Testimonials</h2>
              <div className="space-y-6">
                {provider.testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-all"
                  >
                    <p className="text-lg italic text-gray-700">"{testimonial}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-center space-x-4">
                <FaPhoneAlt className="text-blue-500" />
                <span>{provider.phoneNumber || provider.phone_number || 'N/A'}</span>
              </div>
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-green-500" />
                <span>{provider.email}</span>
              </div>
              <div className="flex items-center space-x-4">
                <FaLinkedin className="text-blue-600" />
                <a
                  href={provider.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>

          {/* Call to Action Button */}
          <div className="text-center mb-10">
            <button
              onClick={() => navigate('/booking', {
                state: {
                  providerEmail: provider.email,
                  providerName: `${provider.firstName} ${provider.lastName}`,
                  serviceType: provider.service
                }
              })}
              className="inline-block py-3 px-8 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md hover:bg-gradient-to-l transition-all cursor-pointer"
            >
              Book {provider.firstName}
            </button>
          </div>

          {/* Reviews Section */}
          <div className="mb-10">
            <ReviewList reviews={reviews} />
          </div>

          {/* Modal Carousel */}
          {isCarouselOpen && (
            <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
              <div className="relative w-full md:w-3/4 bg-transparent rounded-xl h-180">

                <Carousel className="rounded-xl">
                  {provider.workImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`work ${index + 1}`}
                      className="h-full w-full object-cover rounded-xl"
                    />
                  ))}
                </Carousel>
                <button
                  className="absolute top-8 right-8 w-8 h-8 rounded-full  text-gray-800 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-all"
                  onClick={closeCarousel}
                >
                  <span className="text-4xl">&times;</span>
                </button>
              </div>
            </div>
          )}
        </div>



      </div>
    </div>


  );
}
