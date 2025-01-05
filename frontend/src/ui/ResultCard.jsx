import React from 'react';
import {AiFillStar} from "react-icons/ai";
import {Link} from "react-router";


function ResultCard({result}) {
    return (
        <div className={'grid grid-cols-[2fr_3fr] gap-8 p-8 border rounded'}>
            <div className={'w-full h-[300px]'}>
                <img className={'w-full h-full object-cover'} src={result?.imagesUrls[0]}/>
            </div>
            <div className={'grid grid-rows-[1fr_2fr_1fr]'}>
                <div>
                    <div className={'flex items-center gap-2'}>
                    <span className={'flex '}>
                        {Array.from({length: result?.rating}).map((_, index) => (
                            <AiFillStar key={index} className={'fill-yellow-400'}/>
                        ))}
                    </span>
                        <span>{result?.type}</span>
                    </div>
                    <h3 className={'font-bold text-2xl'}>{result?.name}</h3>
                </div>
                <div className={'line-clamp-3'}>{result?.description}</div>
                <div className={'grid grid-cols-2 items-end whitespace-nowrap'}>
                    <div className={'flex gap-2 items-center'}>
                        {result?.facilities.slice(0,2).map((facility, index) => (
                            <div key={index} className={'bg-gray-300 rounded px-3 py-2'}>{facility}</div>
                        ))}
                        + {result?.facilities.length - 2} more
                    </div>
                    <div className={'flex flex-col items-end gap-1'}>
                        <span className={'font-bold'}>{`₹${result?.price} per night`}</span>
                        <Link className={'flex items-center bg-blue-600 text-white rounded  font-bold p-3 hover:bg-blue-500'} to={`/hotel/${result?._id}`}>View More</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultCard;