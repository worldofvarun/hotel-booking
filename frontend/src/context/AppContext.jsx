import React, {createContext, useContext} from 'react';
import {toast} from "react-toastify";
import {useTokenValidate} from "../features/auth/authAPI.js";

const AppContext = createContext()

export function AppContextProvider({children}) {
    const { isSuccess, isLoading } = useTokenValidate()
    function showToast(toastify) {
        switch (toastify.type) {
            case "SUCCESS":
                toast.success(toastify.message);
                break;
            case "ERROR":
                toast.error(toastify.message);
                break;
            default:
                toast.info(toastify.message);
                break;

        }
    }
    return (
        <AppContext.Provider value={{
            showToast: (message) => showToast(message),
            isLogged: isSuccess,
            isLoading: isLoading,

        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    return context;
}