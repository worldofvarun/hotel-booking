import express from 'express';
import cors from  'cors'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import 'dotenv/config'
import {catchAsync} from "./utils/catchAsync.js";
import {AppError} from "./utils/appError.js";
import {globalError} from "./src/controllers/errorController.js";
import auth from "./src/routes/auth.js";
import myHotels from "./src/routes/my-hotels.js";
import hotel from "./src/routes/hotel.js";
import booking from "./src/routes/booking.js";

const app = express();
const port = process.env.PORT || 3000;
const database_uri = process.env.DATABASE;

// --- [middlewares] ---
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- [routes] ---
app.use('/api/auth', auth);
app.use('/api/hotels', hotel)
app.use('/api/my-hotels', myHotels)
app.use('/api/bookings', booking)

app.get('/api/health',catchAsync(async (req, res, next) => {
    res.send({status: 'ok'});
}))

app.use(globalError)

app.listen(port, () => {
    mongoose.connect(database_uri).then(() => {
        console.log('MongoDB Connected successfully.');
    })
    console.log(`Server running on port ${port}`);
})