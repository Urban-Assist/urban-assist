import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";
import UserSidenav from "../components/UserSidenav";
import Header from "../components/Header";
const localizer = momentLocalizer(moment);

const ClientBookingPage = () => {
    const [availabilities, setAvailabilities] = useState([]);
    const [selectedDate, setSelectedDate] = useState(moment().toDate());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State for modal visibility
    const navigate = useNavigate();

    // Mock fetch function
    const fetchAvailabilities = async () => {
        setTimeout(() => {
            setAvailabilities([
                {
                    _id: "1",
                    date: moment().format("YYYY-MM-DD"),
                    startTime: "09:00",
                    endTime: "10:00",
                },
                {
                    _id: "2",
                    date: moment().format("YYYY-MM-DD"),
                    startTime: "11:00",
                    endTime: "12:00",
                },
                {
                    _id: "3",
                    date: moment().add(3, "day").format("YYYY-MM-DD"),
                    startTime: "14:00",
                    endTime: "15:00",
                },
                {
                    _id: "4",
                    date: moment().add(6, "day").format("YYYY-MM-DD"),
                    startTime: "14:00",
                    endTime: "15:00",
                },
            ]);
        }, 1000);
    };

    useEffect(() => {
        fetchAvailabilities();
    }, []);

    // Filter availabilities for the selected date
    const getSlotsForSelectedDate = () => {
        return availabilities.filter((slot) =>
            moment(slot.date).isSame(moment(selectedDate), "day"
            ));
    };

    // Handle date selection
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setSelectedSlot(null);
    };

    // Handle slot selection
    const handleSlotSelect = (slot) => {
        setSelectedSlot(slot);
    };

    // Handle booking confirmation
    const handleConfirmBooking = () => {
        if (!selectedSlot) return;

        // Show the confirmation modal
        //setShowConfirmationModal(true);
        navigate("/payment", { state: { selectedSlot } });
    };

    // Close the modal and reset the selected slot
    const closeConfirmationModal = () => {
        setShowConfirmationModal(false);
        setSelectedSlot(null);
    };

    // Custom Date Cell Wrapper
    const CustomDateCellWrapper = ({ children, value }) => {
        const hasSlots = availabilities.some((slot) =>
            moment(slot.date).isSame(moment(value), "day"
            ));

        return (
            <div
                style={{
                    position: "relative",
                    backgroundColor: hasSlots ? "#BBDEFB" : "inherit",
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    borderLeft: "1px solid #D9D9D9",
                }}
            >
                {children}
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center p-4 sm:p-5 lg:p-12 min-h-screen mt-10">

            <div className="flex items-start">

                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold my-6">Service Provider Availability</h1>

                    {/* Layout: Calendar on the left, Slot List on the right */}
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Small Calendar for Date Selection */}
                        <div className="w-fill">
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <Calendar
                                    localizer={localizer}
                                    events={[]}
                                    defaultView="month"
                                    views={["month"]}
                                    onSelectSlot={(slot) => handleDateSelect(slot.start)}
                                    selectable
                                    style={{ height: 400, width: 600 }}
                                    date={selectedDate}
                                    components={{
                                        dateCellWrapper: (props) => <CustomDateCellWrapper {...props} />,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Slot List for Selected Date */}
                        <div className="w-full md:w-2/3">
                            <div className="bg-white p-6 rounded-lg shadow-md h-full overflow-y-auto">
                                <h2 className="text-xl font-bold mb-4">
                                    Available Slots for {moment(selectedDate).format("LL")}
                                </h2>
                                {getSlotsForSelectedDate().length > 0 ? (
                                    <ul className="space-y-2">
                                        {getSlotsForSelectedDate().map((slot) => (
                                            <li
                                                key={slot._id}
                                                onClick={() => handleSlotSelect(slot)}
                                                className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedSlot?._id === slot._id
                                                    ? "bg-blue-100 border-blue-500"
                                                    : "bg-white border-gray-200 hover:bg-gray-50"
                                                    }`}
                                            >
                                                {moment(slot.startTime, "HH:mm").format("h:mm A")} -{" "}
                                                {moment(slot.endTime, "HH:mm").format("h:mm A")}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No slots available for this date.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Selected Slot and Confirm Booking Button */}
                    <div className="mt-6">
                        <h2 className="text-xl font-bold mb-4">Selected Slot</h2>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            {selectedSlot ? (
                                <>
                                    <p className="mb-4">
                                        {moment(selectedSlot.date).format("LL")} -{" "}
                                        {moment(selectedSlot.startTime, "HH:mm").format("h:mm A")} to{" "}
                                        {moment(selectedSlot.endTime, "HH:mm").format("h:mm A")}
                                    </p>
                                    <button
                                        onClick={handleConfirmBooking}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-600"
                                    >
                                        Confirm Booking
                                    </button>
                                </>
                            ) : (
                                <p className="text-gray-500">No slot selected.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientBookingPage;