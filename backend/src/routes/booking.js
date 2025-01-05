import express from 'express';
import {verifyToken} from "../middleware/auth.js";
import {getAllBookings, getBookingById} from "../controllers/bookingController.js";

const router = express.Router();

router.get('/', verifyToken, getAllBookings);
router.get('/:id', verifyToken, getBookingById);

export default router;