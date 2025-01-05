import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useGetHotelDetails} from "./hostelAPI.js";
import {AiFillStar} from "react-icons/ai";
import {useSelector, useDispatch} from "react-redux";
import DatePicker from "react-datepicker";
import BookingButton from "./Booking.jsx";
import {setDate} from "../../store/slice/search.js";

function DetailHotel() {
    const {id} = useParams();
    const {data: hotelData} = useGetHotelDetails(id);
    const data = useSelector((state) => state.search)
    const dispatch = useDispatch();
    const [guests, setGuests] = useState({
        adultCount: data.adultCount || 1,
        childCount: data.childCount || 0
    })
    const [dates, setDates] = useState({
        checkIn: data.checkIn || new Date(),
        checkOut: data.checkOut || new Date(),
    })
    const maxDate = new Date();

    useEffect(() => {
        dispatch(setDate({checkIn: dates.checkIn.toString(), checkOut: dates.checkOut.toString()}));
    }, [dates])

    maxDate.setFullYear(maxDate.getFullYear() + 1);


    return (
        <div className={'space-y-6 p-5'}>

            <div className={'space-y-2'}>
                <div className={'flex items-center gap-2'}>
                    <span className={'flex'}>
                         {Array.from({length: hotelData?.rating}).map((_, index) =>
                             (
                                 <AiFillStar key={index} className={'fill-yellow-400'}/>
                             ))}
                    </span>

                    <span className={'font-semibold'}>( {hotelData?.type} )</span>
                </div>

                <div>
                    <h1 className={'font-bold text-3xl'}>{hotelData?.name}</h1>
                    <span>{hotelData?.city}, {hotelData?.state}</span>
                </div>


            </div>

            <div className={'grid grid-cols-3 gap-4'}>
                {hotelData?.imagesUrls.map((url, index) => (
                    <div key={index}>
                        <img className={'rounded-md h-full w-full object-cover'} src={url} alt="" />
                    </div>
                ))}
            </div>

            <div className={'grid grid-cols-4 gap-2'}>
                {hotelData?.facilities.map((facility, index) => (
                    <div key={index} className={'border p-3'}>
                        {facility}
                    </div>
                ))}
            </div>

            <div className={'grid lg:grid-cols-[2fr_1fr] gap-10'}>
                <div className={'whitespace-nowrap text-justify'}>{hotelData?.description}</div>
                <div className={'h-fit'}>
                    <div className={'flex flex-col p-4 bg-blue-400 gap-2'}>
                        <h3 className={'text-xl font-bold'}>₹{hotelData?.price}</h3>
                        <div>
                            <DatePicker
                                selected={dates.checkIn}
                                onChange={(date) => setDates((prevState) => ({...prevState, checkIn: date}))}
                                selectsStart
                                startDate={dates.checkIn}
                                endDate={dates.checkOut}
                                minDate={dates.checkIn}
                                maxDate={maxDate}
                                dateFormat="dd-MM-yyyy"
                                placeholderText="Check-in Date"
                                className="min-w-full bg-white p-2 focus:outline-none"
                                wrapperClassName="min-w-full"
                            />
                        </div>
                        <div>
                            <DatePicker
                                selected={dates.checkOut}
                                onChange={(date) => setDates((prevState) => ({...prevState, checkOut: date}))}
                                selectsStart
                                startDate={dates.checkIn}
                                endDate={dates.checkOut}
                                minDate={dates.checkIn}
                                maxDate={maxDate}
                                dateFormat="dd-MM-yyyy"
                                placeholderText="Check-out Date"
                                className="min-w-full bg-white p-2 focus:outline-none"
                                wrapperClassName="min-w-full"
                            />
                        </div>
                        <div className="flex bg-white px-2 py-1 gap-2">
                            <label className="flex items-center">
                                Adults:
                                <input onChange={(event) => setGuests((prevState) => ({
                                    ...prevState,
                                    adultCount: event.target.value
                                }))} className="w-full p-1 focus:outline-none font-bold" type="number" min="1" max="20"
                                       defaultValue={guests.adultCount}/>
                            </label>
                            <label className="flex items-center">
                                Children:
                                <input onChange={(event) => setGuests((prevState) => ({
                                    ...prevState,
                                    childCount: event.target.value
                                }))} className="w-full p-1 focus:outline-none font-bold" type="number" min="0" max="20"
                                       defaultValue={guests.childCount}/>
                            </label>
                        </div>
                        <BookingButton/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailHotel;