'use client';

import { useState } from 'react';
import Image from 'next/image';
import useSearchModal, { SearchQuery } from '../hooks/useSearchModal';

const Categories = () => {
  const searchModal = useSearchModal();
  const [category, setCategory] = useState<string>('');

  const _setCategory = (_category: string) => {
    // Update local state so that only one is active at a time
    setCategory(_category);

    // Build a new query object including the selected category
    const query: SearchQuery = {
      country: searchModal.query.country,
      checkIn: searchModal.query.checkIn,
      checkOut: searchModal.query.checkOut,
      guests: searchModal.query.guests,
      bedrooms: searchModal.query.bedrooms,
      bathrooms: searchModal.query.bathrooms,
      category: _category,
    };

    searchModal.setQuery(query);
  };

  // A helper to compute the className for each item
  const getItemClass = (itemKey: string) => {
    // If this is the selected category, apply “active” styles
    if (category === itemKey) {
      return [
        'pb-4',
        'flex',
        'flex-col',
        'items-center',
        'space-y-2',
        'border-b-2',
        'border-black',
        'shadow-md',
        'opacity-100',
        'scale-105',
        'transition-all',
        'duration-200',
        'ease-in-out',
      ].join(' ');
    }

    // Otherwise, apply “inactive” styles
    return [
      'pb-4',
      'flex',
      'flex-col',
      'items-center',
      'space-y-2',
      'border-b-2',
      'border-white',
      'opacity-60',
      'hover:border-gray-200',
      'hover:opacity-100',
      'transition-all',
      'duration-200',
      'ease-in-out',
    ].join(' ');
  };

  return (
    <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
      {/* “All” category */}
      <div onClick={() => _setCategory('')} className={getItemClass('')}>
        <Image src="/icn_category_beach.jpeg" alt="Category - All" width={50} height={50} />
        <span className="text-xs">All</span>
      </div>

      {/* Houses */}
      <div onClick={() => _setCategory('houses')} className={getItemClass('houses')}>
        <Image src="/house.png" alt="Category - Houses" width={50} height={50} />
        <span className="text-xs">Houses</span>
      </div>

      {/* Villas */}
      <div onClick={() => _setCategory('villas')} className={getItemClass('villas')}>
        <Image src="/villa.png" alt="Category - Villas" width={50} height={50} />
        <span className="text-xs">Villas</span>
      </div>

      {/* Pensions */}
      <div onClick={() => _setCategory('pensions')} className={getItemClass('pensions')}>
        <Image src="/pension.png" alt="Category - Pensions" width={50} height={50} />
        <span className="text-xs">Pensions</span>
      </div>

      {/* Guest Houses */}
      <div onClick={() => _setCategory('guest_houses')} className={getItemClass('guest_houses')}>
        <Image src="/guest-house.png" alt="Category - Guest Houses" width={50} height={50} />
        <span className="text-xs">Guest Houses</span>
      </div>
    </div>
  );
};

export default Categories;
