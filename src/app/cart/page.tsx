"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { CiHeart } from "react-icons/ci"
import { RiDeleteBin6Line } from "react-icons/ri"
import { FiMinus, FiPlus } from "react-icons/fi"
import { useCart } from "./../context/CartContext"
import Summary from "./OrderSummary"
import CheckoutButton from "./checkoutButton"

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 0 // Assuming free shipping
  const total = subtotal + shipping
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }
  console.log(cart)

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Your Shopping Bag</h1>
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            {cart.length === 0 ? (
              <div className="bg-white shadow rounded-lg p-6 text-center">
                <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
                <Link
                  href="/products"
                  className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="bg-blue-100 p-4 rounded-lg mb-6">
                  <h2 className="text-lg font-semibold text-blue-800">Free Delivery</h2>
                  <p className="text-blue-600">
                    Applies to orders of 14,000.00 or more.{" "}
                    <button className="underline font-medium hover:text-blue-800 transition duration-300">
                      View details
                    </button>
                  </p>
                </div>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white shadow rounded-lg p-6 mb-6 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6"
                  >
                    <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                        <p className="text-lg font-medium text-gray-900">₹{item.price.toFixed(2)}</p>
                      </div>
                      <p className="text-gray-600 mb-2">Size: {item.size}</p> 
                      <div className="flex items-center space-x-2 mb-4">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                          className="text-gray-500 hover:text-gray-700 transition duration-300"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus size={20} />
                        </button>
                        <span className="font-medium text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="text-gray-500 hover:text-gray-700 transition duration-300"
                          aria-label="Increase quantity"
                        >
                          <FiPlus size={20} />
                        </button>
                      </div>
                      <div className="flex space-x-4">
                        <button
                          className="text-gray-500 hover:text-red-600 transition duration-300"
                          aria-label="Add to favorites"
                        >
                          <CiHeart size={24} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-gray-500 hover:text-red-600 transition duration-300"
                          aria-label="Remove from cart"
                        >
                          <RiDeleteBin6Line size={24} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="lg:col-span-4">
            <div className="bg-white shadow rounded-lg p-6 sticky top-6">
              <Summary subtotal={subtotal} shipping={shipping} total={total} />
              <div className="mt-6">
                {cart.length > 0 ? (
                 <CheckoutButton/>
                ) : (
                  <button className="w-full bg-gray-300 text-gray-500 px-6 py-3 rounded-md cursor-not-allowed" disabled>
                    Proceed to Checkout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage

