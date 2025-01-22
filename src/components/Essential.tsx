import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const Essential = () => {
    return (
        <section className="py-12" aria-labelledby="essentials-heading">
        <h2 id="essentials-heading" className="text-2xl font-bold mb-6">
          The Essentials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {["Men", "women", "Kids"].map((category) => (
            <div key={category} className="relative">
              <Image
                src={`/${category.toLowerCase()}.avif`}
                alt={`${category}'s Collection`}
                width={440}
                height={540}
                className="w-full"
              />
              <Link
                href={`/${category.toLowerCase()}`}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-2 rounded-full font-bold"
              >
                {category}
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            { title: "Icons", items: ["Air Force 1", "Huarache", "Air Max 90", "Air Max 95"] },
            { title: "Shoes", items: ["All Shoes", "Custom Shoes", "Jordan Shoes", "Running Shoes"] },
            { title: "Clothing", items: ["All clothing", "Modest Wear", "Hoodies & Pullovers", "Shirts & Tops"] },
            {
              title: "Kids",
              items: ["Infant & Toddler Shoes", "Kids Shoes", "Kids Jordan Shoes", "Kids Basketball Shoes"],
            },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="font-bold mb-3">{section.title}</h3>
              <ul>
                {section.items.map((item) => (
                  <li key={item} className="mb-2">
                    <Link href="#" className="text-gray-600 hover:text-black">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    )
}

export default Essential
