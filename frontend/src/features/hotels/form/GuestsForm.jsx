import React from 'react';
import Error from "../../../ui/Error.jsx";
import {useFormContext} from "react-hook-form";

function GuestsForm() {
    const {register, formState: {errors}} = useFormContext();
    return (
        <div className={'flex flex-col gap-4'}>
            <h2 className={'font-bold text-2xl'}>Guests</h2>
            <div className={'flex w-full gap-4 bg-gray-300 p-3'}>
                <label className={'max-w-[50%] text-gray-700 text-sm font-bold flex-1'}>
                    Adult
                    <input type={"number"}
                           className={"border rounded w-full py-1 px-2 font-normal"} {...register("adultCount")}/>
                    {errors.adultCount && <Error message={errors.adultCount.message}/>}
                </label>

                <label className={'max-w-[50%] text-gray-700 text-sm font-bold flex-1'}>
                    Child
                    <input type={"number"}
                           className={"border rounded w-full py-1 px-2 font-normal"} defaultValue={0} {...register("childCount")}/>
                    {errors.childCount && <Error message={errors.childCount.message}/>}
                </label>
            </div>
        </div>
    );
}

export default GuestsForm;