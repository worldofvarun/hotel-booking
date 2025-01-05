import React from 'react';
import {useFormContext} from "react-hook-form";
import Error from "../../../ui/Error.jsx";

function ImagesForm() {
    const {setValue, formState: {errors}, trigger, watch} = useFormContext();
    const imagesUrls = watch('imagesUrls');

    function handleFieldChange(event) {
        const data = Array.from(event.target.files)
        setValue('images', data);
        trigger('images')
    }

    function handleDelete(event, url) {
        event.preventDefault();
        setValue('imagesUrls', imagesUrls.filter(imageurl => imageurl !== url));
    }

    return (
        <div className={'flex flex-col gap-4'}>
            <h2 className={'text-2xl font-bold'}>Images</h2>
            {imagesUrls && (
                <div className={'grid grid-cols-5 gap-4'}>
                    {imagesUrls.map((imageUrl, index) => (
                        <div key={index} className={'relative group'}>
                            <img src={imageUrl} className={'min-h-full object-cover'}/>
                            <button onClick={(event) => handleDelete(event, imageUrl)} className={'absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center bg-white bg-opacity-60 font-bold text-red-800'}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
            <label  className={'text-gray-700 text-sm p-4 rounded border border-gray-500'}>
                <input type={'file'} multiple={true} onChange={handleFieldChange}/>
            </label>
            {errors.images && <Error message={errors.images.message}/>}
        </div>
    );
}

export default ImagesForm;