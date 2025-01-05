import {login, logout, me, register, validateToken} from "../controllers/authController.js";
import express from "express";
import {verifyToken} from "../middleware/auth.js";


const router = express.Router();

router.get('/me', verifyToken, me);
router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout)
router.get('/verify-token', verifyToken, validateToken);


export default router;