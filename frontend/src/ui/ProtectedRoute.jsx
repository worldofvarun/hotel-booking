import React from 'react';
import {useAppContext} from "../context/AppContext.jsx";
import {Navigate, Outlet} from "react-router";

function ProtectedRoute() {
    const {isLogged, isLoading} = useAppContext();
    if(!isLoading && !isLogged) {
        return <Navigate to='/' />;
    }

    return <Outlet/>
}

export default ProtectedRoute;