import { useParams } from "react-router-dom";
import { FaStar, FaCamera, FaPhoneAlt, FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaTimes, FaChevronLeft, FaChevronRight, FaEdit, FaSave } from "react-icons/fa";
import UserSidenav from "../components/UserSidenav";
import { useState } from "react";
import { Carousel } from "@material-tailwind/react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/firebase"; // Import Firebase storage
import ProviderSidenav from "../components/ProviderSidenav";

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
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [formData, setFormData] = useState(provider); // State to manage editable data

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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle contact info changes
  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [name]: value,
      },
    }));
  };

  // Handle image upload to Firebase for work samples
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `workImages/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setFormData((prev) => ({
        ...prev,
        workImages: [...prev.workImages, downloadURL],
      }));
    }
  };

  // Handle profile picture upload to Firebase
  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `profilePics/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setFormData((prev) => ({
        ...prev,
        profilePic: downloadURL,
      }));
    }
  };

  // Save changes
  const saveChanges = () => {
    setIsEditing(false);
    // Save formData to Firebase or backend
    console.log("Updated Data:", formData);
    alert("Changes saved successfully!");
  };

  return (
    <div className="w-full mx-auto px-10 py-12 bg-gray-50">
          {/* Edit Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => (isEditing ? saveChanges() : setIsEditing(true))}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {isEditing ? <FaSave /> : <FaEdit />}
              <span>{isEditing ? "Save Changes" : "Edit Portfolio"}</span>
            </button>
          </div>

          {/* Profile Header */}
          <div className="flex items-center justify-center space-x-6 mb-10">
            <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-md">
              <img
                src={formData.profilePic}
                alt={providerName}
                className="w-full h-full object-cover transform hover:scale-105 transition-all"
              />
              {isEditing && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicUpload}
                    className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-100 transition-opacity">
                    <FaCamera className="text-white text-2xl" />
                  </div>
                </>
              )}
            </div>
            <div className="text-gray-800 w-[90%]">
              {isEditing ? (
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="text-lg text-gray-600 mt-2 p-2 border border-gray-300 rounded-lg w-full max-w-full"
                />
              ) : (
                <>
                  <h1 className="text-3xl font-semibold tracking-tight">{providerName}</h1>
                  <p className="text-lg text-gray-600 mt-2">{formData.description}</p>
                </>
              )}
            </div>
          </div>

          {/* Rating, Location, and Price */}
          <div className="flex justify-between mb-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <FaStar className="text-yellow-400" />
              <span className="font-medium">{formData.stars} Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-red-500" />
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-40 p-2 border border-gray-300 rounded-lg"
                />
              ) : (
                <span>{formData.address}</span>
              )}
            </div>
            <div className="text-lg font-semibold">
              {isEditing ? (
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-20 p-2 border border-gray-300 rounded-lg"
                />
              ) : (
                formData.price
              )}
            </div>
          </div>

          {/* Work Samples */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Work Samples</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.workImages.map((image, index) => (
                <div key={index} className="cursor-pointer">
                  <img
                    src={image}
                    alt={`work ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
                    onClick={() => openCarousel(index)}
                  />
                </div>
              ))}
              {isEditing && (
                <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="opacity-0 absolute w-fill h-40 cursor-pointer"
                  />
                  <span className="text-gray-500">Upload Image</span>
                </div>
              )}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Client Testimonials</h2>
            <div className="space-y-6">
              {formData.testimonials.map((testimonial, index) => (
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
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.contactInfo.phone}
                    onChange={handleContactInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <span>{formData.contactInfo.phone}</span>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-green-500" />
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.contactInfo.email}
                    onChange={handleContactInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <span>{formData.contactInfo.email}</span>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <FaLinkedin className="text-blue-600" />
                {isEditing ? (
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.contactInfo.linkedin}
                    onChange={handleContactInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <a
                    href={formData.contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    LinkedIn Profile
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Modal Carousel */}
          {isCarouselOpen && (
            <div className="fixed inset-0 lg:left-60 flex justify-center items-center z-50 bg-black/50">
              <div className="relative w-full md:w-3/4 bg-transparent p-8 rounded-xl">
                <Carousel className="rounded-xl h-full">
                  {formData.workImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`work ${index + 1}`}
                      className="h-full w-full object-cover rounded-xl"
                    />
                  ))}
                </Carousel>
                <button
                  className="absolute top-8 right-8 w-8 h-8 rounded-full text-gray-800 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-all"
                  onClick={closeCarousel}
                >
                  <span className="text-4xl">&times;</span>
                </button>
              </div>
            </div>
          )}
        </div>
  );
}