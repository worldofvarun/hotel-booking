import multer from "multer";
import express from "express";
import {createNewHotel, getHotelById, getMyHotels, updateHotelById} from "../controllers/myHotelController.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5*1024*1024
    }
})

router.post('/', upload.array('imageFiles', 5) , verifyToken,createNewHotel);
router.get('/', verifyToken, getMyHotels);
router.get('/:id', verifyToken, getHotelById);
router.put('/:id', upload.array('imageFiles', 5),  verifyToken, updateHotelById)

export default router;
