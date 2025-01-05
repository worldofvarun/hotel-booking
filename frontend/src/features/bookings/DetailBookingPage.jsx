import React, { useState, useEffect } from 'react';
import { useGetBookingsById } from './bookingsApi.js';
import { useParams } from 'react-router';

function DetailBookingPage() {
    const { id } = useParams();
    const { bookings, isLoading } = useGetBookingsById(id);

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredBookings, setFilteredBookings] = useState([]);

    useEffect(() => {
        if (bookings) {
            setFilteredBookings(bookings);
        }
    }, [bookings]);

    useEffect(() => {
        if (bookings) {
            if (!searchQuery) {
                setFilteredBookings(bookings);
            } else {
                const searchLower = searchQuery.toLowerCase();
                const filtered = bookings.filter((booking) => {
                    return (
                        booking.userId.firstName.toLowerCase().includes(searchLower) ||
                        booking.userId.lastName.toLowerCase().includes(searchLower) ||
                        booking.userId.email.toLowerCase().includes(searchLower) ||
                        booking.orderId.toLowerCase().includes(searchLower)
                    );
                });
                setFilteredBookings(filtered);
            }
        }
    }, [searchQuery, bookings]);


    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };


    const highlightText = (text, searchQuery) => {
        if (!searchQuery) return text;
        const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === searchQuery.toLowerCase() ? (
                <span key={index} className="bg-yellow-300">{part}</span>
            ) : (
                part
            )
        );
    };

    if (isLoading) {
        return <div className="text-center text-gray-500 mt-8">Loading...</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Booking Details</h2>


            <div className="mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search by name, email, or order ID"
                    className="p-2 w-full md:w-1/3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>


            {filteredBookings.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">No bookings found...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                        >
                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                                Booking ID: {highlightText(booking._id, searchQuery)}
                            </h3>
                            <p className="text-gray-600">
                                <span className="font-medium">User:</span>{" "}
                                {highlightText(booking.userId.firstName, searchQuery)} {highlightText(booking.userId.lastName, searchQuery)} (
                                {highlightText(booking.userId.email, searchQuery)})
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Order ID:</span>{" "}
                                {highlightText(booking.orderId, searchQuery)}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Check-In:</span>{" "}
                                {new Date(booking.checkIn).toLocaleString()}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Check-Out:</span>{" "}
                                {new Date(booking.checkOut).toLocaleString()}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">No. of Nights:</span>{" "}
                                {booking.noOfNights}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Total Price:</span> ₹
                                {booking.totalPrice}
                            </p>
                            <p
                                className={`font-medium ${
                                    booking.status === "success"
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                Status: {booking.status}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Created At:</span>{" "}
                                {new Date(booking.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DetailBookingPage;
