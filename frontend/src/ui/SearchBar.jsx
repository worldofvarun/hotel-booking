import React, {useState} from 'react';
import {ImEarth} from "react-icons/im";
import DatePicker from "react-datepicker";
import {useSelector, useDispatch} from 'react-redux';
import {setSearch, clearSearch} from "../store/slice/search.js";
import {useNavigate} from "react-router";
function SearchBar() {
    const data = useSelector((state) => state.search)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [destination, setDestination] = useState(data.destination || '')
    const [guests, setGuests] = useState({
        adultCount: data.adultCount || 1,
        childCount: data.childCount || 0
    })
    const [dates, setDates] = useState({
        checkIn: data.checkIn || new Date(),
        checkOut: data.checkOut || new Date(),
    })

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    function onSubmit(event){
        event.preventDefault()
        dispatch(setSearch({
            destination: destination,
            adultCount: guests.adultCount,
            childCount: guests.childCount,
            checkIn: dates.checkIn.toString(),
            checkOut: dates.checkOut.toString(),
        }))
        navigate("/search");

    }

    function handleClear(event){
        event.preventDefault()
        setDestination('')
        setGuests({adultCount: 1, childCount: 0})
        setDates({checkIn: new Date(), checkOut: new Date()})
        dispatch(clearSearch())

    }
    return (
        <div className={'lg:container mx-auto'}>
        <form className={'bg-orange-400 rounded -mt-8 p-2'} onSubmit={onSubmit}>
            <div className={'grid grid-cols-2 xl:grid-cols-5 gap-4'}>
                <div className={'flex gap-2 items-center bg-white p-2'}>
                    <ImEarth/>
                    <input value={destination} onChange={(event) => setDestination(event.target.value)} placeholder={'Where are you going?'} className={'text-md w-full focus:outline-none'} required/>
                </div>

                <div className="flex bg-white px-2 py-1 gap-2">
                    <label className="flex items-center">
                        Adults:
                        <input onChange={(event) => setGuests((prevState) => ({...prevState, adultCount: event.target.value}))} className="w-full p-1 focus:outline-none font-bold" type="number" min="1" max="20"
                               defaultValue={guests.adultCount}/>
                    </label>
                    <label className="flex items-center">
                        Children:
                        <input onChange={(event) => setGuests((prevState) => ({...prevState, childCount: event.target.value}))} className="w-full p-1 focus:outline-none font-bold" type="number" min="0" max="20"
                               defaultValue={guests.childCount}/>
                    </label>
                </div>

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
                <div className={'flex gap-1'}>
                    <button type={'submit'} className={'w-2/3 h-full bg-blue-600 text-white font-bold p-2'}>Search
                    </button>
                    <button onClick={handleClear} className={'w-1/3 h-full bg-red-600 text-white font-bold p-2'}>
                        Clear
                    </button>
                </div>
            </div>
        </form>
        </div>
    );
}

export default SearchBar;