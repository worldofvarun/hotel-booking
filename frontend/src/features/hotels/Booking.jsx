import React, { useEffect, useState } from "react";
import { useGetHotelDetails, useGetUser } from "./hostelAPI.js";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useAppContext } from "../../context/AppContext.jsx";
import { usePayment } from "./paymentAPI.js";

function BookingButton() {
    const { isLogged, showToast } = useAppContext();
    const navigate = useNavigate();
    const { me } = useGetUser();
    const search = useSelector((state) => state.search);
    const [noOfNights, setNoOfNights] = useState();
    const { id } = useParams();
    const { data: hotel } = useGetHotelDetails(id);
    const { makeBooking, isLoading } = usePayment(navigate);

    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

    useEffect(() => {
        if (search.checkIn && search.checkOut) {
            const nights =
                Math.abs(
                    new Date(search.checkOut).getTime() -
                    new Date(search.checkIn).getTime()
                ) /
                (1000 * 60 * 60 * 24);
            setNoOfNights(Math.ceil(nights));
        }
    }, [search.checkIn, search.checkOut]);

    function handleBookNowClick() {
        if (!isLogged) {
            return navigate("/auth/login");
        }

        if (noOfNights === 0) {
            return showToast({
                type: "INFO",
                message: "Please select the check-in and check-out with at least one day!",
            });
        }

        setIsModalOpen(true); // Open the modal
    }

    function handleConfirmBooking() {
        const payload = {
            userId: me._id,
            hotelId: hotel._id,
            hotelName: hotel.name,
            hotelDescription: hotel.description,
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            noOfNights: noOfNights,
            totalPrice: noOfNights > 0 ? hotel.price * noOfNights : hotel.price,
        };

        makeBooking(payload); // Trigger the payment API
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    return (
        <div>
            <button
                disabled={isLoading}
                onClick={handleBookNowClick}
                className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
            >
                {isLogged ? "Book Now" : "Sign in to Book"}
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Booking Confirmation</h2>

                        {isLoading ? (
                            // Loading Indicator
                            <div className="flex flex-col items-center">
                                <div className="loader border-t-blue-500 border-4 border-gray-200 rounded-full w-12 h-12 animate-spin"></div>
                                <p className="text-gray-700 mt-4">Processing your payment...</p>
                            </div>
                        ) : (
                            // Booking Details
                            <>
                                <p className="text-gray-700 mb-2">
                                    <strong>Hotel Name:</strong> {hotel.name}
                                </p>
                                <p className="text-gray-700 mb-2">
                                    <strong>Check-In:</strong> {new Date(search.checkIn).toLocaleDateString()}
                                </p>
                                <p className="text-gray-700 mb-2">
                                    <strong>Check-Out:</strong> {new Date(search.checkOut).toLocaleDateString()}
                                </p>
                                <p className="text-gray-700 mb-2">
                                    <strong>No. of Nights:</strong> {noOfNights}
                                </p>
                                <p className="text-gray-700 mb-2">
                                    <strong>Total Price:</strong> ₹{noOfNights > 0 ? hotel.price * noOfNights : hotel.price}
                                </p>
                                <div className="flex justify-end space-x-4">
                                    <button
                                        onClick={handleCloseModal}
                                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleConfirmBooking}
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                                    >
                                        Confirm Booking
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookingButton;
