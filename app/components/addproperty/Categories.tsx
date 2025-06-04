import Image from 'next/image';

interface CategoriesProps {
    dataCategory: string;
    setCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
    dataCategory,
    setCategory
}) => {
    // Utility function to conditionally apply styles
    const getItemClass = (category: string) => {
        const isActive = dataCategory === category;
        return [
            'pb-4',
            'flex',
            'flex-col',
            'items-center',
            'space-y-2',
            'border-b-2',
            isActive ? 'border-gray-800 opacity-100 scale-105 shadow-md' : 'border-white opacity-60',
            'hover:border-gray-300',
            'hover:opacity-100',
            'transition-all',
            'duration-200',
            'ease-in-out',
        ].join(' ');
    };

    return (
        <div className="pt-3 pb-6 flex items-center space-x-12 cursor-pointer">
            {/* Houses */}
            <div 
                onClick={() => setCategory('houses')}
                className={getItemClass('houses')}
            >
                <Image src="/house.png" alt="Category - Houses" width={30} height={30} />
                <span className="text-xs">Houses</span>
            </div>

            {/* Villas */}
            <div 
                onClick={() => setCategory('villas')}
                className={getItemClass('villas')}
            >
                <Image src="/villa.png" alt="Category - Villas" width={30} height={30} />
                <span className="text-xs">Villas</span>
            </div>

            {/* Pensions */}
            <div 
                onClick={() => setCategory('pensions')}
                className={getItemClass('pensions')}
            >
                <Image src="/pension.png" alt="Category - Pensions" width={30} height={30} />
                <span className="text-xs">Pensions</span>
            </div>

            {/* Guest Houses */}
            <div 
                onClick={() => setCategory('guest_houses')}
                className={getItemClass('guest_houses')}
            >
                <Image src="/guest-house.png" alt="Category - Guest Houses" width={30} height={30} />
                <span className="text-xs">Guest Houses</span>
            </div>
        </div>
    );
};

export default Categories;
