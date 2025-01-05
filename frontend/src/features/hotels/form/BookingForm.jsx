import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    firstName: yup.string().required('firstName is required'),
    lastName: yup.string().required('lastName is required'),
    email: yup.string().email('it must be a valid email address').required('email is required'),
})
function BookingForm({currentUser, price}) {
    const {register, handleSubmit, reset} = useForm({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        reset(currentUser)
    }, [currentUser])
    return (
        <form className={'grid grid-cols-1 gap-5 rounded-lg border p-4 bg-gray-300'}>
            <span className={'text-3xl font-bold'}>
                Confirm Your Details
            </span>
            <div className={'grid grid-cols-2 gap-6'}>
                <label className={'flex-1'}>
                    First Name:
                    <input type={'text'}
                           className={'w-full border rounded py-2 px-3 text-gray-700 bg-gray-100 focus:outline-0'} {...register('firstName')} />
                </label>
                <label>
                    Last Name:
                    <input
                        type={'text'}
                        className={'w-full border rounded py-2 px-3 text-gray-700 bg-gray-100 focus:outline-0'} {...register('lastName')} />
                </label>
                <label className={'col-span-2'}>
                    Email:
                    <input
                        type={'text'}
                        className={'w-full border rounded py-2 px-3 text-gray-700 bg-gray-100 focus:outline-0'} {...register('email')} />
                </label>
            </div>

            <div className={'flex flex-col gap-2'}>
                <h3 className={'text-2xl font-medium'}>Your Price Summary</h3>
                <div className={'flex flex-col p-2 bg-blue-300 rounded'}>
                    <span className={'font-medium text-lg'}>Totel Cost: {price}</span>
                    <span>includes taxes</span>
                </div>
            </div>

            <div >
                <button>
                    Book now
                </button>
            </div >
        </form>
    );
}

export default BookingForm;