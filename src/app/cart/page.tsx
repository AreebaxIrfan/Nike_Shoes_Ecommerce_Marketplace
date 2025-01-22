'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CiHeart } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useCart } from './../context/CartContext';
import Summary from '../../components/OrderSummary';
import Link from 'next/link';


const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const subtotal = cart.reduce((total, item) => total + item.price, 0);
  const shipping = 0; // Assuming free shipping
  const total = subtotal + shipping;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid sm:grid-cols-12 gap-3 sm:px-8 p-3 sm:p-2">
        <div className="sm:col-span-8 col-span-12">
          <div className="sm:ml-20 mt-9">
            <div className="bg-secondary p-2 w-full flex flex-col">
              <h1 className="text-xl font-semibold">Free Delivery</h1>
              <h1>
                Applies to orders of 14 000.00 or more
                <span className="mr-8 underline font-bold">View details</span>
              </h1>
            </div>
            <h1 className="text-2xl font-semibold mt-5 mb-5">Bag</h1>
            {cart.map((item) => (
              <div key={item.id} className="flex flex-row border-b-2 border-gray-300 mb-7">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={150}
                  height={150}
                  className="mb-9"
                />
                <div className="flex flex-col justify-start ml-11">
                  <div className="flex flex-row space-x-5 justify-between">
                    <h1 className="mb-2 font-semibold">{item.name}</h1>
                    <h1>MRP: {item.price.toFixed(2)}</h1>
                  </div>
                  <p className="mb-2">{item.size}</p>
                  <div className="flex flex-row justify-between mt-2">
                    <p>Size: {item.size}</p>
                  </div>
                  <div className="flex flex-row mt-4 font-bold mb-9">
                    <button className="mr-4">
                      <CiHeart size={24} className="font-bold text-black" />
                    </button>
                    <button onClick={() => removeFromCart(item.id, item.size)}>
                      <RiDeleteBin6Line size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {cart.length === 0 && <p>Your cart is empty. Start shopping!</p>}
          </div>
        </div>
        <div className="sm:col-span-4 sm:mr-4 col-span-12 sm:mt-0 mt-9 p-8 sm:p-2">
        <Summary subtotal={subtotal} shipping={shipping} total={total} />
        <div className="flex justify-center items-center w-full mb-11">
            {cart.length > 0 ? (
              <Link href="/checkout" className="bg-black px-24 py-3 rounded-l-full rounded-r-full text-white">
                Member Checkout
              </Link>
            ) : (
              <button className="bg-gray-400 px-24 py-3 rounded-l-full rounded-r-full text-white cursor-not-allowed" disabled>
                Member Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

