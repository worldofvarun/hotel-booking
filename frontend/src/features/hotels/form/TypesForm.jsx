import React from 'react';
import {hotelTypes} from "../hotelConfig.js";
import {useFormContext} from "react-hook-form";
import Error from "../../../ui/Error.jsx";

function TypesForm() {
    const {register, watch, formState: {errors}} = useFormContext();
    return (
        <div className={'flex flex-col gap-4'}>
            <h2 className={'text-3xl font-bold'}>Types</h2>
            <div className={'grid grid-cols-5 gap-2'}>
                {hotelTypes.map(type => (
                    <label key={type} className={`cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${watch('type') === type ? 'bg-blue-300' : 'bg-gray-300'}` }>
                        <input type="radio" name="type" className="hidden" value={type} {...register('type')}/>
                        <span>{type}</span>
                    </label>
                ))}
            </div>
            {errors.type && <Error message={errors.type.message}/>}
        </div>
    );
}

export default TypesForm;