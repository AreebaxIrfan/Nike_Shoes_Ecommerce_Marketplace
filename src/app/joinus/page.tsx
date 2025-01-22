import React from 'react';
import Image from 'next/image';

const Page = () => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center mt-12 mb-20 px-4">
                {/* Logo and Header Section */}
                <div className="flex flex-col justify-center items-center">
                    <Image
                        src="/nike.png"
                        alt="Logo"
                        width={80}
                        height={100}
                        className="mb-6"
                    />
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">BECOME A NIKE MEMBER</h1>
                        <p>Create your Nike member profile and get first access to the very best of Nike products ,inspiration and community</p>
                    </div>
                </div>

                {/* Input Fields */}
                <div className="flex flex-col mt-8 w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Email address"
                        className="border-2 border-gray-300 px-4 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border-2 border-gray-300 px-4 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <input
                        type="password"
                        placeholder="First Name"
                        className="border-2 border-gray-300 px-4 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <input
                        type="password"
                        placeholder="Last Name"
                        className="border-2 border-gray-300 px-4 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <input
                        type="password"
                        placeholder="Date of Birth"
                        className="border-2 border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <p className='text-gray-600 text-xs mt-2 mb-3'>Get a Nike Member Reward every yera on your Birthday</p>
                    <input
                        type="password"
                        placeholder="India"
                        className="border-2 border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
                <div className='flex flex-row space-x-9 mt-4'>
                    <button className='px-9 py-3 border-2 border-gray-200'>Male</button>
                    <button className='px-9 py-3 border-2 border-gray-200'>female</button>
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex w-full max-w-md mt-4 text-sm">
                    <label className="flex flex-row space-x-2 text-gray-600">
                        <input type="checkbox" className="form-checkbox mb-4" />
                        <span >Sign up for emails to get updates from Nike on products, offers and your Member benefits</span>
                    </label>
                </div>

                {/* Terms Section */}
                <div className="text-center text-gray-600 mt-6">
                    <p>
                        By logging in, you agree to Nike's{' '}
                        <a href="#" className="underline">
                            Privacy Policy
                        </a>{' '}
                        and{' '}
                        <a href="#" className="underline">
                            Terms of Use
                        </a>.
                    </p>
                </div>

                {/* Sign-In Button */}
                <button className="mt-6 bg-black  text-white rounded sm:px-48 py-2 px-32 sm:py-3 hover:bg-gray-800 transition">
                    JOIN US
                </button>

                {/* Join Us Section */}
                <div className="text-gray-600 mt-6">
                    Already  a Member?{' '}
                    <a href="/signin" className="text-black underline hover:no-underline">
                        Signin
                    </a>
                </div>
            </div>
        </div>
        
    );
};

export default Page;
