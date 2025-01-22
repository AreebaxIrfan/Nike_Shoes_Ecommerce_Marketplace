import { createClient } from "next-sanity"
import { groq } from "next-sanity"

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-05-03",
  useCdn: false,
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
      "image": image.asset->{
        url
      }
    }`,
  )
}

