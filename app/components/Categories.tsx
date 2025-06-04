'use client';

import { useState } from 'react';
import Image from 'next/image';
import useSearchModal, {SearchQuery} from '../hooks/useSearchModal';

const Categories = () => {
    const searchModal = useSearchModal();
    const [category, setCategory] = useState('');

    const _setCategory = (_category: string) => {
        setCategory(_category);

        const query: SearchQuery = {
            country: searchModal.query.country,
            checkIn: searchModal.query.checkIn,
            checkOut: searchModal.query.checkOut,
            guests: searchModal.query.guests,
            bedrooms: searchModal.query.bedrooms,
            bathrooms: searchModal.query.bathrooms,
            category: _category
        }

        searchModal.setQuery(query);
    }

    return (
        <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
            <div 
                onClick={() => _setCategory('')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == '' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/icn_category_beach.jpeg"
                    alt="Category - "
                    width={50}
                    height={50}
                />

                <span className='text-xs'>All</span>
            </div>
            
            <div 
                onClick={() => _setCategory('houses')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'beach' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/house.png"
                    alt="Category - houses"
                    width={50}
                    height={50}
                />

                <span className='text-xs'>Houses</span>
            </div>

            <div 
                onClick={() => _setCategory('villas')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'villas' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/villa.png"
                    alt="Category - villas"
                    width={50}
                    height={50}
                />

                <span className='text-xs'>Villas</span>
            </div>

            <div 
                onClick={() => _setCategory('pensions')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'cabins' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/pension.png"
                    alt="Category - pension"
                    width={50}
                    height={50}
                />

                <span className='text-xs'>Pensions</span>
            </div>

            <div
                onClick={() => _setCategory('guest_houses')} 
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'tiny_homes' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/guest-house.png"
                    alt="Category - guest houses"
                    width={50}
                    height={50}
                />

                <span className='text-xs'>Guest-Houses</span>
            </div>
        </div>
    )
}

export default Categories;