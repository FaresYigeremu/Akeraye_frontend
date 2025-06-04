import Image from "next/image";
import Link from "next/link";
import ReservationSidebar from "@/app/components/properties/ReservationSidebar";
import ImageGallery from "@/app/components/properties/ImageGallery";
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";

const PropertyDetailPage = async ({params}: { params: {id: string }}) => {
    const property = await apiService.get(`/api/properties/${params.id}`);
    const userId = await getUserId();

    console.log('userId', userId);

    const images = [];
    if (property.image_url) images.push(property.image_url);
    if (property.image2_url) images.push(property.image2_url);
    if (property.image3_url) images.push(property.image3_url);
    if (property.image4_url) images.push(property.image4_url);
    if (property.image5_url) images.push(property.image5_url);
    // Now 'images' is an array like: ['http://...', 'http://...', ...]
    // containing only the URLs that were present in the response.
    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
             <ImageGallery images={images} />
            {/* <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
                <Image
                    fill
                    src={property.image_url}
                    className="object-cover w-full h-full"
                    alt="Beach house"
                />
            </div> */}

            <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="py-6 pr-6 col-span-3">
                    <h1 className="mb-4 text-4xl">{property.title}</h1>

                    <span className="mb-6 block text-lg text-gray-600">
                        {property.guests} guests - {property.bedrooms} bedrooms - {property.bathrooms} bathrooms
                    </span>

                    <hr />

                    <Link 
                        href={`/landlords/${property.landlord.id}`}
                        className="py-6 flex items-center space-x-4"
                    >
                        {property.landlord.avatar_url && (
                            <Image
                                src={property.landlord.avatar_url}
                                width={50}
                                height={50}
                                className="rounded-full"
                                alt="The user name"
                            />
                        )}

                        <p><strong>{property.landlord.username}</strong> is your host</p>
                    </Link>

                    <hr />

                    <p className="mt-6 text-lg">
                        {property.description}
                    </p>
                </div>

                <ReservationSidebar 
                    property={property}
                    userId={userId}
                />
            </div>
        </main>
    )
}

export default PropertyDetailPage;