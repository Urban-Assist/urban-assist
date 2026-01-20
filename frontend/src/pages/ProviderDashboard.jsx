import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUserEmail } from '../utils/auth';
import LoadAnimation from '../components/LoadAnimation';

const USER_MGMT_URL = import.meta.env.VITE_USER_MGMT_URL || 'http://localhost:8083';

function ProviderDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('PENDING');

  useEffect(() => {
    const checkProfileAndFetchData = async () => {
      try {
        const email = getUserEmail();
        if (!email) {
          navigate('/login');
          return;
        }

        // Check if provider profile exists
        const profileResponse = await axios.get(`${USER_MGMT_URL}/api/providers/email/${email}`);

        if (!profileResponse.data || !profileResponse.data.service) {
          // Profile doesn't exist or is incomplete, redirect to setup
          navigate('/provider-setup');
          return;
        }

        setProfile(profileResponse.data);

        // Fetch bookings for this provider
        const token = localStorage.getItem('token');
        const bookingsResponse = await axios.get(
          `${USER_MGMT_URL}/api/bookings/provider/${email}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        setBookings(bookingsResponse.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response?.status === 404) {
          // Profile not found, redirect to setup
          navigate('/provider-setup');
        }
      } finally {
        setLoading(false);
      }
    };

    checkProfileAndFetchData();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      const email = getUserEmail();
      const token = localStorage.getItem('token');
      const bookingsResponse = await axios.get(
        `${USER_MGMT_URL}/api/bookings/provider/${email}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setBookings(bookingsResponse.data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${USER_MGMT_URL}/api/bookings/${bookingId}/status`,
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      // Refresh bookings after update
      await fetchBookings();
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('Failed to update booking status');
    }
  };

  const filteredBookings = activeTab === 'ALL'
    ? bookings
    : bookings.filter(booking => booking.status === activeTab);

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-blue-100 text-blue-800',
      COMPLETED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <LoadAnimation />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Unable to load profile</p>
          <button
            onClick={() => navigate('/provider-setup')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Complete Profile Setup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome, {profile?.firstName} {profile?.lastName}!
              </h1>
              <p className="text-gray-600 mb-4">{profile?.service} Service Provider</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div>
                  <span className="font-semibold">Rate:</span> {profile?.price}
                </div>
                <div>
                  <span className="font-semibold">Experience:</span> {profile?.experience} years
                </div>
                {profile?.certified && (
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-green-600">✓ Certified</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => navigate('/provider-setup')}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Bookings</h3>
            <p className="text-3xl font-bold text-gray-800">{bookings.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {bookings.filter(b => b.status === 'PENDING').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Confirmed</h3>
            <p className="text-3xl font-bold text-blue-600">
              {bookings.filter(b => b.status === 'CONFIRMED').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Completed</h3>
            <p className="text-3xl font-bold text-green-600">
              {bookings.filter(b => b.status === 'COMPLETED').length}
            </p>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Bookings</h2>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 border-b">
            {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium transition-colors ${activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No {activeTab.toLowerCase()} bookings found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map(booking => (
                <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{booking.serviceType}</h3>
                      <p className="text-gray-600">Customer: {booking.userName}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Date:</span>
                      <p className="text-gray-600">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Time:</span>
                      <p className="text-gray-600">{booking.startTime} - {booking.endTime}</p>
                    </div>
                    {booking.notes && (
                      <div className="col-span-2">
                        <span className="font-medium text-gray-700">Notes:</span>
                        <p className="text-gray-600">{booking.notes}</p>
                      </div>
                    )}
                    <div className="col-span-2">
                      <span className="font-medium text-gray-700">Booked:</span>
                      <p className="text-gray-600">{new Date(booking.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex gap-2">
                    {booking.status === 'PENDING' && (
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'CONFIRMED')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Confirm Booking
                      </button>
                    )}
                    {booking.status === 'CONFIRMED' && (
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'COMPLETED')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        Mark as Completed
                      </button>
                    )}
                    {(booking.status === 'PENDING' || booking.status === 'CONFIRMED') && (
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'CANCELLED')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProviderDashboard;