import React, {useEffect} from 'react';
import * as yup from "yup";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import DetailsForm from "./DetailsForm.jsx";
import TypesForm from "./TypesForm.jsx";
import FacilitiesForm from "./FacilitiesForm.jsx";
import GuestsForm from "./GuestsForm.jsx";
import ImagesForm from "./ImagesForm.jsx";

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    description: yup.string().required("Description is required"),
    price: yup.number().typeError("Price must be a valid number.") .positive("Price must be greater than zero.").required("Price is required"),
    rating: yup.number().typeError("Rating is required").required("Rating is required"),
    type: yup.string().required("Type is required"),
    facilities: yup.array().of(yup.string()).typeError("minimum select 1 facility").min(1, "minimum select 1 facility").required("Facilities is required"),
    adultCount: yup.number().typeError("At least 1 adult is required.").min(1, "At least 1 adult is required.").required("Adults field is required."),
    childCount: yup.number().typeError("field not be empty").default(0).required("Child field is required."),
    images: yup
        .array()
        .of(
            yup.mixed().test("isImage", "Only image files are allowed", (value) => {
                return value && value.type && value.type.startsWith("image/");
            })
        )
        .max(5, "You can upload a maximum of 5 images")
        .test("at-least-one-image", "At least one image is required", function (value) {
            const { imagesUrls } = this.parent; // Access `imageUrls` from the parent
            return value?.length > 0 || (imagesUrls && imagesUrls.length > 0); // Check both `images` and `imageUrls`
        }),
    imagesUrls: yup
        .array()
        .of(yup.string())
        .test("at-least-one-url", "At least one URL is required", function (value) {
            const { images } = this.parent; // Access `images` from the parent
            return value?.length > 0 || (images && images?.length > 0); // Check both `imageUrls` and `images`
        })
        .notRequired()
});

function ManageForm({ onSave, hotelData, isLoading }) {
    const formMethods = useForm({
        resolver: yupResolver(schema),
    });

    const { handleSubmit, reset, formState: { errors} } = formMethods;


    useEffect(() => {
        reset(hotelData);
    }, [hotelData, reset]);

    function onSubmit(data) {
        const formData = new FormData();
        if(hotelData){
            formData.append("_id", hotelData._id);
        }
        formData.append("name", data.name);
        formData.append("city", data.city);
        formData.append("state", data.state);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("rating", data.rating);
        formData.append("type", data.type);
        formData.append("adultCount", data.adultCount);
        formData.append("childCount", data.childCount);

        data.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
        })

        if(data.imagesUrls){
            data.imagesUrls.forEach((url, index) => {
                formData.append(`imagesUrls[${index}]`, url);
            })
        }

        data.images?.forEach((image) => {
            formData.append(`imageFiles`, image);
        })

        onSave(formData);
        reset();

    }

    return (
        <FormProvider {...formMethods}>
            <form className={'flex flex-col gap-4'} onSubmit={handleSubmit(onSubmit)}>
                <DetailsForm/>
                <TypesForm/>
                <FacilitiesForm/>
                <GuestsForm/>
                <ImagesForm/>
                <span className={'flex justify-end'}>
                    <button disabled={isLoading} className={'bg-blue-600 text-white font-bold px-3 py-2 rounded'} type="submit">
                        {hotelData ? "Save Edit": "Add Hotel"}
                    </button>
                </span>
            </form>
        </FormProvider>
    );
}

export default ManageForm;