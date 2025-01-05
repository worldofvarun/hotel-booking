import React from 'react';
import {hotelTypes} from "../hotelConfig.js";

function TypeFilter({onChange, types}) {
    return (
        <div>
            <h3 className={'text-xl font-semibold'}>Hotel Types</h3>
            <div className={'flex flex-col mt-5'}>
                {hotelTypes.map((value, index) => (
                    <label key={index} className={'flex items-center gap-1'}>
                        <input type={'checkbox'} checked={types.includes(value)} value={value}
                               onChange={onChange}/>
                        {value}
                    </label>
                ))}
            </div>
        </div>
    );
}

export default TypeFilter;