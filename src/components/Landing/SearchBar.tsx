"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { CiSearch } from "react-icons/ci"
import { getProducts } from "../../app/lib/sanity"

interface Product {
  _id: string
  productName: string
  slug: {
    current: string
  }
}


export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts()
        setProducts(fetchedProducts)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownVisible(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = products.filter((product) =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredProducts(filtered)
      setIsDropdownVisible(true)
    } else {
      setFilteredProducts([])
      setIsDropdownVisible(false)
    }
  }, [searchQuery, products])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="flex items-center px-5">
      <div className="relative flex-grow" ref={searchRef}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <CiSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {isDropdownVisible && filteredProducts.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {filteredProducts.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product.slug}`}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50 block"
                onClick={() => setIsDropdownVisible(false)}
              >
                {product.productName}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

