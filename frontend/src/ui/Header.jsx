import React from 'react';
import {Link} from "react-router";
import {useAppContext} from "../context/AppContext.jsx";
import {useLogout} from "../features/auth/authAPI.js";

function Header() {
    const {isLogged, isLoading} = useAppContext();
    const {userLogout} = useLogout();
    return (
        <div className={'bg-blue-800 flex py-6'}>
            <div className={'lg:container mx-auto flex justify-between '}>
                <span className={'text-3xl text-white font-bold tracking-tighter'}>
                    <Link to={'/'}>MernHoliday.com</Link>
                </span>

                <span className={'flex space-x-2'}>
                    {isLoading ? '' :
                        isLogged ?
                            (<>
                                <Link
                                    className={'text-white font-bold px-3 py-2 hover:bg-blue-500 hover:rounded hover:shadow-lg'}
                                    to={'/me/my-bookings'}>My Booking</Link>
                                <Link
                                    className={'text-white font-bold px-3 py-2 hover:bg-blue-500 hover:rounded hover:shadow-lg'}
                                    to={'/me/my-hotels'}>My Hotels</Link>
                                <Link
                                    className={'text-white font-bold px-3 py-2 hover:bg-blue-500 hover:rounded hover:shadow-lg'}
                                    to={'/me/add-hotel'}>Add Hotel</Link>
                                <button onClick={async () => await userLogout()} className={"text-blue-600 bg-white font-bold px-3 py-2 rounded"}>
                                    Sign Out
                                </button>

                            </>) :
                            (<Link
                                className={'flex items-center bg-white text-blue-600 rounded  font-bold px-3 hover:bg-gray-100'}
                                to={'/auth/login'}>Sign in</Link>)}
                </span>
            </div>
        </div>
    );
}

export default Header;