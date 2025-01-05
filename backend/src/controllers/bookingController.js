import {catchAsync} from "../../utils/catchAsync.js";
import {Booking} from "../model/booking.js";
import {Hotel} from "../model/hotel.js";


export const getAllBookings = catchAsync(async (req, res) => {
    const hotelIds = await Hotel.find({ createdBy: req.userId }).distinct("_id");

    const bookings = await Booking.aggregate([
        {
            $match: {
                hotelId: { $in: hotelIds }, // Match hotelId from the list of hotels created by the user
                status: "success", // Match only successful bookings
            },
        },
        {
            $group: {
                _id: "$hotelId",
                totalBookings: { $sum: 1 },
                totalRevenue: { $sum: "$totalPrice" },
                bookings: { $push: "$$ROOT" },
            },
        },
        {
            $lookup: {
                from: "hotels",
                localField: "_id",
                foreignField: "_id",
                as: "hotelDetails",
            },
        },
        {
            $unwind: "$hotelDetails",
        },
    ]);

    res.status(200).send(bookings);
})

export const getBookingById = catchAsync(async (req, res) => {
    const booking = await Booking.find({hotelId: req.params.id}).populate("userId");
    res.status(200).send(booking);
})

