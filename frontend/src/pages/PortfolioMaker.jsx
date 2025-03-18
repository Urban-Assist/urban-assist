import { FaStar, FaCamera, FaPhoneAlt, FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaTimes, FaChevronLeft, FaChevronRight, FaEdit, FaSave } from "react-icons/fa";
import { Carousel } from "@material-tailwind/react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/firebase"; // Import Firebase storage
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PortfolioPage() {
  const [isCarouselOpen, setCarouselOpen] = useState(false); // State to manage carousel visibility
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State to track current image
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [formData, setFormData] = useState(null); // State to manage editable data
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  // Initialize with default empty data structure
  const defaultData = {
    firstName: "",
    lastName: "",
    description: "No description available",
    profilePic: "https://via.placeholder.com/150",
    stars: 0,
    address: "Not specified",
    price: "$0",
    workImages: [],
    testimonials: [],
    phoneNumber: "Not provided",
    email: "Not provided",
    linkedin: "#"
    
  };

  const token = localStorage.getItem('token');
  console.log(token);

  useEffect(() => {
    const fetchProviderData = async () => {
      setIsLoading(true);

      // Extract the query parameter "name" from the current URL
      const params = new URLSearchParams(location.search);
      const name = params.get('service'); // Get the value of the "name" query parameter

      if (!name) {
        console.error('No name query parameter found in the URL');
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_JAVA_URL}/api/provider?service=${name}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );
        
        console.log(response);
        if (response.status === 200) 
          setFormData({...defaultData, ...response.data});
        
        
      } catch (error) {
        console.error("Error fetching provider data:", error);
        // If there's an error, still use the default data structure
        if(error.response.status === 404){
          navigate(`/terms-and-conditions?service=${name}`);
        }
       
      } finally {
        setIsLoading(false);
      }
    };

    fetchProviderData();
  }, [navigate]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full mx-auto px-10 py-12 bg-gray-50 min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading portfolio data...</p>
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
        workImages: [...(prev.workImages || []), downloadURL],
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
  const saveChanges = async () => {
    setIsEditing(false);
  
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_JAVA_URL}/api/provider`,
        formData, // Include the request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correctly place headers here
          },
        }
      );
  
      console.log(response);
  
      // Merge the response data with default data to ensure all properties exist
      setFormData({ ...defaultData, ...response.data });
    } catch (error) {
      console.error("Error fetching provider data:", error);
      // If there's an error, still use the default data structure
      setFormData(defaultData);
      if (error.response?.status === 403) {
        navigate("/404");
      }
    } finally {
      setIsLoading(false);
    }
  
    console.log("Updated Data:", formData);
    alert("Changes saved successfully!");
  };

  return (
    <div className="md:w-full lg:w-[60vw] mx-auto px-10 py-12 bg-gray-50 min-h-screen mt-10">
      {/* Edit Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => (isEditing ? saveChanges() : setIsEditing(true))}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
        >
          {isEditing ? <FaSave /> : <FaEdit />}
          <span>{isEditing ? "Save Changes" : "Edit Portfolio"}</span>
        </button>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:space-x-6 mb-10">
        <div className="relative w-28 h-26 rounded-full overflow-hidden shadow-sm mb-4 md:mb-0">
          <img
            src={formData.profilePic || "https://via.placeholder.com/150"}
            alt={formData.firstName || "Profile"}
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
        <div className="text-gray-800 w-full md:w-[90%] text-center md:text-left">
          {isEditing ? (
            <div className="space-y-2">
              
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                placeholder="Add a description"
                className="text-lg text-gray-600 mt-2 p-2 border border-gray-300 rounded-lg w-full max-w-full"
                rows="3"
              />
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-semibold tracking-tight">
                {formData.firstName || ""} {formData.lastName || ""}
                {!formData.firstName && !formData.lastName && "No Name Provided"}
              </h1>
              <p className="text-lg text-gray-600 mt-2">{formData.description || "No description available"}</p>
            </>
          )}
        </div>
      </div>

      {/* Rating, Location, and Price */}
      <div className="flex flex-wrap justify-between mb-8 text-gray-600 gap-4">
        <div className="flex items-center space-x-2">
          <FaStar className="text-yellow-400" />
          <span className="font-medium">{formData.stars || 0} Rating</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaMapMarkerAlt className="text-red-500" />
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleInputChange}
              placeholder="Location"
              className="w-40 p-2 border border-gray-300 rounded-lg"
            />
          ) : (
            <span>{formData.address || "Location not specified"}</span>
          )}
        </div>
        <div className="text-lg font-semibold">
          <span>$</span>
          {isEditing ? (
            <input
              type="text"
              name="price"
              value={formData.price || ""}
              onChange={handleInputChange}
              placeholder="Price"
              className="w-28 p-2 border border-gray-300 rounded-lg"
            />
          ) : (
            formData.price || "Price not set"
          )}
        </div>
      </div>

      {/* Work Samples */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Work Samples</h2>
        {formData.workImages && formData.workImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {formData.workImages.map((image, index) => (
              <div key={index} className="cursor-pointer h-40">
                <img
                  src={image}
                  alt={`work ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
                  onClick={() => openCarousel(index)}
                />
              </div>
            ))}
            {isEditing && (
              <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-40">
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center">
                    <FaCamera className="text-gray-500 text-2xl mb-2" />
                    <span className="text-gray-500">Upload Image</span>
                  </div>
                </label>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white p-8 text-center rounded-lg shadow-sm border border-gray-200">
            {isEditing ? (
              <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-40">
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center">
                    <FaCamera className="text-gray-500 text-2xl mb-2" />
                    <span className="text-gray-500">Upload Your First Work Sample</span>
                  </div>
                </label>
              </div>
            ) : (
              <p className="text-gray-500">No work samples available yet</p>
            )}
          </div>
        )}
      </div>

      {/* Testimonials */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Client Testimonials</h2>
        {formData.testimonials && formData.testimonials.length > 0 ? (
          <div className="space-y-6">
            {formData.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-all"
              >
                <p className="text-lg italic text-gray-700">"{testimonial.feedback || 'No feedback provided'}"</p>
                <p className="mt-4 font-semibold text-gray-800 text-sm">- {testimonial.client || 'Anonymous'}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 bg-white shadow-md rounded-lg text-center">
            <p className="text-gray-500">No testimonials available yet</p>
            {isEditing && (
              <p className="mt-2 text-sm text-blue-500">Testimonials will appear here once clients leave reviews</p>
            )}
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h2>
        <div className="space-y-4 text-gray-600 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <FaPhoneAlt className="text-blue-500" />
            {isEditing ? (
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={handleInputChange}
                placeholder="Phone number"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <span>{formData.phoneNumber || "Phone number not provided"}</span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-green-500" />
            
              <span>{formData.email || "Email not provided"}</span>
            
          </div>
          <div className="flex items-center space-x-4">
            <FaLinkedin className="text-blue-600" />
            {isEditing ? (
              <input
                type="url"
                name="linkedin"
                value={(formData.contactInfo && formData.contactInfo.linkedin) || ""}
                onChange={handleContactInfoChange}
                placeholder="LinkedIn profile URL"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <a
                href={(formData.contactInfo && formData.contactInfo.linkedin) || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {(formData.contactInfo && formData.contactInfo.linkedin) 
                  ? "LinkedIn Profile" 
                  : "No LinkedIn profile provided"}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Modal Carousel */}
      {isCarouselOpen && formData.workImages && formData.workImages.length > 0 && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/80">
          <div className="relative w-full md:w-3/4 lg:w-2/3 bg-transparent p-4 md:p-8 rounded-xl">
            <Carousel className="rounded-xl h-full">
              {formData.workImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`work ${index + 1}`}
                  className="h-full w-full object-contain rounded-xl"
                />
              ))}
            </Carousel>
            <button
              className="absolute top-4 right-4 md:top-8 md:right-8 w-8 h-8 bg-white/80 rounded-full text-gray-800 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-all z-50"
              onClick={closeCarousel}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}