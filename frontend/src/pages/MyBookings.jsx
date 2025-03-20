import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  Calendar,
  Clock,
  User,
  Phone,
  DollarSign,
  CheckCircle,
  Loader,
  AlertCircle,
  MapPin,
  RotateCcw,
  XCircle,
  FileText,
  X
} from 'lucide-react';
import axios from 'axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [showEarnings, setShowEarnings] = useState(false);
  const [showReceiptPopup, setShowReceiptPopup] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState('');
  const [loadingReceipt, setLoadingReceipt] = useState(false);
  const [receiptError, setReceiptError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        // Adjust the API endpoint based on user role

        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_JAVA_URL}/api/booking?role=${userRole}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.status===200) {
          throw new Error('Failed to fetch bookings');
        }

        const data = await response.data;
        setBookings(data);
        
        // Calculate total earnings for providers
        if (userRole === 'provider') {
          const total = data.reduce((sum, booking) => sum + booking.pricePaid, 0);
          setTotalEarnings(total);
          // Delay showing earnings for animation effect
          setTimeout(() => setShowEarnings(true), 300);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userRole]);

  // Format date to display
  const formatDate = (zonedDateTimeStr) => {
    const date = new Date(zonedDateTimeStr);
    return format(date, 'MMM dd, yyyy');
  };

  // Format time to display
  const formatTime = (zonedDateTimeStr) => {
    const date = new Date(zonedDateTimeStr);
    return format(date, 'h:mm a');
  };

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.originalStartTime);
    const today = new Date();

    if (activeTab === 'upcoming') {
      return bookingDate >= today;
    } else {
      return bookingDate < today;
    }
  });

  // Get status based on dates
  const getStatus = (startTime) => {
    const bookingDate = new Date(startTime);
    const today = new Date();

    if (bookingDate < today) {
      return { text: 'Completed', color: 'bg-green-100 text-green-800' };
    } else {
      const twoDaysAway = new Date();
      twoDaysAway.setDate(today.getDate() + 2);

      if (bookingDate <= twoDaysAway) {
        return { text: 'Soon', color: 'bg-amber-100 text-amber-800' };
      } else {
        return { text: 'Upcoming', color: 'bg-indigo-100 text-indigo-800' };
      }
    }
  };

  const handleViewReceipt = async (paymentId) => {
    try {
      setLoadingReceipt(true);
      setReceiptError(null);
      
      // Open popup first for better UX
      setShowReceiptPopup(true);
      
      // Fetch the receipt
      const response = await axios.get(
        `${import.meta.env.VITE_PAYMENT_SERVER}/api/payments/receipt/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'blob', // Important for PDF handling
        }
      );

      // Create a blob URL for the PDF
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setReceiptUrl(url);
      setLoadingReceipt(false);
    } catch (error) {
      console.error('Error fetching receipt:', error);
      setReceiptError('Failed to load receipt. Please try again.');
      setLoadingReceipt(false);
    }
  };

  const closeReceiptPopup = () => {
    setShowReceiptPopup(false);
    // Revoke the object URL to free up memory
    if (receiptUrl) {
      URL.revokeObjectURL(receiptUrl);
      setReceiptUrl('');
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 mt-15">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Bookings</h1>
        <div className="flex justify-center items-center h-64">
          <Loader className="h-12 w-12 text-indigo-500 animate-spin" />
          <span className="ml-3 text-lg text-gray-600">Loading bookings...</span>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 mt-15">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Bookings</h1>
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
            <p className="text-red-800 font-medium">Failed to load bookings</p>
          </div>
          <p className="mt-2 text-red-700">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 flex items-center"
            onClick={() => window.location.reload()}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {userRole === 'provider' ? 'Client Bookings' : 'My Bookings'}
      </h1>

      {/* Total Earnings Display for Providers */}
      {userRole === 'provider' && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-md p-6 mb-6 overflow-hidden relative">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-emerald-700">Total Earnings</h3>
              <p className={`text-2xl font-bold text-emerald-600 mt-2 transition-all duration-1000 ease-out ${showEarnings ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                ${totalEarnings.toFixed(2)}
              </p>
            </div>
            <div className={`p-4 bg-emerald-100 rounded-full transition-all duration-700 ${showEarnings ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
              <DollarSign className="h-8 w-8 text-emerald-500" />
            </div>
          </div>
          <div className={`h-1 bg-emerald-200 mt-4 rounded-full overflow-hidden transition-all duration-1500 ease-out ${showEarnings ? 'w-full' : 'w-0'}`}>
            <div className="h-full bg-emerald-500 animate-pulse" style={{width: '60%'}}></div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-6 py-3 font-medium text-sm ${activeTab === 'upcoming'
            ? 'border-b-2 border-indigo-500 text-indigo-600'
            : 'text-gray-500 hover:text-gray-800'
            }`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm ${activeTab === 'past'
            ? 'border-b-2 border-indigo-500 text-indigo-600'
            : 'text-gray-500 hover:text-gray-800'
            }`}
          onClick={() => setActiveTab('past')}
        >
          Past
        </button>
      </div>

      {/* Receipt PDF Popup */}
      {showReceiptPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] relative overflow-hidden animate-scaleIn"
            style={{
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-800">Payment Receipt</h3>
              </div>
              <button 
                onClick={closeReceiptPopup}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Close"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            <div className="h-full p-2">
              {loadingReceipt ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500 mb-4"></div>
                  <p className="text-gray-600">Loading receipt...</p>
                </div>
              ) : receiptError ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
                  <p className="text-red-600 mb-2 font-medium">{receiptError}</p>
                  <button
                    onClick={closeReceiptPopup}
                    className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <iframe 
                  src={receiptUrl} 
                  className="w-full h-full rounded animate-fadeIn" 
                  title="Payment Receipt" 
                />
              )}
            </div>
          </div>
        </div>
      )}

      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <Calendar size={48} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No {activeTab} bookings</h3>
          <p className="text-gray-500">
            {activeTab === 'upcoming'
              ? userRole === 'provider'
                ? "You don't have any upcoming client appointments scheduled."
                : "You don't have any upcoming appointments scheduled."
              : userRole === 'provider'
                ? "You haven't had any past client appointments yet."
                : "You haven't had any past appointments yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredBookings.map((booking) => {
            const status = getStatus(booking.originalStartTime);

            return (
              <div 
                key={booking.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Booking Header with Service Type and Status */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-indigo-50 rounded-full">
                      <Calendar className="h-5 w-5 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{booking.service}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${status.color}`}>
                    {status.text === 'Completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {status.text === 'Soon' && <Clock className="w-3 h-3 mr-1" />}
                    {status.text === 'Upcoming' && <Calendar className="w-3 h-3 mr-1" />}
                    {status.text}
                  </span>
                </div>

                {/* Booking Details */}
                <div className="p-6">
                  {/* Horizontal divider with date info */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="h-px bg-gray-200 flex-grow"></div>
                    <div className="px-4 py-1 bg-indigo-50 rounded-full text-sm font-medium text-indigo-700 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(booking.originalStartTime)}
                    </div>
                    <div className="h-px bg-gray-200 flex-grow"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column - Time & Payment */}
                    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start">
                        <div className="bg-white p-2 rounded-full shadow-sm">
                          <Clock className="h-5 w-5 text-indigo-500" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Time</p>
                          <p className="text-sm text-gray-700 font-medium">
                            {formatTime(booking.originalStartTime)} - {formatTime(booking.originalEndTime)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-white p-2 rounded-full shadow-sm">
                          <DollarSign className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Payment</p>
                          <p className="text-sm text-green-700 font-medium">${booking.pricePaid.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-white p-2 rounded-full shadow-sm">
                          <CheckCircle className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Confirmation</p>
                          <p className="text-sm text-blue-700 font-mono">
                            #{booking.transactionId.substring(0, 8)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Provider/User Info */}
                    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                      {userRole === 'provider' ? (
                        <div className="flex items-start">
                          <div className="bg-white p-2 rounded-full shadow-sm">
                            <User className="h-5 w-5 text-purple-500" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">Client</p>
                            <p className="text-sm text-gray-700 font-medium">{booking.userName}</p>
                            <p className="text-sm text-gray-500">{booking.userEmail}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start">
                          <div className="bg-white p-2 rounded-full shadow-sm">
                            <User className="h-5 w-5 text-purple-500" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">Provider</p>
                            <p className="text-sm text-gray-700 font-medium">{booking.providerName}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start">
                        <div className="bg-white p-2 rounded-full shadow-sm">
                          <Phone className="h-5 w-5 text-teal-500" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Contact</p>
                          <p className="text-sm text-teal-700 font-medium">{booking.providerPhoneNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end space-x-3">
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium">
                      Contact
                    </button>
                    <button 
                      onClick={() => handleViewReceipt(booking.paymentIntentId || 'pi_3R4j4p09cpCtmNAq09P6RFzE')}
                      className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors text-sm font-medium flex items-center group"
                    >
                      <FileText className="h-4 w-4 mr-1.5 group-hover:scale-110 transition-transform" />
                      Receipt
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;