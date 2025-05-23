'use client';

import Image from 'next/image';

import { ChangeEvent, useState } from 'react';
import Modal from './Modal';
import CustomButton from '../forms/CustomButton';
import Categories from '../addproperty/Categories';

import useAddPropertyModal from '@/app/hooks/useAddPropertyModal';
import SelectCountry, {SelectCountryValue} from '../forms/SelectCountry';

import apiService from '@/app/services/apiService';
import { useRouter } from 'next/navigation';

const AddPropertyModal = () => {
    //
    // States

    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState<string[]>([]);
    const [dataCategory, setDataCategory] = useState('');
    const [dataTitle, setDataTitle] = useState('');
    const [dataDescription, setDataDescription] = useState('');
    const [dataPrice, setDataPrice] = useState('');
    const [dataBedrooms, setDataBedrooms] = useState('');
    const [dataBathrooms, setDataBathrooms] = useState('');
    const [dataGuests, setDataGuests] = useState('');
    const [dataCountry, setDataCountry] = useState<SelectCountryValue>();
    const [dataImages, setDataImages] = useState<File[]>([]);

    //
    //

    const addPropertyModal = useAddPropertyModal();
    const router = useRouter();

    //
    // Set datas

    const setCategory = (category: string) => {
        setDataCategory(category)
    }

    // const setImage = (event: ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files && event.target.files.length > 0) {
    //         const tmpImage = event.target.files[0];

    //         setDataImage(tmpImage);
    //     }
    // }
    // --- Handle Image Selection (Multiple Files) ---
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            // Convert FileList to array and limit to 5 files
            const files = Array.from(event.target.files).slice(0, 5);
            setDataImages(files); // Set the state with the selected files (max 5)
        }
    };

    //
    // SUbmit

    const submitForm = async () => {
        console.log('submitForm');

        if (
            dataCategory &&
            dataTitle &&
            dataDescription &&
            dataPrice &&
            dataCountry &&
            dataImages
        ) {
            const formData = new FormData();
            formData.append('category', dataCategory);
            formData.append('title', dataTitle);
            formData.append('description', dataDescription);
            formData.append('price_per_night', dataPrice);
            formData.append('bedrooms', dataBedrooms);
            formData.append('bathrooms', dataBathrooms);
            formData.append('guests', dataGuests);
            formData.append('country', dataCountry.label);
            formData.append('country_code', dataCountry.value);
            // formData.append('image', dataImage);
             // Append images with specific keys: image, image2, image3, ...
        dataImages.forEach((image, index) => {
            if (index === 0) {
                formData.append('image', image); // Key for the first image
            } else {
                formData.append(`image${index + 1}`, image); // Keys image2, image3, image4, image5
            }
        });

            const response = await apiService.post('/api/properties/create/', formData);

            if (response.success) {
                console.log('SUCCESS :-D');

                router.push('/?added=true');

                addPropertyModal.close();
            } else {
                console.log('Error');

                const tmpErrors: string[] = Object.values(response).map((error: any) => {
                    return error;
                })

                setErrors(tmpErrors)
            }
        }
    }

    //
    //

    const content = (
        <>
            {currentStep == 1 ? (
                <>
                    <h2 className='mb-6 text-2xl'>Choose category</h2>

                    <Categories
                        dataCategory={dataCategory}
                        setCategory={(category) => setCategory(category)}
                    />

                    <CustomButton
                        label='Next'
                        onClick={() => setCurrentStep(2)}
                    />
                </>
            ) : currentStep == 2 ? (
                <>
                    <h2 className='mb-6 text-2xl'>Describe your place</h2>

                    <div className='pt-3 pb-6 space-y-4'>
                        <div className='flex flex-col space-y-2'>
                            <label>Title</label>
                            <input
                                type="text"
                                value={dataTitle}
                                onChange={(e) => setDataTitle(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            />
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label>Description</label>
                            <textarea
                                value={dataDescription}
                                onChange={(e) => setDataDescription(e.target.value)}
                                className='w-full h-[200px] p-4 border border-gray-600 rounded-xl'
                            ></textarea>
                        </div>
                    </div>

                    <CustomButton
                        label='Previous'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onClick={() => setCurrentStep(1)}
                    />

                    <CustomButton
                        label='Next'
                        onClick={() => setCurrentStep(3)}
                    />
                </>
            ) : currentStep == 3 ? (
                <>
                    <h2 className='mb-6 text-2xl'>Details</h2>

                    <div className='pt-3 pb-6 space-y-4'>
                        <div className='flex flex-col space-y-2'>
                            <label>Price per night</label>
                            <input
                                type="number"
                                value={dataPrice}
                                onChange={(e) => setDataPrice(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            />
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label>Bedrooms</label>
                            <input
                                type="number"
                                value={dataBedrooms}
                                onChange={(e) => setDataBedrooms(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            />
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label>Bathrooms</label>
                            <input
                                type="number"
                                value={dataBathrooms}
                                onChange={(e) => setDataBathrooms(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            />
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label>Maximum number of guests</label>
                            <input
                                type="number"
                                value={dataGuests}
                                onChange={(e) => setDataGuests(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            />
                        </div>
                    </div>

                    <CustomButton
                        label='Previous'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onClick={() => setCurrentStep(2)}
                    />

                    <CustomButton
                        label='Next'
                        onClick={() => setCurrentStep(4)}
                    />
                </>
            ) : currentStep == 4 ? (
                <>
                    <h2 className='mb-6 text-2xl'>Location</h2>

                    <div className='pt-3 pb-6 space-y-4'>
                        <SelectCountry 
                            value={dataCountry}
                            onChange={(value) => setDataCountry(value as SelectCountryValue)}
                        />
                    </div>

                    <CustomButton
                        label='Previous'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onClick={() => setCurrentStep(3)}
                    />

                    <CustomButton
                        label='Next'
                        onClick={() => setCurrentStep(5)}
                    />
                </>
            ) : (
                <>
                <h2 className='mb-6 text-2xl'>Images</h2>
                <p className="text-gray-600 text-sm mb-4">Upload up to 5 images for your property. The first image will be the main cover image.</p>
                <div className='pt-3 pb-6 space-y-4'>
                    {/* Styled File Input Container */}
                    <div className='py-4 px-6 border border-dashed border-gray-400 hover:border-gray-600 rounded-xl text-center cursor-pointer'>
                         <label htmlFor="file-upload" className="text-gray-700 cursor-pointer">
                            Click to select images (up to 5)
                         </label>
                        <input
                            id="file-upload" // Link label to input
                            type="file"
                            accept='image/*' // Allow only image types
                            multiple // <-- Allow multiple file selection
                            onChange={handleImageChange} // <-- Use updated handler
                            className='hidden' // Hide the default input appearance
                        />
                    </div>

                    {/* Display Previews for Selected Images */}
                    {dataImages.length > 0 && (
                        <div className='mt-4 grid grid-cols-3 sm:grid-cols-5 gap-3'>
                            {dataImages.map((image, index) => (
                                <div key={index} className='w-full aspect-square relative border rounded-lg overflow-hidden'> {/* Use aspect-square for consistent previews */}
                                    <Image
                                        fill
                                        alt={`Uploaded image ${index + 1}`}
                                        src={URL.createObjectURL(image)} // Create preview URL
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                     <p className="text-sm text-gray-500 mt-1">{dataImages.length} / 5 images selected.</p>
                </div>

                {/* Display Errors */}
                {errors.length > 0 && (
                    <div className='p-4 mb-4 bg-red-200 text-red-800 border border-red-400 rounded-xl space-y-1'>
                        <p className="font-semibold">Please fix the following issues:</p>
                        {errors.map((error, index) => (
                            <p key={index}>- {error}</p>
                        ))}
                    </div>
                )}

                 <div className="flex justify-between items-center">
                    <CustomButton
                        label='Previous'
                        className='bg-gray-600 hover:bg-gray-700'
                        onClick={() => setCurrentStep(4)}
                    />
                    {/* Update Submit button */}
                    <CustomButton
                        label='Submit Property'
                        onClick={submitForm} // Call the submit function
                        // Optionally disable if no images
                    />
                </div>
            </>
            )}
        </>
    )

    return (
        <>
            <Modal
                isOpen={addPropertyModal.isOpen}
                close={addPropertyModal.close}
                label="Add property"
                content={content}
            />
        </>
    )
}

export default AddPropertyModal;