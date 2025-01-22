import React from 'react';
import Image from 'next/image';

const Page = () => {
    return (
        <div className='container max-auto max-w-7xl'>
            <div className="flex flex-col justify-center items-center mt-12 mb-20 px-4 ">
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
                        <h1 className="text-3xl font-bold">YOUR ACCOUNT</h1>
                        <h1 className="text-3xl font-bold">FOR EVERYTHING</h1>
                        <h1 className="text-3xl font-bold">NIKE</h1>
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
                        className="border-2 border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex justify-between w-full max-w-md mt-4 text-sm">
                    <label className="flex items-center space-x-2 text-gray-600">
                        <input type="checkbox" className="form-checkbox" />
                        <span>Keep me signed in</span>
                    </label>
                    <a href="#" className="text-gray-600 hover:underline">
                        Forgotten your password?
                    </a>
                </div>

                {/* Terms Section */}
                <div className="text-center text-gray-600 mt-6">
                    <p>
                        By logging in, you agree to Nikes{' '}
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
                    SIGN IN
                </button>

                {/* Join Us Section */}
                <div className="text-gray-600 mt-6">
                    Not a Member?{' '}
                    <a href="/joinus" className="text-black underline hover:no-underline">
                        Join Us
                    </a>
                </div>

            </div>
        </div>
    );
};

export default Page;
