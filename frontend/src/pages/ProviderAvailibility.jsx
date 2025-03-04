import React, { useState, useEffect, useRef } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ProviderSidenav from "../components/ProviderSidenav";

const localizer = momentLocalizer(moment);

const ProviderAvailibility = () => {
    const [availabilities, setAvailabilities] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [eventToDelete, setEventToDelete] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [date, setDate] = useState(new Date()); // State to track the current date

    // Ref to track the calendar container
    const calendarRef = useRef(null);
    // Ref to track the "Add Availability" button
    const addButtonRef = useRef(null);

    // Mock fetch function to simulate fetching availabilities
    const fetchAvailabilities = async () => {
        // Simulate a delay for fetching data
        setTimeout(() => {
            setAvailabilities([
                {
                    _id: "1",
                    date: moment().format("YYYY-MM-DD"), // Use today's date
                    startTime: "09:00",
                    endTime: "10:00",
                },
                {
                    _id: "2",
                    date: moment().format("YYYY-MM-DD"), // Use today's date
                    startTime: "11:00",
                    endTime: "12:00",
                },
            ]);
        }, 1000);
    };

    useEffect(() => {
        fetchAvailabilities();
    }, []);

    // Convert availabilities to calendar events
    const events = availabilities.map((slot) => ({
        id: slot._id,
        title: "Available",
        start: new Date(`${slot.date}T${slot.startTime}`),
        end: new Date(`${slot.date}T${slot.endTime}`),
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

    // Mock add availability function
    const handleAddAvailability = async () => {
        if (!selectedSlot) return;

        const { start, end } = selectedSlot;
        const date = moment(start).format("YYYY-MM-DD");
        const startTime = moment(start).format("HH:mm");
        const endTime = moment(end).format("HH:mm");

        // Simulate a delay for adding data
        setTimeout(() => {
            const newAvailability = {
                _id: Math.random().toString(36).substr(2, 9), // Generate a random ID
                date,
                startTime,
                endTime,
            };
            setAvailabilities([...availabilities, newAvailability]);
            setSelectedSlot(null); // Clear the selected slot after adding
        }, 1000);
    };

    // Handle event selection (for deletion)
    const handleSelectEvent = (event) => {
        setEventToDelete(event);
        setOpenDeleteDialog(true);
    };

    // Mock delete availability function
    const handleDeleteAvailability = async () => {
        if (!eventToDelete) return;

        // Simulate a delay for deleting data
        setTimeout(() => {
            setAvailabilities(availabilities.filter((item) => item._id !== eventToDelete.id));
            setOpenDeleteDialog(false);
            setEventToDelete(null);
        }, 1000);
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


        <div class="relative h-full min-h-screen font-[sans-serif]">
            <div class="flex items-start">

                <ProviderSidenav />

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
            </div>
        </div>


    );
};

export default ProviderAvailibility;