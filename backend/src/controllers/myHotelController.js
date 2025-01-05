import {catchAsync} from "../../utils/catchAsync.js";
import {Hotel} from "../model/hotel.js";
import {AppError} from "../../utils/appError.js";


export const createNewHotel = catchAsync(async (req, res) => {
    const imageFiles = req.files
    const data = req.body

    const imageUrls = await uploadImage(imageFiles)
    const newHotel = new Hotel({
        name: data.name,
        city: data.city,
        state: data.state,
        description: data.description,
        price: Number(data.price),
        rating: Number(data.rating),
        type: data.type,
        adultCount: Number(data.adultCount),
        childCount: Number(data.childCount),
        facilities: data.facilities,
        imagesUrls: imageUrls,
        lastUpdatedAt: new Date(),
        createdBy: req.userId,
    })


    await newHotel.save();
    return res.status(200).json(newHotel);
})

export const getMyHotels = catchAsync(async (req, res) => {
    const userId = req.userId;
    const data = await Hotel.find({createdBy: userId}).sort({lastUpdatedAt: -1});
    res.json(data)
})

export const getHotelById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const isHotel = await Hotel.findById(id);
    if (!isHotel) {
        throw new AppError('Hotel not found', 404);
    }
    res.status(200).json(isHotel);
})

export const updateHotelById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    updatedData.lastUpdatedAt = new Date();
    const isHotel = await Hotel.findByIdAndUpdate(
        {
            _id: id,
            createdBy: req.userId,
        },
        updatedData,
        {new: true}
    )

    if (!isHotel) {
        throw new AppError('Hotel not found', 404);
    }

    const imagesUrls = await uploadImage(req.files);

    isHotel.imagesUrls = [...imagesUrls, ...(updatedData.imagesUrls || [])];

    await isHotel.save();
    res.status(200).json({})
})

async function uploadImage(imageFile) {
    const uploadPromises = imageFile.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString('base64');
        return `data:${image.mimetype};base64,${b64}`;
})

    return await Promise.all(uploadPromises);
}