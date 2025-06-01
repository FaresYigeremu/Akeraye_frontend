"use client"; // Mark as Client Component

import { useState } from 'react';
import Image from 'next/image';
// Optional: Import icons if desired
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ImageGalleryProps {
    images: string[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!images || !Array.isArray(images) || images.length === 0) {
        return (
            <div className="w-full h-[40vh] md:h-[64vh] bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                No images available
            </div>
        );
    }

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleThumbnailClick = (index: number): void => {
        setCurrentImageIndex(index);
    };

    return (
        <div className="relative">
            {/* Main Image Display */}
            <div className="w-full h-[40vh] md:h-[64vh] overflow-hidden rounded-xl relative mb-4">
                <Image
                    fill
                    src={images[currentImageIndex]}
                    className="object-cover w-full h-full"
                    alt={`Property image ${currentImageIndex + 1}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1500px"
                    priority={currentImageIndex === 0}
                />
                {/* Navigation Buttons */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={handlePreviousImage}
                            className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 transition duration-200 z-10"
                            aria-label="Previous image"
                        >
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                            {/* <FaChevronLeft size={20} /> */}
                        </button>
                        <button
                            onClick={handleNextImage}
                            className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 transition duration-200 z-10"
                            aria-label="Next image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                            {/* <FaChevronRight size={20} /> */}
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex justify-center items-center space-x-2 md:space-x-3 p-2 overflow-x-auto">
                    {images.map((thumbnailUrl, index) => (
                        <div
                            key={index}
                            onClick={() => handleThumbnailClick(index)}
                            className={`relative w-16 h-12 md:w-20 md:h-16 rounded-md overflow-hidden cursor-pointer flex-shrink-0
                                        border-2 transition duration-200
                                        ${currentImageIndex === index ? 'border-blue-500 scale-105' : 'border-transparent hover:border-gray-400'}`}
                        >
                            <Image
                                fill
                                src={thumbnailUrl}
                                alt={`Thumbnail ${index + 1}`}
                                className="object-cover"
                                sizes="80px"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageGallery;