import React from 'react';
import {useFormContext} from "react-hook-form";
import Error from "../../../ui/Error.jsx";



function DetailsForm() {
    const {register, formState: {errors}} = useFormContext();
    return (
        <div className={'flex flex-col gap-4'}>
            <h2 className={'text-3xl font-bold'}>Add Hotel</h2>
            <label className={'max-w-[50%] text-gray-700 text-sm font-bold flex-1'}>
                Name
                <input type={"text"} className={"border rounded w-full py-1 px-2 font-normal"} {...register("name")}/>
                {errors.name && <Error message={errors.name.message}/>}
            </label>

            <div className={'flex max-w-[50%] gap-4'}>
                <label className={'max-w-[50%] text-gray-700 text-sm font-bold flex-1'}>
                    City
                    <input type={"text"}
                           className={"border rounded w-full py-1 px-2 font-normal"} {...register("city")}/>
                    {errors.city && <Error message={errors.city.message}/>}
                </label>

                <label className={'max-w-[50%] text-gray-700 text-sm font-bold flex-1'}>
                    State
                    <input type={"text"}
                           className={"border rounded w-full py-1 px-2 font-normal"} {...register("state")}/>
                    {errors.state && <Error message={errors.state.message}/>}
                </label>
            </div>

            <label className={'max-w-[50%] text-gray-700 text-sm font-bold flex-1'}>
                Description
                <textarea rows={9}
                          className={"border rounded w-full py-1 px-2 font-normal"} {...register("description")}/>
                {errors.description && <Error message={errors.description.message}/>}
            </label>

            <label className={'max-w-[50%] text-gray-700 text-sm font-bold flex-1'}>
                Price Per Night
                <input type={'number'}
                       className={"border rounded w-full py-1 px-2 font-normal"} {...register("price")}/>
                {errors.price && <Error message={errors.price.message}/>}
            </label>

            <label className={'max-w-[50%] text-gray-700 text-sm font-bold flex-1'}>
                Rating
                <select className={"border rounded w-full py-1 px-2 font-normal"} {...register("rating")}>
                    <option value="" className="text-sm font-bold">Select as Rating</option>
                    {[1, 2, 3, 4, 5].map((value, index) => (
                        <option key={index} value={value}>{value}</option>
                    ))}
                </select>
                {errors.rating && <Error message={errors.rating.message}/>}
            </label>

        </div>
    );
}

export default DetailsForm;