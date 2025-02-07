import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';

interface Product {
    id: string;
    productName: string;
    price: number;
    slug: string;
    status: string;
    description: string;
    category: string;
    image: {
        url: string;
    };
}

const page = async () => {
    const query = `*[_type == "product"] {
    productName,
    slug,
    price,
    description,
    category,
    status,
        "image": image.asset->{
            url,
        }
}`;
    const products: Product[] = await client.fetch(query);

    
    return (
        <div className='mt-11 mb-11'>
            <div className="w-full lg:w-4/4 lg:pl-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="relative h-64">
                                <Image
                                    src={product.image.url}
                                    alt={product.productName}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="p-4 flex flex-col justify-between flex-grow">
                                <div>
                                    <p className="text-red-600 font-semibold mb-1">{product.status}</p>
                                    <Link href={`/products/${product.slug}`} className="text-lg font-bold text-black hover:underline mb-2 block">
                                        {product.productName}
                                    </Link>
                                    <p className="text-gray-600 mb-2">{product.category}</p>
                                </div>
                                <p className="text-lg font-medium">MRP: ₹{product.price.toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default page