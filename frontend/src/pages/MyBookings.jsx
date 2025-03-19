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
  XCircle
} from 'lucide-react';
import axios from 'axios';

const MyBookings = ({ userRole = 'customer' }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        // Adjust the API endpoint based on user role

        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_JAVA_URL}/api/booking?role=${role}`,
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
              <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Booking Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">{booking.service}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                      {status.text}
                    </span>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column - Date & Time */}
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Date</p>
                          <p className="text-sm text-gray-600">{formatDate(booking.originalStartTime)}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Time</p>
                          <p className="text-sm text-gray-600">
                            {formatTime(booking.originalStartTime)} - {formatTime(booking.originalEndTime)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <DollarSign className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Payment</p>
                          <p className="text-sm text-gray-600">${booking.pricePaid.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Provider/User Info */}
                    <div className="space-y-4">
                      {userRole === 'provider' ? (
                        <div className="flex items-start">
                          <User className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Client</p>
                            <p className="text-sm text-gray-600">{booking.userName}</p>
                            <p className="text-sm text-gray-500">{booking.userEmail}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start">
                          <User className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Provider</p>
                            <p className="text-sm text-gray-600">{booking.providerName}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Contact</p>
                          <p className="text-sm text-gray-600">{booking.providerPhoneNumber}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Confirmation</p>
                          <p className="text-sm text-gray-600">
                            #{booking.transactionId.substring(0, 8)}
                          </p>
                        </div>
                      </div>
                    </div>
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