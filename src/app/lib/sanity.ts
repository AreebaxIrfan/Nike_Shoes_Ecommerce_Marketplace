import { createClient } from "next-sanity"
import { groq } from "next-sanity"

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-01-10',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export async function getProducts() {
  return client.fetch(
    groq`*[_type == "product"] {
      _id,
      productName,
      status,
      slug,
      price,
      description,
      category,
   
      inventory,
      "image": image.asset->{
        url
      }
    }`,
  )
}

