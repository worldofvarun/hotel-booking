import React, {useState} from 'react';
import RatingFilter from "./RatingFilter.jsx";
import TypeFilter from "./TypeFilter.jsx";
import FacilitiesFilter from "./FacilitiesFilter.jsx";

function FilterBy({ onFilterChange, searchParams }) {

    function handleRating(event) {
        const selectedRating = event.target.value;
        const updatedRatings = event.target.checked ? [...searchParams.ratings, selectedRating] : searchParams.ratings.filter((star) => star !== selectedRating)
        onFilterChange({ratings: updatedRatings});
    }


    function handleType(event) {
        const selectedType = event.target.value;
        const updatedType = event.target.checked ? [...searchParams.types, selectedType] : searchParams.types.filter((star) => star !== selectedType)
        onFilterChange({types: updatedType});
    }

    function handleFacilities(event) {
        const selectedFacilities = event.target.value;
        const updatedFacilities = event.target.checked ? [...searchParams.facilities, selectedFacilities] : searchParams.facilities.filter((star) => star !== selectedFacilities)
        onFilterChange({facilities: updatedFacilities});
    }


    return (
        <div className={'w-full p-5 rounded'}>
            <div className={'border p-5 rounded space-y-5'}>
                <h2 className={'text-xl font-semibold'}>Filter by:</h2>
                <hr/>
                <RatingFilter onChange={handleRating} ratings={searchParams.ratings}/>
                <hr/>
                <TypeFilter onChange={handleType} types={searchParams.types}/>
                <hr/>
                <FacilitiesFilter onChange={handleFacilities} facilities={searchParams.facilities}/>
            </div>
        </div>
    );
}

export default FilterBy;