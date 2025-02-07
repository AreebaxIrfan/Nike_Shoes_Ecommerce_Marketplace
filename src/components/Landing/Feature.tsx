import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const Feature = () => {
  return (
    <section aria-labelledby="feature-heading">
        <h2 id="feature-heading" className="text-3xl sm:text-4xl font-bold mb-6">
          Feature
        </h2>
        <Image src="/feature.avif" alt="Featured product showcase" width={1344} height={700} className='w-full' />
        <div className="mt-8 text-center">
          <h3 className="text-2xl font-bold mb-4">STEPS INTO WHAT FEELS GOOD</h3>
          <p className="mb-6">Cause everyone should know the feeling of running in that perfect pair</p>
          <Link href="/products" className="bg-black text-white rounded-full px-6 py-2 inline-block">
            Find Your Shoe
          </Link>
        </div>
      </section>
  )
}

export default Feature
