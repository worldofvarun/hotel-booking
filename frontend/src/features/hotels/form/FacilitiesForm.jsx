import React from 'react';
import {useFormContext} from "react-hook-form";
import Error from "../../../ui/Error.jsx";
import {hotelFacilities} from "../hotelConfig.js";

function FacilitiesForm() {
    const {register, formState: {errors}} = useFormContext();
    return (
        <div className={'flex flex-col gap-4'}>
            <h2 className={'font-bold text-3xl'}> Facilities </h2>
            <div className={'grid grid-cols-5 gap-2'}>
                {hotelFacilities.map((facilitie) => (
                    <label key={facilitie} className={'text-gray-700 text-sm flex gap-1 items-center'}>
                        <input type={'checkbox'} value={facilitie} {...register("facilities")}/>
                        {facilitie}
                    </label>
                ))}
            </div>
            {errors.facilities && <Error message={errors.facilities.message} />}
        </div>
    );
}

export default FacilitiesForm;