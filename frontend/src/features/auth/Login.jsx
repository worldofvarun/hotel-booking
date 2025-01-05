import React from 'react';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import Error from "../../ui/Error.jsx";
import {useLogin} from "./authAPI.js";
import {yupResolver} from "@hookform/resolvers/yup";
import {Link} from "react-router";


const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required").min(8, "min 8 char password is required"),
})

function Login() {
    const {userLogin, isSuccess} = useLogin();
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    async function onSubmit(data) {
         await userLogin(data)
    }
    return (
        <form className={'flex flex-col gap-5 '} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={'text-3xl font-bold'}> Login to your account</h2>
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

            <span className={'flex justify-between items-center'}>
                <span className={'text-sm'}>
                    Not Registered?
                    <Link to="/auth/register" className={'underline pl-1'}>Create an account here?</Link>
                </span>
                <button type={'submit'}
                        className={"bg-blue-600 text-white font-bold px-3 py-2 rounded hover:bg-blue-500 text-xl"}>Login</button>
            </span>
        </form>
    );
}

export default Login;