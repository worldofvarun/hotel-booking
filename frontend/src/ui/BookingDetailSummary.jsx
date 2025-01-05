import React from 'react';

function BookingDetailSummary({hotel, checkIn, checkOut, nights, adultCount, childCount}) {

    return (
        <div className={'grid gap-4 rounded-lg border border-slate-300 p-5 h-fit'}>
            <h2 className={'text-xl font-bold'}>Your Booking Details</h2>
            <div className={'border-b py-2'}>
                Location:
                <div className={'font-bold'}>
                    {hotel?.city}, {hotel?.state}
                </div>
            </div>
            <div className={'flex border-b py-2 gap-4'}>
                <div>
                    Check-in:
                    <div className={'font-bold'}>
                        {new Date(checkIn).toDateString()}
                    </div>
                </div>
                <div>
                    Check-Out:
                    <div className={'font-bold'}>
                        {new Date(checkOut).toDateString()}
                    </div>
                </div>

            </div>
            <div className={'border-b py-2'}>
                No of Nights stay:
                <div className={'font-bold'}>
                    {nights}
                </div>
            </div>
            <div className={'border-b py-2'}>
                Guests:
                <div className={'font-bold'}>
                    {adultCount} adult & {childCount} child
                </div>
            </div>
        </div>
    );
}

export default BookingDetailSummary;