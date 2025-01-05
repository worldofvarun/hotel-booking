import React from 'react';
import ResultCard from "./ResultCard.jsx";

function SearchResults({results, destination, onChange}) {
    return (
        <div className={'w-full px-5'}>
            <div className={'flex justify-between items-center'}>
                <h3 className={'font-bold text-xl'}>{results?.length} Hotels in {destination}</h3>
                <select className={'border rounded p-2'} onChange={(event) => onChange({sorting: event.target.value})}>
                    <option>Sort by</option>
                    <option value={'starrating'}>Star Rating</option>
                    <option value={'pricePerNightAsc'}>price per night(low to high)</option>
                    <option value={'pricePerNightDes'}>price per night(high to low)</option>
                </select>
            </div>

            <div className={'mt-4 flex flex-col gap-5'}>
                {results?.map((result, index) => (
                    <ResultCard result={result} key={index} />
                ))}
            </div>

        </div>
    );
}

export default SearchResults;