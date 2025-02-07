"use client"
import { useState } from "react"
import Image from "next/image"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useCart } from "../../context/CartContext"
import { useWishlist } from "../../context/WishlistContext"
import { toast, Toaster } from "react-hot-toast"
import FAQAndReviews from "./FAQAndReviews"
import RelatedProducts from "./RelatedProducts"

interface Product {
  _id: string
  productName?: string
  description?: string
  slug: string
  price?: number
  category?: string
  color: string
  inventory?: number
  status?: string
  tags?: string[]
  image?: {
    url?: string
  }
}

const ProductDetails: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart()
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const [size, setSize] = useState("")

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]") // Retrieve cart data from localStorage
    const isAlreadyInCart = cartItems.some((item: any) => item.id === product._id)

    if (isAlreadyInCart) {
      toast.error("You have already added this product to the cart!", {
        duration: 3000,
        position: "top-center",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      })
      return
    }

    if (product._id && product.productName && product.price && product.image?.url) {
      const newCartItem = {
        id: product._id,
        name: product.productName,
        price: product.price,
        image: product.image.url,
        size: size,
        quantity: 1,
        color: product.color,
      }

      // Add item to the cart
      addToCart(newCartItem)

      // Save updated cart in localStorage
      localStorage.setItem("cart", JSON.stringify([...cartItems, newCartItem]))

      toast.success(<span className="font-medium">{`${product.productName} added to cart!`}</span>, {
        duration: 3000,
        position: "top-center",
        icon: "🛒",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      })
    } else {
      toast.error("Failed to add to cart. Please try again.", {
        duration: 3000,
        position: "top-center",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      })
    }
  }



  const handleWishlistToggle = () => {
    if (!product._id || !product.productName || !product.price || !product.image?.url) {
      toast.error("Failed to update wishlist. Please try again.", {
        duration: 3000,
        position: "top-center",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
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
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      })
    } else {
      addToWishlist({
        id: product._id,
        productName: product.productName,
        price: product.price,
        image: product.image.url,
        slug: product.slug,
      })
      toast.success(<span className="font-medium">{`${product.productName} added to wishlist!`}</span>, {
        duration: 3000,
        position: "top-center",
        icon: "❤️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      })
    }
  }

  const isInWishlist = wishlist.some((item) => item.id === product._id)

    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <Toaster />
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Product Image */}
              <div className="lg:w-2/5 relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image?.url || "/placeholder.png"}
                    alt={product.productName || "Product image"}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                </div>
              </div>
  
              {/* Product Details */}
              <div className="lg:w-3/5 p-8 space-y-6 bg-white flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">{product.productName}</h1>
                    <div className="flex items-center gap-2">
                      <span className="text-lg text-gray-600 font-medium">{product.category}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-lg text-gray-500">
                        {product.inventory} in stock
                      </span>
                    </div>
                  </div>
  
                  {product.tags && (
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
  
                  <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
  
                  <div className="flex gap-4 items-center">
                    <span className="text-xl text-gray-800 font-medium">Color:</span>
                    <span 
                      className="w-8 h-8 rounded-full border-2 border-gray-200 shadow-sm" 
                      style={{ backgroundColor: product.color }}
                      title={product.color}
                    />
                  </div>
  
                  <div className="text-5xl font-bold text-zinc-950">
                    Rs: {product.price?.toLocaleString() || "N/A"}
                  </div>
                </div>
  
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-lg font-medium text-gray-800">Select Size</label>
                    <div className="grid grid-cols-4 gap-3">
                      {['S', 'M', 'L', 'XL'].map((s) => (
                        <button
                          key={s}
                          onClick={() => setSize(s)}
                          className={`p-3 text-center rounded-lg border-2 transition-all
                            ${size === s 
                              ? 'border-gray-600 bg-gray-50 text-gray-700' 
                              : 'border-gray-200 hover:border-gray-400 text-gray-700'}
                          `}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleAddToCart}
                      disabled={!size || product.inventory === 0  }
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 text-white text-lg font-semibold rounded-xl transition-all
                        hover:bg-gray-700 hover:shadow-lg hover:-translate-y-0.5
                        disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-gray-600 disabled:cursor-not-allowed"
                    >
                      <AiOutlineShoppingCart size={24} />
                      {JSON.parse(localStorage.getItem("cart") || "[]").some((item: any) => item.id === product._id)
                        ? "Already in Cart"
                        : product.inventory === 0
                          ? "Out of Stock"
                          : "Add to Cart"}
                    </button>
  
                    <button
                      onClick={handleWishlistToggle}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white text-gray-800 text-lg font-semibold rounded-xl border-2 border-gray-600 transition-all
                        hover:bg-gray-50 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      {isInWishlist ? (
                        <FaHeart className="text-red-500 animate-pulse" size={20} />
                      ) : (
                        <FaRegHeart className="text-gray-600" size={20} />
                      )}
                      Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
            <FAQAndReviews productName={product.productName || "Unknown Product"} />
          </div>
  
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
            <RelatedProducts category={product.category} currentProductId={product._id} />
          </div>
        </div>
      </div>
  )
}

export default ProductDetails

