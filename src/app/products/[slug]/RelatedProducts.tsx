import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { client } from "@/sanity/lib/client"
import { useCart } from "../../context/CartContext"
import Link from "next/link"

interface RelatedProductsProps {
  category: string | undefined
  currentProductId: string
}

interface Product {
  _id: string
  productName: string
  price: number
  image: {
    url: string
  }
  slug:string
  status: string
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ category, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (category) {
        const query = `*[_type == "product" && category == "${category}" && _id != "${currentProductId}"][0...4] {
          _id,
          productName,
          status,
          price,
          slug,
          "image": image.asset->{
            url
          }
        }`
        const products = await client.fetch(query)
        setRelatedProducts(products)
      }
    }

    fetchRelatedProducts()
  }, [category, currentProductId])

  const handleAddToCart = (product: Product) => {
    addToCart({
        id: product._id,
        name: product.productName,
        price: product.price,
        image: product.image.url,
        quantity: 1,
        color: "",
        size: ""
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48 mb-2">
              <Image
                src={product.image.url || "/placeholder.svg"}
                alt={product.productName}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <h2 className="font-bold text-orange-800">{product.status}</h2>
            <Link href={`/products/${product.slug}`}  className="font-semibold text-lg mb-1">{product.productName}</Link>
            <p className="text-gray-600">₹{product.price.toLocaleString()}</p>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts

