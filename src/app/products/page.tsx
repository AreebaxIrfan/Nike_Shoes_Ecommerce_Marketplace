"use client"
import { useEffect, useState, useMemo, useRef } from "react"
import ProductCard from "@/components/ProductCard"
import { fetchProducts } from "@/sanity/schemaTypes/data-fetch-utils"
import type { AllProducts as Iproduct } from "@/sanity/types/type"
import FilterSidebar from "./Slider"
import PaginationComponent from "@/components/Pagination"
import { MdOutlineSearchOff } from "react-icons/md"

type SortOption = "featured" | "newest" | "price-asc" | "price-desc"

export default function AllProducts() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [products, setProducts] = useState<Iproduct[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
  const sortDropdownRef = useRef<HTMLDivElement>(null)

  const productsPerPage = 12

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts()
        setProducts(data)
      } catch (error) {
        console.error(error)
      }
    }

    loadProducts()
  }, [])

  const categories = useMemo(
    () => ["Men's Shoes", "Women's Shoes", "Men's Running Shoes", "Men's Training Shoes", "Top"],
    [],
  )

  const filteredProducts = useMemo(() => {
    return products.filter((product) => (selectedCategory ? product.category === selectedCategory : true))
  }, [products, selectedCategory])

  const sortedProducts = useMemo(() => {
    switch (sortBy) {
      case "newest":
        return [...filteredProducts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      case "price-asc":
        return [...filteredProducts].sort((a, b) => a.price - b.price)
      case "price-desc":
        return [...filteredProducts].sort((a, b) => b.price - a.price)
      default:
        return filteredProducts
    }
  }, [filteredProducts, sortBy])

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = useMemo(() => {
    return sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  }, [sortedProducts, indexOfFirstProduct, indexOfLastProduct])

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">New Arrivals</h1>
        <button
          className="mt-2 sm:mt-0 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out sm:hidden"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Hide Filters" : "Show Filters"}
        </button>
      </div>
      <div className="flex flex-col md:flex-row flex-1">
        <FilterSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen} selectedSort={""} setSelectedSort={function (sort: string): void {
            throw new Error("Function not implemented.")
          } }        />
        <main className="flex-grow md:w-3/4 p-4 relative">
         
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => <ProductCard key={product.slug} product={product} />)
            ) : selectedCategory ? (
              <div className="col-span-full flex flex-col justify-center items-center text-center py-12">
                <MdOutlineSearchOff className="text-5xl text-gray-400 mb-4" />
                <p className="text-lg text-gray-500">No products found in this category</p>
              </div>
            ) : (
              <div className="col-span-full flex justify-center items-center py-12">
                <p className="text-lg text-gray-500">Loading products...</p>
              </div>
            )}
          </div>
          {currentProducts.length > 0 && (
            <div className="mt-8">
              <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

