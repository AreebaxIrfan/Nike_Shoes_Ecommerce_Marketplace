'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { BiShoppingBag } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { useCart } from '../app/context/CartContext';
import { useWishlist } from '../app/context/WishlistContext';
import SearchBar from './SearchBar';

const Navbar = () => {
    const [isHamburgerOpen, setHamburgerOpen] = useState(false);
    const { getCartItemsCount } = useCart();
    const { wishlist } = useWishlist();
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const toggleHamburger = () => setHamburgerOpen(!isHamburgerOpen);
    const cartItemsCount = getCartItemsCount();
    const wishlistItemsCount = wishlist.length;
    
    return (
        <nav className="bg-main shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href='/'>
                            <Image
                                src="/nike.avif"
                                alt="Logo"
                                width={80}
                                height={40}
                            />
                        </Link>
                    </div>

                    {/* Navigation Links - Desktop */}
                    <div className="hidden lg:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/" className="text-black hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                                Home
                            </Link>
                            <Link href="/products" className="text-black hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                                News & Featured
                            </Link>
                            <Link href="/men" className="text-black hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                                Men
                            </Link>
                            <Link href="/women" className="text-black hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                                Women
                            </Link>
                        </div>
                    </div>


                    {/* Search, Heart Icon, and Cart Icon */}
                    <div className="hidden lg:flex items-center">
                        <div className="relative" ref={searchRef}>
                           <SearchBar/>
                        </div>
                        <Link href="/wishlist" className="ml-4 text-gray-700 hover:text-gray-900 focus:outline-none relative">
                            <FaRegHeart size={20} />
                            {wishlistItemsCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {wishlistItemsCount}
                                </span>
                            )}
                        </Link>
                        <Link href='/cart' className="ml-4 text-gray-700 hover:text-gray-900 focus:outline-none relative">
                            <BiShoppingBag size={20} />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden flex items-center">
                        <button onClick={toggleHamburger} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            {isHamburgerOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            {isHamburgerOpen && (
                <div ref={mobileMenuRef} className="lg:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/products" className="text-black hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium">
                            News & Featured
                        </Link>
                        <Link href="/men" className="text-black hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium">
                            Men
                        </Link>
                        <Link href="/women" className="text-black hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium">
                            Women
                        </Link>
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-700">
                        <div className="flex items-center px-5">
                            <SearchBar />
                            <Link href="/wishlist" className="ml-4 text-gray-700 hover:text-gray-900 focus:outline-none relative">
                                <FaRegHeart size={20} />
                                {wishlistItemsCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        {wishlistItemsCount}
                                    </span>
                                )}
                            </Link>
                            <Link href='/cart' className="ml-4 text-gray-700 hover:text-gray-900 focus:outline-none relative">
                                <BiShoppingBag size={20} />
                                {cartItemsCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        {cartItemsCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;