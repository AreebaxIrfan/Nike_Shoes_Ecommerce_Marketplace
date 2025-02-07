import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { IoLocationOutline } from 'react-icons/io5'


const Footer = () => {
  return (
    <footer className="bg-black w-full text-white py-10  px-6">

      <div className="container mx-auto lg:grid lg:grid-cols-4 lg:gap-8">
        
        <div className="mb-4 sm:mb-0">
          <h3 className="text-base font-semibold mb-4">FIND A STORE</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/sign-up" className="hover:underline">Become Link Member</Link></li>
            <li><Link href="/sign-in" className="hover:underline">Sign Up for Email</Link></li>
          </ul>
        </div>

        <div className="mb-4 sm:mb-0">
          <h3 className="text-base font-semibold mb-4">GET HELP</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/order" className="hover:underline">Order Status</Link></li>
            <li><Link href="/help" className="hover:underline">Contact Us on Nike.com</Link></li>
            <li><Link href="/help" className="hover:underline">Contact Us on All Other Inquiries</Link></li>
          </ul>
        </div>

        
        <div className="mb-4 sm:mb-0">
          <h3 className="text-base font-semibold mb-4">LINK NIKY</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/men" className="hover:underline">Mens</Link></li>
            <li><Link href="/women" className="hover:underline">Womens</Link></li>
            <li><Link href="/products" className="hover:underline">Products</Link></li>
          </ul>
        </div>

   
        <div className="flex justify-start lg:justify-end items-start gap-4">
          <FaTwitter className="text-lg cursor-pointer hover:text-gray-400" />
          <FaFacebook className="text-lg cursor-pointer hover:text-gray-400" />
          <FaYoutube className="text-lg cursor-pointer hover:text-gray-400" />
          <FaInstagram className="text-lg cursor-pointer hover:text-gray-400" />
        </div>
      </div>

    
      <div className="mt-8 flex flex-wrap justify-between items-center text-xs text-gray-400 lg:flex-nowrap lg:gap-4">

        <div className="flex items-center gap-2">
          <IoLocationOutline className="text-sm" />
          <p>Pakistan</p>
          <p>© 2025 Niky, Inc. All Rights Reserved</p>
        </div>

        <div className="flex flex-wrap gap-4 mt-4 lg:mt-0 lg:justify-end sm:justify-start">
          <Link href="/help" className="hover:underline">Guides</Link>
          <Link href="/help" className="hover:underline">Terms of Use</Link>
          <Link href="/help" className="hover:underline">Nike Privacy Policy</Link>
        </div>
      </div>


    </footer>
  )
}

export default Footer
