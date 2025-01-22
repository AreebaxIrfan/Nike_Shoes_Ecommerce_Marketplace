"use client"
import { useState, useEffect } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"


interface Product {
  productName: string
  category: string
  price: number
  inventory: number
  colors: string[]
  status: string
  image: string
  description: string
  slug: string
}

interface SliderProps {
  onFilter: (categoryFilter: string[], colorFilter: string[], priceRange: [number, number]) => void
}

const Slider: React.FC<SliderProps> = ({ onFilter }) => {
  const [categoryFilter, setCategoryFilter] = useState<string[]>([])
  const [colorFilter, setColorFilter] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000])

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (categoryFilter.length > 0) params.set("category", categoryFilter.join(","))
    else params.delete("category")
    if (colorFilter.length > 0) params.set("color", colorFilter.join(","))
    else params.delete("color")
    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    router.push(`${pathname}?${params.toString()}`)
    onFilter(categoryFilter, colorFilter, priceRange)
  }, [categoryFilter, colorFilter, priceRange, searchParams, pathname, router, onFilter])

  const handleCategoryChange = (category: string) => {
    setCategoryFilter((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]))
  }

  const handleColorChange = (color: string) => {
    setColorFilter((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange([Number(event.target.value), 15000])
  }

  const categories = ["Men's Shoes", "Women's Shoes", "Men's T-Shirts", "Women's T-Shirts"]
  const colors = ["Red", "Blue", "Green", "Black", "White"] // Add more colors as needed

  return (
    <div className="w-60 h-screen bg-white text-black overflow-y-auto border-r border-gray-200 p-2">
      <div className="space-y-4">
        {/* Categories */}
        <div>
          <h2 className="font-bold mb-3 text-2xl">Categories</h2>
          <ul className="space-y-2 font-semibold text-xl">
            {categories.map((category) => (
              <li key={category}>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={categoryFilter.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <span>{category}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <hr className="border-gray-300" />
        {/* Colors */}
        <div>
          <h2 className="font-bold mb-3 text-2xl">Colors</h2>
          <ul className="space-y-2 font-semibold text-xl">
            {colors.map((color) => (
              <li key={color}>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={colorFilter.includes(color)}
                    onChange={() => handleColorChange(color)}
                  />
                  <span>{color}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <hr className="border-gray-300" />
        {/* Shop by Price */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Shop by Price</h2>
          <input
            type="range"
            min="0"
            max="15000"
            value={priceRange[0]}
            onChange={handlePriceChange}
            className="w-full"
          />
          <div>
            Price: ₹{priceRange[0]} - ₹{priceRange[1]}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slider

