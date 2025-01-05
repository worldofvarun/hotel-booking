import mongoose from "mongoose";


const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        enum: [1,2, 3, 4, 5]
    },
    type: {
        type: String,
        required: true,
    },
    adultCount: {
        type: Number,
        required: true,
    },
    childCount: {
        type: Number,
        required: true,
    },
    facilities: {
        type: [String],
        required: true,
    },
    imagesUrls: {
        type: [String],
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    lastUpdatedAt: {
        type: Date,
        required: true,
    },
    booking: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
    }]

})

export const Hotel = mongoose.model("Hotel", hotelSchema);