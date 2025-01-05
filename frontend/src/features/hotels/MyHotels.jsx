import React from 'react';
import {Link} from "react-router";
import {useGetMyHotels} from "./hostelAPI.js";
import {BiBuilding} from "react-icons/bi";
import {BsBuilding, BsCurrencyRupee, BsMap} from "react-icons/bs";
import {RiHotelBedLine, RiHotelLine, RiStarLine} from "react-icons/ri";

function MyHotels() {
    const { data } = useGetMyHotels();
    return (
        <div className={'space-y-5'}>
            <span className={'flex justify-between items-center'}>
                <h1 className={'text-3xl font-bold'}>My Hotels</h1>
                <Link className={'bg-blue-600 text-white font-bold px-3 py-2 rounded'} to={'/me/add-hotel'}>Add Hotel</Link>
            </span>

            <div className={'grid grid-cols-1 gap-6'}>
                {data?.map((hotel) => (
                    <div
                        className={'flex flex-col gap-5 justify-between border-slate-300 border  p-6 rounded'}
                        key={hotel._id}>
                        <h2 className={'text-2xl font-bold'}>{hotel.name}</h2>
                        <p>{hotel.description}</p>
                        <div className={'grid grid-cols-5 gap-2'}>
                            <div className={'flex border border-slate-300 rounded p-3 items-center text-sm'}>
                                <BsMap className={'mr-1'}/> {hotel.city}, {hotel.state}
                            </div>

                            <div className={'flex border border-slate-300 rounded p-3 items-center text-sm'}>
                                <BsBuilding className={'mr-1'}/> {hotel.type}
                            </div>

                            <div className={'flex border border-slate-300 rounded p-3 items-center text-sm'}>
                                <BsCurrencyRupee className={'mr-1'}/> {hotel.price} per Night
                            </div>

                            <div className={'flex border border-slate-300 rounded p-3 items-center text-sm'}>
                                <RiHotelBedLine className={'mr-1'}/> {hotel.adultCount} Adult, {hotel.childCount} child
                            </div>

                            <div className={'flex border border-slate-300 rounded p-3 items-center text-sm'}>
                                <RiStarLine className={'mr-1'}/> {hotel.rating} rating
                            </div>
                        </div>
                        <span className={'flex justify-end'}>
                             <Link className={'flex bg-blue-600 text-white font-bold px-3 py-2 rounded'} to={`/me/edit/${hotel._id}`}>View Details</Link>
                        </span>
                    </div>

                ))}
            </div>
        </div>
    );
}

export default MyHotels;