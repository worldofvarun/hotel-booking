import {catchAsync} from "../../utils/catchAsync.js";
import jwt from 'jsonwebtoken';
import user from "../model/user.js";
import {AppError} from "../../utils/appError.js";
import bcrypt from "bcrypt";
import User from "../model/user.js";

async function createJWToken(userId){
     return jwt.sign({_id: userId}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

}

export const me = catchAsync(async (req, res) => {
    const userId = req.userId;
    const user = await User.findById(userId).select('-password');
    if (!user) {
        throw new AppError("User does not exist", 404);
    }

    res.status(200).json(user);
})

export const login = catchAsync(async (req, res) => {

     const {email, password} = req.body;
     if(!email || !password){
         throw new AppError("please enter a email and password", 400);
     }
     const isUser = await user.findOne({email: email}).select("+password");
     if(!isUser){
         throw new AppError("user not found", 404);
     }


     const isMatch = await bcrypt.compare(password, isUser.password);
     if(!isMatch){
         throw new AppError("password not match", 404);
     }

     const authToken =  await createJWToken(isUser._id)
     res.cookie("AUTH_TOKEN", authToken);
     return res.status(200).json({})
})

export const register = catchAsync(async (req, res, next) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    const newUser = await user.create({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        firstName: firstName,
        lastName: lastName,
    })
    const authToken = await createJWToken(newUser._id);
    res.cookie('AUTH_TOKEN', authToken);
    res.status(201).json({
        status: 'success',
        data: {
            user: newUser,
        }
    })
})

export const logout = catchAsync(async (req, res) => {
    res.cookie('AUTH_TOKEN', null, {
        expires: new Date(0)
    });
    res.status(200).json({})
})

export const validateToken = catchAsync(async (req, res, next) => {
    res.status(200).json({userId: req.userId});
})