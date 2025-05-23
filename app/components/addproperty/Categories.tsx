import Image from 'next/image';

interface CategoriesProps {
    dataCategory: string;
    setCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
    dataCategory,
    setCategory
}) => {
    return (
        <>
            <div className="pt-3 cursor-pointer pb-6 flex item-center space-x-12">
                <div 
                    onClick={() => setCategory('Houses')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'Beach' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image
                        src="/house.png"
                        alt="Category - Houses"
                        width={20}
                        height={20}
                    />

                    <span className='text-xs'>Houses</span>
                </div>

                <div 
                    onClick={() => setCategory('villas')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'Villas' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image
                        src="/villa.png"
                        alt="Category - Beach"
                        width={20}
                        height={20}
                    />

                    <span className='text-xs'>Villas</span>
                </div>

                <div 
                    onClick={() => setCategory('pensions')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'Cabins' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image
                        src="/pension.png"
                        alt="Category - Pensions"
                        width={20}
                        height={20}
                    />

                    <span className='text-xs'>Pensions</span>
                </div>

                <div 
                    onClick={() => setCategory('guest_houses')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'Tiny homes' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image
                        src="/guest-house.png"
                        alt="Category - Guest Houses"
                        width={20}
                        height={20}
                    />

                    <span className='text-xs'>Guest-Houses</span>
                </div>
            </div>
        </>
    )
}

export default Categories;