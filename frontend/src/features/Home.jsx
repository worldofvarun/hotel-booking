import React, { useEffect, useState } from 'react';
import { useGetAllHotels } from './hotels/hostelAPI.js';
import {Link} from "react-router";

function Home() {
    const { getAllHotels } = useGetAllHotels();
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        if (getAllHotels) {
            setHotels(getAllHotels); // Set hotel data when API call returns
        }
    }, [getAllHotels]);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">

            <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">Latest Destinations</h1>
            <p className="text-center text-gray-600 mb-8">Most recent destinations added by our hosts</p>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {hotels.map((hotel) => (
                    <Link
                        to={`/hotel/${hotel._id}`}
                        key={hotel._id}
                        className="relative bg-gray-100 rounded-lg overflow-hidden shadow-lg"
                    >

                        <div className="h-48">
                            {hotel.imagesUrls[0] ? (
                                <img
                                    src={hotel.imagesUrls[0]}
                                    alt={hotel.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                                    <span className="text-gray-500">No Image Available</span>
                                </div>
                            )}
                        </div>


                        <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white p-4">
                            <h2 className="text-lg font-semibold">{hotel.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>


            {hotels.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                    No hotels available at the moment.
                </div>
            )}
        </div>
    );
}

export default Home;
