import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const Miss = () => {
  return (
    <section className="py-12" aria-labelledby="miss-heading">
    <h2 id="miss-heading" className="text-3xl sm:text-4xl font-bold mb-6">
      Do Not Miss
    </h2>
    <Image src="/miss.avif" alt="Do not miss promotion" width={1344} height={700} className="w-full" />
    <div className="mt-8 text-center">
      <h3 className="text-3xl sm:text-4xl font-bold mb-4">FLIGHT ESSENTIALS</h3>
      <p className="mb-6">Your built-to-last, all week wears-but with style only Jordan Brand can deliver</p>
      <Link href="/products" className="bg-black text-white rounded-full px-6 py-2 inline-block">
        Shop
      </Link>
    </div>
  </section>
  )
}

export default Miss
