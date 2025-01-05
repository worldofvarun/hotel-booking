import React from 'react';
import {useGetAllBookings} from "./bookingsApi.js";
import {Link} from "react-router";
import {BsBuilding, BsCurrencyRupee, BsMap} from "react-icons/bs";
import {RiHotelBedLine, RiStarLine} from "react-icons/ri";
import {FiBook} from "react-icons/fi";

function MyBookings() {
    const {bookings} = useGetAllBookings();

    return (
        <div className={'space-y-5'}>
            <span className={'flex justify-between items-center'}>
                <h1 className={'text-3xl font-bold'}>My Bookings</h1>
                <Link className={'bg-blue-600 text-white font-bold px-3 py-2 rounded'}
                      to={'/me/my-hotels'}>My Hotel</Link>
            </span>

            <div className={'grid grid-cols-1 gap-6'}>
                {bookings?.map(({totalBookings, hotelDetails, totalRevenue}) => (
                    <div
                        className={'flex flex-col gap-5 justify-between border-slate-300 border  p-6 rounded'}
                        key={hotelDetails._id}>
                        <h2 className={'text-2xl font-bold'}>{hotelDetails.name}</h2>
                        <p>{hotelDetails.description}</p>
                        <div className={'grid grid-cols-5 gap-2'}>

                            <div className={'flex border border-slate-300 rounded p-3 items-center text-sm'}>
                                <FiBook className={'mr-1'}/> Total Bookings: {totalBookings}
                            </div>

                            <div className={'flex border border-slate-300 rounded p-3 items-center text-sm'}>
                                <BsCurrencyRupee className={'mr-1'}/> Total Revenue: <span className={'font-bold ml-1'}> {totalRevenue}</span>
                            </div>

                        </div>
                        <span className={'flex justify-end'}>
                             <Link className={'flex bg-blue-600 text-white font-bold px-3 py-2 rounded'}
                                   to={`/me/my-bookings/${hotelDetails._id}`}>View Details</Link>
                        </span>
                    </div>))}


                    </div>
            </div>);
        }

                export default MyBookings;