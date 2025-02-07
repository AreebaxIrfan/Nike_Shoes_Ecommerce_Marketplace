'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { MdArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { client } from '@/sanity/lib/client';
import Link from 'next/link';

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

const Category = async () => {
    const [isProductListVisible, setIsProductListVisible] = useState(true);
    const query = `*[_type == "product"] {
        productName,
        status,
        price,
        slug,
        description,
        category,
        "image": image.asset->{
           url
        }
    }`;

    const products: Product[] = await client.fetch(query);

    const handleScrollLeft = () => {
        const slider = document.getElementById('productList');
        if (slider) {
            slider.scrollBy({ left: -500, behavior: 'smooth' });
        }
    };

    const handleScrollRight = () => {
        const slider = document.getElementById('productList');
        if (slider) {
            slider.scrollBy({ left: 500, behavior: 'smooth' });
        }
    };

    return (
        <div>
            <div className="px-8">
                <div className="flex flex-row justify-between mt-4">
                    <h1 className="text-2xl font-bold mb-6">Best Of Air Max</h1>
                    <div className="flex flex-row space-x-4">
                        <h1 className="font-bold">Shop</h1>
                        <div className="flex flex-row space-x-2">
                            <MdArrowBackIosNew
                                size={24}
                                className="bg-secondary rounded-full cursor-pointer"
                                onClick={handleScrollLeft}
                            />
                            <MdOutlineArrowForwardIos
                                size={24}
                                className="bg-secondary rounded-full cursor-pointer"
                                onClick={handleScrollRight}
                            />
                        </div>
                    </div>
                </div>

                {/* Product List Section */}
                <div
                    id="productList"
                    className={`flex flex-row justify-start items-center overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-4 mb-11 no-scrollbar ${!isProductListVisible ? 'hidden' : ''
                        }`}
                >
                    {products.map((product: Product) => (
                        <div
                            key={product.id}
                            className="flex-none w-60 h-96 p-2 border bg-white rounded-lg shadow-lg snap-start"
                        >
                            <Link href={`/products/${product.slug}`}>
                            <Image
                                src={product.image?.url}
                                alt={product.productName}
                                width={790}
                                height={500}
                                className="object-cover rounded-md mb-2 h-[200px]"
                                />
                                </Link>
                            <div className="flex flex-col justify-start mt-4 p-3 text-center">
                            <p className="font-bold text-orange-800">{product.status}</p>
                         <p className="font-semibold font-sans text-black">{product.productName}</p>

                                <div className="flex flex-col text-base  ">
                                    <h3 className="block text-sm text-gray-500 mb-2">{product.category}</h3>
                                <p className="font-bold text-gray-800">Rs. {product.price}</p>
                            </div>
                        </div>
                        </div>
                    ))}
            </div>
        </div>
        </div >
    );
};

export default Category;