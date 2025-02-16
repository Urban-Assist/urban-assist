import { useParams } from "react-router-dom";
import { FaStar, FaPhoneAlt, FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import UserSidenav from "../components/UserSidenav";
import { useState } from "react";
import { Carousel } from "@material-tailwind/react";
import Header from "../components/Header";
// Placeholder for portfolio data
const portfolios = {
  "John Doe": {
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    workImages: [
      "https://picsum.photos/800/600?1",
      "https://picsum.photos/800/600?2",
      "https://picsum.photos/800/600?3",
      "https://picsum.photos/800/600?4",
      "https://picsum.photos/800/600?5",
    ],
    testimonials: [
      { client: "Alice", feedback: "John did an amazing job! Highly recommend!" },
      { client: "Bob", feedback: "Professional and very skilled at what he does." },
    ],
    contactInfo: {
      phone: "+1234567890",
      email: "john.doe@example.com",
      linkedin: "https://linkedin.com/in/johndoe",
    },
    description: "Expert in home restoration with over 10 years of experience. Specializes in restoring homes after water and fire damage.",
    stars: 4.8,
    price: "$150/hr",
    address: "New York, NY",
  },
  // Add other providers here...
};

export default function PortfolioPage() {
  const { providerName } = useParams(); // Getting the provider name from URL
  const provider = portfolios[providerName];

  const [isCarouselOpen, setCarouselOpen] = useState(false); // State to manage carousel visibility
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State to track current image

  if (!provider) {
    return <p>Provider not found.</p>;
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

  return (

    <div className="flex flex-col items-center p-4 sm:p-5 lg:p-12 min-h-screen mt-10">

      <div class="flex items-start">


        <div className="w-full mx-auto px-10 py-12 bg-gray-50">
          {/* Profile Header */}
          <div className="flex items-center space-x-6 mb-10">
            <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-md">
              <img
                src={provider.profilePic}
                alt={providerName}
                className="w-full h-full object-cover transform hover:scale-105 transition-all"
              />
            </div>
            <div className="text-gray-800">
              <h1 className="text-3xl font-semibold tracking-tight">{providerName}</h1>
              <p className="text-lg text-gray-600 mt-2">{provider.description}</p>
            </div>
          </div>

          {/* Rating, Location, and Price */}
          <div className="flex justify-between mb-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <FaStar className="text-yellow-400" />
              <span className="font-medium">{provider.stars} Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-red-500" />
              <span>{provider.address}</span>
            </div>
            <div className="text-lg font-semibold">{provider.price}</div>
          </div>

          {/* Work Samples - Click to Open Carousel */}
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

          {/* Testimonials */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Client Testimonials</h2>
            <div className="space-y-6">
              {provider.testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-all"
                >
                  <p className="text-lg italic text-gray-700">"{testimonial.feedback}"</p>
                  <p className="mt-4 font-semibold text-gray-800 text-sm">- {testimonial.client}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-center space-x-4">
                <FaPhoneAlt className="text-blue-500" />
                <span>{provider.contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-green-500" />
                <span>{provider.contactInfo.email}</span>
              </div>
              <div className="flex items-center space-x-4">
                <FaLinkedin className="text-blue-600" />
                <a
                  href={provider.contactInfo.linkedin}
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
          <div className="text-center">
            <a
              href='/booking'
              className="inline-block py-3 px-8 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md hover:bg-gradient-to-l transition-all"
            >
              Book {providerName}
            </a>
          </div>

          {/* Modal Carousel */}
          {isCarouselOpen && (
            <div className="fixed inset-0 lg:left-60 flex justify-center items-center z-50 bg-black/50">
              <div className="relative w-full md:w-3/4 bg-transparent p-8 rounded-xl">

                <Carousel className="rounded-xl h-full">
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
