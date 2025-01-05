import React from 'react';
import ManageForm from "./form/ManageForm.jsx";
import {useParams} from "react-router";
import {useGetHotelById, useUpdateHotelById} from "./hostelAPI.js";

function EditHotel() {
    const {id} = useParams();
    const { data: hotelData } = useGetHotelById(id)
    const { updateHotelById, isLoading } = useUpdateHotelById(id);


    return (
        <ManageForm hotelData={hotelData} onSave={updateHotelById} isLoading={isLoading}/>
    );
}

export default EditHotel;