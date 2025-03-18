import React, { useState, useEffect, useRef } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";

const localizer = momentLocalizer(moment);

// Custom calendar event styling
const eventStyleGetter = (event) => {
  const isTemporary = event.id === "temp-selected-slot";
  return {
    style: {
      backgroundColor: isTemporary ? "#3b82f6" : "#4f46e5",
      borderRadius: "4px",
      opacity: isTemporary ? 0.7 : 0.9,
      color: "white",
      border: "none",
      fontWeight: "500",
      boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    }
  };
};

const ProviderAvailability = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("week");
  const [serviceInfo, setServiceInfo] = useState(null);
  
  const calendarRef = useRef(null);
  const addButtonRef = useRef(null);
  
  // Get token and service from URL
  const token = localStorage.getItem("token");
  const params = new URLSearchParams(window.location.search);
  const service = params.get('service');

  // Fetch service info (this would be added to your API)
  const fetchServiceInfo = async () => {
    if (!service) return;
    
    try {
      // You would implement this endpoint in your backend
      const response = await axios.get(`http://localhost:8083/api/services/${encodeURIComponent(service)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServiceInfo(response.data);
    } catch (error) {
      console.error("Error fetching service info:", error);
      // For now we'll mock some data
      setServiceInfo({
        name: service,
        duration: 60, // in minutes
        color: "#3b82f6"
      });
    }
  };

  // Fetch availabilities from the backend
  const fetchAvailabilities = async () => {
    setIsLoading(true);
    setError(null);
    
    if (!service) {
      setError("No service selected");
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await axios.post(
        `http://localhost:8083/api/availabilities/get`,
        { service: service },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      setAvailabilities(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching availabilities:", error);
      setError("Failed to load availability data");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailabilities();
    fetchServiceInfo();
  }, [service]);

  // Convert availabilities to calendar events
  const events = availabilities.map((slot) => ({
    id: slot.id,
    title: "Available",
    start: new Date(slot.startTime),
    end: new Date(slot.endTime),
  }));

  // Add the selected slot to events
  const calendarEvents = selectedSlot
    ? [
        ...events,
        {
          id: "temp-selected-slot",
          title: "New Availability",
          start: selectedSlot.start,
          end: selectedSlot.end,
        },
      ]
    : events;

  // Handle slot selection
  const handleSelectSlot = (slot) => {
    // Create time slots in 15-minute increments
    const roundedStart = new Date(Math.ceil(slot.start.getTime() / (15 * 60000)) * (15 * 60000));
    
    // Default to 1 hour or service duration
    const durationMinutes = serviceInfo?.duration || 60;
    const roundedEnd = new Date(roundedStart.getTime() + durationMinutes * 60000);
    
    setSelectedSlot({
      start: roundedStart,
      end: roundedEnd,
    });
  };

  // Add availability to the backend
  const handleAddAvailability = async () => {
    if (!selectedSlot) return;

    const { start, end } = selectedSlot;
    const newAvailability = {
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      service: service,
    };

    try {
      const response = await axios.post(
        "http://localhost:8083/api/availabilities", 
        newAvailability, 
        { headers: { Authorization: `Bearer ${token}` }}
      );

      setAvailabilities([...availabilities, response.data]);
      setSelectedSlot(null);
      
      // Show success toast (would implement with a toast library)
      console.log("Availability added successfully");
    } catch (error) {
      console.error("Error adding availability:", error);
      // Show error toast
    }
  };

  // Handle event selection (for deletion)
  const handleSelectEvent = (event) => {
    setEventToDelete(event);
    setOpenDeleteDialog(true);
  };

  // Delete availability from the backend
  const handleDeleteAvailability = async () => {
    if (!eventToDelete) return;

    try {
      await axios.delete(
        `http://localhost:8083/api/availabilities/${eventToDelete.id}`, 
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      setAvailabilities(availabilities.filter((item) => item.id !== eventToDelete.id));
      setOpenDeleteDialog(false);
      setEventToDelete(null);
      
      // Show success toast
      console.log("Availability deleted successfully");
    } catch (error) {
      console.error("Error deleting availability:", error);
      // Show error toast
    }
  };

  // Close delete dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setEventToDelete(null);
  };

  // Detect clicks outside the calendar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        addButtonRef.current &&
        !addButtonRef.current.contains(event.target)
      ) {
        setSelectedSlot(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle calendar navigation
  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  // Handle view change
  const handleViewChange = (newView) => {
    setView(newView);
  };

  // Custom calendar components
  const CustomToolbar = (toolbar) => {
    const goToBack = () => {
      toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
      toolbar.onNavigate('NEXT');
    };

    const goToCurrent = () => {
      toolbar.onNavigate('TODAY');
    };

    const viewOptions = [
      { label: "Day", value: "day" },
      { label: "Week", value: "week" },
      { label: "Month", value: "month" },
    ];

    const currentMonthLabel = () => {
      const date = toolbar.date;
      return moment(date).format('MMMM YYYY');
    };

    return (
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 p-2 bg-white rounded-lg shadow-sm">
        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          <button
            onClick={goToBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
            
          <button
            onClick={goToCurrent}
            className="px-4 py-1.5 bg-blue-50 text-indigo-500 rounded-md hover:bg-blue-100 transition-colors font-medium"
          >
            Today
          </button>
            
          <button
            onClick={goToNext}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
            
          <span className="text-lg font-medium ml-2">
            {currentMonthLabel()}
          </span>
        </div>

        <div className="inline-flex rounded-md shadow-sm">
          {viewOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => toolbar.onView(option.value)}
              className={`px-4 py-2 text-sm font-medium ${
                toolbar.view === option.value
                  ? "bg-indigo-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } ${
                option.value === "day"
                  ? "rounded-l-lg"
                  : option.value === "month"
                  ? "rounded-r-lg"
                  : ""
              } border border-gray-300`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-700">
          <h3 className="font-semibold">Error</h3>
          <p>{error}</p>
          <button 
            onClick={fetchAvailabilities} 
            className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-md transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 mt-15">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-100 via-pink-100 to-yellow-100 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold  mb-2">
                Manage Your Availability
              </h1>
              {serviceInfo && (
                <p>
                  Service: <span className="font-semibold">{serviceInfo.name}</span>
                </p>
              )}
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>Click and drag to add new slots</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="p-4 md:p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <div className="bg-white rounded-lg" ref={calendarRef}>
              <Calendar
                localizer={localizer}
                events={calendarEvents}
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                defaultView="week"
                view={view}
                onView={handleViewChange}
                min={new Date(0, 0, 0, 7, 0, 0)} // Start at 7 AM
                max={new Date(0, 0, 0, 21, 0, 0)} // End at 9 PM
                date={date}
                onNavigate={handleNavigate}
                eventPropGetter={eventStyleGetter}
                components={{
                  toolbar: CustomToolbar,
                }}
                className="h-screen max-h-[700px]"
                dayLayoutAlgorithm="no-overlap"
                step={15}
                timeslots={4}
              />
            </div>
          )}

          {/* Selection Info */}
          {selectedSlot && (
            <div className="mt-6 p-5 bg-blue-50 rounded-lg border border-blue-100 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                New Availability Slot
              </h3>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium">
                      {moment(selectedSlot.start).format("dddd, MMMM D, YYYY")}
                    </p>
                    <p className="font-medium">
                      {moment(selectedSlot.start).format("h:mm A")} - {moment(selectedSlot.end).format("h:mm A")}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedSlot(null)}
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    ref={addButtonRef}
                    onClick={handleAddAvailability}
                    className="px-5 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add Availability
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {openDeleteDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in">
            <div className="flex items-center mb-4 text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <h3 className="text-xl font-semibold">Delete Availability</h3>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-2">Are you sure you want to delete this availability slot?</p>
              {eventToDelete && (
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                  <p className="font-medium">
                    {moment(eventToDelete.start).format("dddd, MMMM D, YYYY")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {moment(eventToDelete.start).format("h:mm A")} - {moment(eventToDelete.end).format("h:mm A")}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCloseDeleteDialog}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAvailability}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderAvailability;