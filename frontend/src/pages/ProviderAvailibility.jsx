import React, { useState, useEffect, useRef } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios"; // Import Axios


const localizer = momentLocalizer(moment);

const ProviderAvailibility = () => {
    const [availabilities, setAvailabilities] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [eventToDelete, setEventToDelete] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [date, setDate] = useState(new Date()); // State to track the current date
    const token = localStorage.getItem("token"); // Get the token from localStorage

    const params = new URLSearchParams(location.search);
    const service = params.get('service');




    // Ref to track the calendar container
    const calendarRef = useRef(null);
    // Ref to track the "Add Availability" button
    const addButtonRef = useRef(null);

    // Fetch availabilities from the backend using Axios
    const fetchAvailabilities = async () => {
        console.log("use this in the url or else it'll throw error /api/availabilities?service=service name");
        console.log("TODO: intermediate page for selecting service");

        try {
            const response = await axios.get(`http://localhost:8083/api/availabilities?service=${service}`, {

                headers: {
                    Authorization: `Bearer ${token}`,
                },

            });
            setAvailabilities(response.data);
        } catch (error) {
            console.error("Error fetching availabilities:", error);
        }
    };

    useEffect(() => {
        fetchAvailabilities();
    }, []);

    // Convert availabilities to calendar events
    const events = availabilities.map((slot) => ({
        id: slot.id,
        title: "Available",
        start: new Date(slot.startTime),
        end: new Date(slot.endTime),
    }));

    // Add the selected slot to the events array temporarily
    const calendarEvents = selectedSlot
        ? [
            ...events,
            {
                id: "temp-selected-slot", // Temporary ID for the selected slot
                title: "Selected Slot",
                start: selectedSlot.start,
                end: selectedSlot.end,
            },
        ]
        : events;

    // Handle slot selection
    const handleSelectSlot = (slot) => {
        setSelectedSlot({
            start: slot.start,
            end: slot.end,
        });
    };

    // Add availability to the backend using Axios
    const handleAddAvailability = async () => {
        if (!selectedSlot) return;

        const { start, end } = selectedSlot;
        const newAvailability = {
            startTime: start.toISOString(),
            endTime: end.toISOString(),
            service: service,
        };

        try {
            console.log("Added availability:", newAvailability);
            const response = await axios.post("http://localhost:8083/api/availabilities", newAvailability, {

                headers: {
                    Authorization: `Bearer ${token}`,
                },

            });

            setAvailabilities([...availabilities, response.data]);
            setSelectedSlot(null); // Clear the selected slot after adding
        } catch (error) {
            console.error("Error adding availability:", error);
        }
    };

    // Handle event selection (for deletion)
    const handleSelectEvent = (event) => {
        setEventToDelete(event);
        setOpenDeleteDialog(true);
    };

    // Delete availability from the backend using Axios
    const handleDeleteAvailability = async () => {
        if (!eventToDelete) return;

        try {
            await axios.delete(`http://localhost:8083/api/availabilities/${eventToDelete.id}`, {

                headers: {
                    Authorization: `Bearer ${token}`,
                },

            });
            setAvailabilities(availabilities.filter((item) => item.id !== eventToDelete.id));
            setOpenDeleteDialog(false);
            setEventToDelete(null);
        } catch (error) {
            console.error("Error deleting availability:", error);
        }
    };

    // Close delete dialog
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setEventToDelete(null);
    };

    // Detect clicks outside the calendar to clear the selected slot
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(event.target) &&
                addButtonRef.current &&
                !addButtonRef.current.contains(event.target)
            ) {
                setSelectedSlot(null); // Clear the selected slot
            }
        };

        // Add event listener to detect clicks outside the calendar
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup the event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle navigation (e.g., moving to the next/previous week)
    const handleNavigate = (newDate) => {
        setDate(newDate); // Update the date state
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Add Your Availability</h1>

            {/* Calendar */}
            <div className="h-[600px]" ref={calendarRef}>
                <Calendar
                    localizer={localizer}
                    events={calendarEvents} // Use the updated events array
                    selectable
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    defaultView="week"
                    min={new Date(0, 0, 0, 9, 0, 0)} // Start at 9 AM
                    max={new Date(0, 0, 0, 17, 0, 0)} // End at 5 PM
                    date={date} // Pass the current date to the calendar
                    onNavigate={handleNavigate} // Handle navigation
                />
            </div>

            {/* Add Availability Button */}
            {selectedSlot && (
                <div className="mt-4">
                    <p className="mb-2">
                        Selected Slot: {moment(selectedSlot.start).format("LLL")} -{" "}
                        {moment(selectedSlot.end).format("LT")}
                    </p>
                    <button
                        ref={addButtonRef}
                        onClick={handleAddAvailability}
                        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                    >
                        Add Availability
                    </button>
                </div>
            )}

            {/* Custom Delete Confirmation Dialog */}
            {openDeleteDialog && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Delete Availability</h2>
                        <p className="mb-4">Are you sure you want to delete this availability?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleCloseDeleteDialog}
                                className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAvailability}
                                className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProviderAvailibility;