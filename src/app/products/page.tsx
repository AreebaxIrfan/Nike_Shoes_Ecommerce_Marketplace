import { groq } from "next-sanity"
import { client } from "@/sanity/lib/client"
import ProductPageClient from "./../../components/ProductpageClient"

interface Product {
  productName: string
  status: string
  slug: {
    current: string
  }
  price: number
  description: string
  category: string
  image: {
    url: string
  }
}

async function getProducts() {
  const query = groq`*[_type == "product"] {
    productName,
    status,
    slug,
    price,
    description,
    category,
    "image": image.asset->{
      url
    }
  }`
  return client.fetch(query)
}

export default async function ProductPage() {
  const products: Product[] = await getProducts()

  
  return <ProductPageClient initialProducts={products} />
}

