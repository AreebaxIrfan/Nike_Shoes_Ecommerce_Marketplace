import React from 'react'
import { CiSearch } from 'react-icons/ci'
import Link from 'next/link'
import { IoThumbsUpSharp } from "react-icons/io5";
import { IoIosThumbsDown } from "react-icons/io";
import { ImMobile } from "react-icons/im";
import { RiMessage2Fill } from "react-icons/ri";
import { AiTwotoneMail } from "react-icons/ai";
import Image from 'next/image'


const page = () => {
    return (
        <>
            <div>
                <title>Get Help - Nike Customer Support</title>
                <meta
                    name="description"
                    content="Find answers to your questions about Nike products, orders, and payment options. Get support from Nike's customer service team."
                />
                <link rel="canonical" href="https://www.nike.com/help" />
            </div>
            <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <section className="text-center mb-12">
                    <h1 className="text-3xl font-bold mb-6">GET HELP</h1>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for help"
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            aria-label="Search for help"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CiSearch className="text-gray-400 w-6 h-6" />
                        </button>
                    </div>

                </section>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <section className="lg:col-span-9">
                        <h2 className="text-2xl font-bold mb-6">WHAT PAYMENT OPTIONS CAN I USE ON NIKE ORDERS?</h2>
                        <div className="space-y-4 mb-8">
                            <p>Visa, Mastercard, Diner Club, Discover, American Express, Visa Electron, Maestro</p>
                            <p>
                                If you enter your PAN information at checkout, you will be able to pay your order with PayTM or local
                                credit or debit card.
                            </p>
                            <p>
                                <strong>Apple Pay</strong> is also available for compatible devices.
                            </p>
                            <p>
                                <strong className="underline">Nike Members</strong> can store multiple debit or credit cards in their
                                profile for faster checkout. If you are not already a Member,{" "}
                                <Link href="/join" className="underline font-bold">
                                    join us
                                </Link>{" "}
                                today!
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4 mb-12">
                            <Link
                                href="/join"
                                className="bg-black text-white rounded-full px-6 py-3 font-bold hover:bg-gray-800 transition duration-300"
                            >
                                JOIN US
                            </Link>
                            <Link
                                href="/"
                                className="bg-white text-black border-2 border-black rounded-full px-6 py-3 font-bold hover:bg-gray-100 transition duration-300"
                            >
                                SHOP NIKE
                            </Link>
                        </div>
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-6">FAQs</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold mb-2">Does my card need international purchases enabled?</h3>
                                    <p>
                                        Yes, we recommend asking your bank to enable international purchases on your card. You will be
                                        notified at checkout if international purchases need to be enabled.
                                    </p>
                                    <p className="mt-2">
                                        Please note, some banks may charge a small transaction fee for international orders.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-2">Can I pay for my order with multiple methods?</h3>
                                    <p>No, payment for Nike orders can't be split between multiple payment methods.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-2">What payment method is accepted for SNKRS orders?</h3>
                                    <p>You can use any accepted credit card to pay for your SNKRS order.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-2">Why don't I see Apple Pay as an option?</h3>
                                    <p>
                                        To see Apple Pay as an option in the Nike App or on Nike.com, you'll need to use a compatible Apple
                                        device running the latest OS, be signed in to your iCloud account and have a supported card in your
                                        Wallet. Additionally, you'll need to use Safari to use Apple Pay on Nike.com.
                                    </p>
                                </div>
                            </div>
                        </section>
                        <section className="mb-12">
                            <h3 className="font-bold mb-4">Was this answer helpful?</h3>
                            <div className="flex space-x-4 mb-6">
                                <button
                                    className='p-2 rounded-full bg-gray-200'
                                    aria-label="Yes, this was helpful"
                                >
                                    <IoThumbsUpSharp size={24} />
                                </button>
                                <button
                                    className='p-2 rounded-full bg-gray-200'
                                    aria-label="No, this was not helpful"
                                >
                                    <IoIosThumbsDown size={24} />
                                </button>
                            </div>
                            <h3 className="font-bold mb-4">Related Topics</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="#" className="text-blue-600 hover:underline">
                                        WHAT ARE NIKE'S DELIVERY OPTIONS?
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-blue-600 hover:underline">
                                        HOW DO I GET FREE DELIVERY ON NIKE ORDERS?
                                    </Link>
                                </li>
                            </ul>
                        </section>
                    </section>

                    <aside className="lg:col-span-3">
                        <h2 className="text-2xl font-bold mb-6 text-center">CONTACT US</h2>
                        <div className="space-y-8">
                            <div className="text-center">
                                <ImMobile size={24} className="mx-auto mb-2" />
                                <p className="font-bold">000 800 919 0566</p>
                                <p>Products & Orders: 24 hours a day, 7 days a week</p>
                                <p>Company Info & Enquiries: 07:30-16:30, Monday - Friday</p>
                            </div>
                            <div className="text-center">
                                <RiMessage2Fill size={24} className="mx-auto mb-2" />
                                <p className="font-bold">24 hours a day</p>
                                <p>7 days a week</p>
                            </div>
                            <div className="text-center">
                                <AiTwotoneMail size={24} className="mx-auto mb-2" />
                                <p className="font-bold">We will reply within</p>
                                <p>five business days</p>
                            </div>
                            <div className="text-center">
                                <Image src="/locat.png" alt="Store locator icon" width={90} height={40} className="mx-auto mb-2" />
                                <p className="font-bold">STORE LOCATOR</p>
                                <p>Find Nike retail stores near you</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </>
    )
}

export default page
