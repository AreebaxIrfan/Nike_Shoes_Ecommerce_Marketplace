'use client'

import React from 'react';
import { useWishlist } from './../context/WishlistContext';
import Image from 'next/image';
import Link from 'next/link';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 flex flex-col">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.productName}
                width={300}
                height={300}
                className="object-cover rounded-md mb-4"
              />
              <Link href={`/products/${item.slug}`} className="">
                <h2 className="text-xl font-semibold mb-2">{item.productName}</h2>
              </Link>
              <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>
              <div className="mt-auto flex justify-between">
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default WishlistPage;

