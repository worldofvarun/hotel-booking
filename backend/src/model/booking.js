import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    hotelId: {type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true},
    orderId: {type: String, required: true},
    paymentId: {type: String},
    signature: {type: String},
    bookingDate: {type: Date,},
    checkIn: {type: Date, required: true},
    checkOut: {type: Date, required: true},
    createdAt: {type: Date, default: Date.now, required: true},
    noOfNights: {type: Number, required: true},
    totalPrice: {type: Number, required: true},
    status: {type: String, required: true, enum: ['success', 'failed', 'created'],}
})

export const Booking = mongoose.model("Booking", bookingSchema);