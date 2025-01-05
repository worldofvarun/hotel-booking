import express from "express";
import {
    getAllHotels,
    getHotelById,
    payment,
    paymentFailed,
    paymentSuccess,
    searchHotels
} from "../controllers/hotelController.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllHotels)
router.get('/search', searchHotels);
router.get('/:id', getHotelById)
router.post('/payment', verifyToken, payment);
router.post('/payment/success', verifyToken, paymentSuccess);
router.post('/payment/failed', verifyToken, paymentFailed);

export default router;