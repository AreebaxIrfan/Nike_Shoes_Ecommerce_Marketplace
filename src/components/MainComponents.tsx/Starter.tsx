'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { UserButton, useAuth } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

const Starter = () => {
    const { userId, isLoaded } = useAuth();
    const pathname = usePathname();

    if (!isLoaded) {
        return null;
    }
    return (
        <div className=''>
            <div className="bg-secondary w-full flex flex-row items-center justify-between text-black space-y-0 px-8">
                <Image
                    width={40}
                    height={100}
                    src="/logo.avif"
                    alt="logo"
                    layout="fixed"
                />
                <div className='' >
                    {!userId && (
                        <div className="flex flex-row justify-center md:justify-end space-x-4 font-semibold">
                            <Link href="/help" className="hover:text-gray-600 text-sm md:text-base">
                                Help |
                            </Link>
                            <Link href="/sign-up" className="hover:text-gray-600 text-sm md:text-base">
                                Join Us |
                            </Link>
                            <Link href="/sign-in" className="hover:text-gray-600 text-sm md:text-base">
                                Sign In
                            </Link>
                        </div>
                    )}
                    {userId && (
                        <div className="flex flex-row justify-center md:justify-end space-x-4 font-semibold">
                            <Link href="/help" className="hover:text-gray-600 text-sm md:text-base mt-1">
                                Help |
                            </Link>
                            <div className='ml-4'>
                                <UserButton afterSignOutUrl='/' />
                            </div>
                        </div>
                    )
                    }
                    {/* Navigation Links */}

                </div>
            </div>
        </div>
    );
};

export default Starter;
