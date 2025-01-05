import React from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import Error from "../../ui/Error.jsx";
import {useCreateUser} from "./authAPI.js";
import {useAppContext} from "../../context/AppContext.jsx";
import {Link} from "react-router";

//  email, password, confirmPassword, firstName, lastName
const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required").min(8, "min 8 char password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords don't match"),
})

function Register() {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const {createUser, isLoading} = useCreateUser();


    async function onSubmit(data) {
        await createUser(data)
    }
    return (
        <form className={'flex flex-col gap-5 '} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={'text-3xl font-bold'}> Create an Account</h2>
            <div className={'flex flex-col md:flex-row gap-5'}>
                <label className={'text-gray-700 text-sm font-bold flex-1'}>
                    First Name
                    <input className={"border rounded w-full py-1 px-2 font-normal"} {...register("firstName")} />
                    {errors.firstName && <Error message={errors.firstName.message}/>}
                </label>

                <label className={'text-gray-700 text-sm font-bold flex-1'}>
                    Last Name
                    <input className={"border rounded w-full py-1 px-2 font-normal"} {...register("lastName")}/>
                    {errors.lastName && <Error message={errors.lastName.message}/>}
                </label>
            </div>

            <label className={'text-gray-700 text-sm font-bold flex-1'}>
                Email
                <input type={"email"} className={"border rounded w-full py-1 px-2 font-normal"} {...register("email")}/>
                {errors.email && <Error message={errors.email.message}/>}
            </label>

            <label className={'text-gray-700 text-sm font-bold flex-1'}>
                password
                <input type={"password"}
                       className={"border rounded w-full py-1 px-2 font-normal"} {...register("password")}/>
                {errors.password && <Error message={errors.password.message}/>}
            </label>

            <label className={'text-gray-700 text-sm font-bold flex-1'}>
                confirm password
                <input type={"password"}
                       className={"border rounded w-full py-1 px-2 font-normal"} {...register("confirmPassword")}/>
                {errors.confirmPassword && <Error message={errors.confirmPassword.message}/>}
            </label>
            <span className={'flex justify-between items-center'}>
                <span className={'text-sm'}>Already have account? <Link className={'underline'} to={'/auth/login'}>Login here</Link></span>
                <button type={'submit'} className={"bg-blue-600 text-white font-bold px-3 py-2 rounded hover:bg-blue-500 text-xl"}>Create account</button>
            </span>
        </form>
    );
}

export default Register;