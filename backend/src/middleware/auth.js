import {catchAsync} from "../../utils/catchAsync.js";
import {AppError} from "../../utils/appError.js";
import jwt from "jsonwebtoken";

export const verifyToken = catchAsync(async (req, res, next) => {
    const token = req.cookies['AUTH_TOKEN'];
    if (!token) {
        throw new AppError('unauthorized.', 401);
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded._id
        next();
    }catch(err){
        throw new AppError('unauthorized.', 401);
    }
})