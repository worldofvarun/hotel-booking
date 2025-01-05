import {useMutation, useQueryClient} from '@tanstack/react-query'
import {useNavigate} from "react-router";
import {useAppContext} from "../../context/AppContext.jsx";
import {useQuery} from "@tanstack/react-query"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useLogin = () => {
    const queryClient = useQueryClient();
    const {showToast} = useAppContext();
    const navigate = useNavigate();

    const login = async (formData) => {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })

        if(!response.ok){
            const error = await response.json();
            throw new Error(error.message);
        }

        return response.json()
    }

    const {mutateAsync: userLogin, isSuccess} = useMutation(login, {
        onSuccess: () => {
            queryClient.invalidateQueries(['token validation'])
            showToast({type: 'SUCCESS', message: 'Login successfully'});
            navigate(-1)
        },
        onError: error => {
            showToast({type: 'ERROR', message: error.message});
        }
    });

    return {userLogin};
}

export const useCreateUser =  () => {
    const {showToast} = useAppContext();
    const navigate = useNavigate();
    const register = async (formData) => {

        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(formData)
        })


        if(!response.ok){
            const error = await response.json();
            throw new Error(error.message);
        }

        return response.json()
    }

    const {mutateAsync: createUser, isLoading} = useMutation(register, {
        onSuccess: () => {
            showToast({type:"SUCCESS", message:"User registration successfully."})
            navigate('/');
        },
        onError: (error) => {
            showToast({type:"ERROR", message:error.message});
        },
    });




    return {createUser, isLoading};

}

export const useLogout =  () => {
    const queryClient = useQueryClient();
    const {showToast} = useAppContext();
    const navigate = useNavigate();

    const logOut = async () => {
        const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if(!response.ok){
            const error = await response.json();
            throw new Error(error.message);
        }

        return response.json()
    }

    const {mutateAsync: userLogout,} = useMutation(logOut, {
        onSuccess: () => {
            queryClient.invalidateQueries(["token validation"])
            showToast({type:"SUCCESS", message:"Logout successfully."})

        },
        onError: (error) => {
            showToast({type:"ERROR", message:error.message});
        }
    });

    return {userLogout};
}

export const useTokenValidate = () => {
    const tokenValidation = async () => {
        const response = await fetch(`${API_BASE_URL}/api/auth/verify-token`, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(!response.ok){
            const error = await response.json();
            throw new Error(error.message);
        }

        return response.json()
    }

    const {isSuccess, isLoading} = useQuery({
        queryKey: ["token validation"],
        queryFn: tokenValidation,
        retry: false,
    })

    return {isSuccess, isLoading};


}