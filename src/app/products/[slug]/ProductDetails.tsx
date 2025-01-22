"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useCart } from "../../context/CartContext"
import { useWishlist } from "../../context/WishlistContext"
import { toast, Toaster } from "react-hot-toast"

interface Product {
  _id: string
  productName?: string
  description?: string
  slug: string
  price?: number
  category?: string
  color: string
  image?: {
    url?: string
  }
}

const ProductDetails: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart()
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const [size, setSize] = useState("")

  const handleAddToCart = () => {
    if (product._id && product.productName && product.price && product.image?.url) {
      addToCart({
        id: product._id,
        name: product.productName,
        price: product.price,
        image: product.image.url,
        size: size,
        quantity: 1,
      })
      toast.success(`${product.productName} added to cart!`, {
        duration: 3000,
        position: "top-center",
        icon: "🛒",
      })
    } else {
      toast.error("Failed to add to cart. Please try again.", {
        duration: 3000,
        position: "top-center",
      })
    }
  }

  const handleWishlistToggle = () => {
    if (!product._id || !product.productName || !product.price || !product.image?.url) {
      toast.error("Failed to update wishlist. Please try again.", {
        duration: 3000,
        position: "top-center",
      })
      return
    }

    const isInWishlist = wishlist.some((item) => item.id === product._id)
    if (isInWishlist) {
      removeFromWishlist(product._id)
      toast.success(`${product.productName} removed from wishlist!`, {
        duration: 3000,
        position: "top-center",
        icon: "💔",
      })
    } else {
      addToWishlist({
        id: product._id,
        productName: product.productName,
        price: product.price,
        image: product.image.url,
        slug: product.slug,
      })
      toast.success(`${product.productName} added to wishlist!`, {
        duration: 3000,
        position: "top-center",
        icon: "❤️",
      })
    }
  }

  const isInWishlist = wishlist.some((item) => item.id === product._id)

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <Toaster />
      <div className="flex flex-col lg:flex-row lg:space-x-12">
        {/* Product Image */}
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <div className="relative aspect-square overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={product.image?.url || "/placeholder.png"}
              alt={product.productName || "Product image"}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 ease-in-out hover:scale-110"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 space-y-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-2 text-gray-900">{product.productName}</h1>
            <p className="text-xl text-gray-600">{product.category}</p>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700 text-lg font-medium">Color:</span>
            <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-800">{product.color}</span>
          </div>

          <p className="text-4xl font-bold text-gray-900">₹{product.price?.toLocaleString() || "Not Available"}</p>

          <div>
            <label htmlFor="size" className="block text-lg font-medium text-gray-700 mb-2">
              Size
            </label>
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
            >
              <option value="">Select Size</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">X-Large</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleAddToCart}
              disabled={!size}
              className="flex-1 flex items-center justify-center px-8 py-4 bg-black text-white text-lg font-semibold rounded-full transition duration-300 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              <AiOutlineShoppingCart size={24} className="mr-2" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={handleWishlistToggle}
              className="flex-1 flex items-center justify-center px-8 py-4 bg-white text-black text-lg font-semibold border-2 border-black rounded-full transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transform hover:scale-105"
            >
              {isInWishlist ? (
                <FaHeart className="mr-2" size={24} color="red" />
              ) : (
                <FaRegHeart className="mr-2" size={24} />
              )}
              <span>{isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

