"use client"
import { useState, useEffect, useRef, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { IoFilter } from "react-icons/io5"
import { IoIosArrowDown } from "react-icons/io"
import Slider from "./../app/products/Slider"


interface Product {
  productName: string
  status: string
     slug: string;
  price: number
  description: string
  category: string
  image: {
    url: string
  }
}

type SortOption = "featured" | "newest" | "price-asc" | "price-desc"

const ProductPageClient = ({ initialProducts }: { initialProducts: Product[] }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)
  const [isFilterVisible, setIsFilterVisible] = useState(true)
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const sortDropdownRef = useRef<HTMLDivElement>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 9

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleFilter = (categoryFilter: string[], colorFilter: string[], priceRange: [number, number]) => {
    const filtered = products.filter((product) => {
      const categoryMatch = categoryFilter.length === 0 || categoryFilter.includes(product.category)
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
      const searchMatch =
        product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      return categoryMatch && priceMatch && searchMatch
    })

    setFilteredProducts(filtered)
    setCurrentPage(1)
  }

  const toggleFilterVisibility = () => setIsFilterVisible(!isFilterVisible)
  const toggleSortDropdown = () => setIsSortDropdownOpen(!isSortDropdownOpen)

  const handleSortChange = (option: SortOption) => {
    setSortBy(option)
    setIsSortDropdownOpen(false)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    setCurrentPage(1)
  }

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.slug.current).getTime() - new Date(a.slug).getTime()
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      default:
        return 0
    }
  })

  const getSortByLabel = (option: SortOption): string => {
    const labels = {
      featured: "Featured",
      newest: "Newest",
      "price-asc": "Price: Low to High",
      "price-desc": "Price: High to Low",
    }
    return labels[option] || "Sort By"
  }

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md mb-4 sm:mb-0 sm:mr-4"
        />
        <h1 className="text-2xl font-bold mb-4 md:mb-0">New({sortedProducts.length})</h1>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center">
          <button
            className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-md"
            onClick={toggleFilterVisibility}
          >
            <span>{isFilterVisible ? "Hide" : "Show"} Filters</span>
            <IoFilter size={20} />
          </button>
          <div className="relative" ref={sortDropdownRef}>
            <button
              className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-md"
              onClick={toggleSortDropdown}
            >
              <span>Sort By: {getSortByLabel(sortBy)}</span>
              <IoIosArrowDown
                size={24}
                className={`transform transition-transform ${isSortDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isSortDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <div className="py-1">
                  {(["featured", "newest", "price-asc", "price-desc"] as SortOption[]).map((option) => (
                    <button
                      key={option}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleSortChange(option)}
                    >
                      {getSortByLabel(option)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {isFilterVisible && (
          <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
            <Suspense>
              <Slider onFilter={handleFilter} />
            </Suspense>
          </div>
        )}

        <div className={`w-full ${isFilterVisible ? "lg:w-3/4 lg:pl-8" : "lg:w-full"}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((product) => (
              <div key={product.slug} className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={product.image.url || "/placeholder.svg"}
                    alt={product.productName}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <p className="text-red-600 font-semibold mb-1">{product.status}</p>
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-lg font-bold text-black hover:underline mb-2 block"
                    >
                      {product.productName}
                    </Link>
                    <p className="text-gray-600 mb-2">{product.category}</p>
                  </div>
                  <p className="text-lg font-medium">MRP: ₹{product.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPageClient

