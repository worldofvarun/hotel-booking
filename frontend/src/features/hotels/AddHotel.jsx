import React from 'react';
import {useCreateHotel} from "./hostelAPI.js";
import ManageForm from "./form/ManageForm.jsx";



function AddHotel() {


    const { addMyHotel, isLoading } = useCreateHotel();


    return (
        <ManageForm onSave={addMyHotel} isLoading={isLoading}/>
    );
}

export default AddHotel;