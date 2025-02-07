'use client'

import React from 'react';
import { useWishlist } from './../context/WishlistContext';
import Image from 'next/image';
import Link from 'next/link';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 border-b-2 border-gray-200 pb-4">
          Your Wishlist
          <span className="text-2xl ml-2 text-gray-500">({wishlist.length} items)</span>
        </h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <svg
                className="w-24 h-24 mx-auto text-gray-400 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-8">Start adding items you love to your wishlist</p>
              <Link
                href="/products"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
              >
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                <div className="aspect-square overflow-hidden rounded-t-xl relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.productName}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-4">
                  <Link 
                    href={`/products/${item.slug}`}
                    className="hover:text-indigo-600 transition-colors duration-200"
                  >
                    <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {item.productName}
                    </h2>
                  </Link>
                  
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-xl font-bold text-gray-900">
                      ${item.price.toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-red-500 hover:text-red-600 transition-colors duration-200 p-2 rounded-full hover:bg-red-50"
                      title="Remove item"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;