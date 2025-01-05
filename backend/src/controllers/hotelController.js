import {catchAsync} from "../../utils/catchAsync.js";
import {Hotel} from "../model/hotel.js";
import {AppError} from "../../utils/appError.js";
import Razorpay from "razorpay";
import {Booking} from "../model/booking.js";
import User from "../model/user.js";


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const createPaymentOrder = async (details) => {
    const options = {
        amount: details.totalPrice * 100, // Amount in paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
    };
    return await razorpay.orders.create(options);
};

const saveBooking = async (details, order) => {
    const booking = new Booking({
        userId: details.userId,
        hotelId: details.hotelId,
        checkIn: new Date(details.checkIn),
        checkOut: new Date(details.checkOut),
        noOfNights: details.noOfNights,
        totalPrice: details.totalPrice,
        orderId: order.id,
        status: order.status,
    });
    return await booking.save();
};

const updateHotelBookings = async (hotel, bookingId) => {
    hotel.booking = [...hotel.booking, bookingId];
    return await hotel.save();
};

export const payment = catchAsync(async (req, res, next) => {
    try {
        const details = req.body;

        // Fetch user and hotel details
        const user = await User.findById(details.userId).select('-password');
        if (!user) return next(new Error('User not found'));

        const hotel = await Hotel.findById(details.hotelId);
        if (!hotel) return next(new Error('Hotel not found'));

        // Create Razorpay order
        const order = await createPaymentOrder(details);
        order.name = details.hotelName;
        order.user = user;

        // Save booking to database
        const booking = await saveBooking(details, order);

        // Update hotel's booking list
        await updateHotelBookings(hotel, booking._id);

        // Send response
        res.status(200).json({ order });
    } catch (error) {
        next(error); // Pass error to global error handler
    }
});

export const paymentSuccess = catchAsync(async (req, res, next) => {
        const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body;
        const booking = await Booking.findOne({orderId: razorpay_order_id});
        booking.paymentId = razorpay_payment_id;
        booking.signature = razorpay_signature;
        booking.status = 'success';
        await booking.save();
        res.json({})
})

export const paymentFailed = catchAsync(async (req, res, next) => {
    const {error: {metadata: { payment_id , order_id}}} = req.body;
    const booking = await Booking.findOne({orderId: order_id});
    if(!booking){
        throw new AppError("Booking not found.", 404);
    }
    booking.paymentId = payment_id;
    booking.status = 'failed';
    await booking.save()
    res.status(200).json({})
})

function constructQuery(query){
    let constructedQuery = {};

    if(query.destination){
        constructedQuery.$or = [
            { city: new RegExp(query.destination, 'i')},
            { state: new RegExp(query.destination, 'i')},
        ]
    }

    if(query.adultCount){
        constructedQuery.adultCount = {
            $gte: parseInt(query.adultCount)
        }
    }

    if(query.childCount){
        constructedQuery.childCount = {
            $gte: parseInt(query.childCount)
        }
    }

    if(query.ratings){
        constructedQuery.rating = {
            $in: Array.isArray(query.ratings) ? query.ratings.map((star) => parseInt(star)) : parseInt(query.ratings)
        }
    }

    if(query.types){
        constructedQuery.type = {
            $in: Array.isArray(query.types) ? query.types : [query.types],
        }
    }

    if(query.facilities){
        constructedQuery.facilities = {
            $all: Array.isArray(query.facilities) ? query.facilities : [query.facilities],
        }
    }
    return constructedQuery;
}

export const getAllHotels = catchAsync(async (req, res) => {
    const hotels = await Hotel.find({});
    res.status(200).json(hotels);
})

export const searchHotels = catchAsync(async (req, res) => {
    const query = constructQuery(req.query);
    let sortingOptions = {}
    switch (req.query.sorting) {
        case 'starrating':
            sortingOptions = {rating: -1};
            break;
        case 'pricePerNightAsc':
            sortingOptions = {price: 1};
            break;
        case 'pricePerNightDes':
            sortingOptions = {price: -1};
    }

    const hotel = await Hotel.find(query).sort(sortingOptions);


    return res.status(200).json(hotel);
})

export const getHotelById = catchAsync(async (req, res) => {
    const {id} = req.params;
    const isHotel = await Hotel.findById(id);

    if(!isHotel){
        throw new AppError(`Hotel Not Found`, 404);
    }

    res.status(200).json(isHotel);
})

