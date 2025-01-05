import React from 'react';
import {hotelFacilities} from "../hotelConfig.js";


function FacilitiesFilter({onChange, facilities}) {
    return (
        <div>
            <h3 className={'text-xl font-semibold'}>Facilities</h3>
            <div className={'flex flex-col mt-5'}>
                {hotelFacilities.map((value, index) => (
                    <label key={index} className={'flex items-center gap-1'}>
                        <input type={'checkbox'} checked={facilities.includes(value)} value={value}
                               onChange={onChange}/>
                        {value}
                    </label>
                ))}
            </div>
        </div>
    );
}

export default FacilitiesFilter;