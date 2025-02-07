import { client } from "../lib/client";
import { AllProducts as Iproduct } from '@/sanity/types/type';
import { allProductsDetailQuery } from "./fetchQuery";

export const fetchProductBySlug = async (slug: string) => {
    const product = await client.fetch(allProductsDetailQuery, { slug });
    return product;
  };
  
export const allProductsQuery = `*[_type == "product"]{
  _id,
  productName,
  price,
   slug,
  category,
  status,
  "imageUrl": image.asset->url
}`;

export const fetchProducts = async (): Promise<Iproduct[]> => {
  try {
    const result = await client.fetch(allProductsQuery);
    return result.map((product: Iproduct) => ({
      productName: product.productName,
      category: product.category,
      price: product.price.toString(),
      image: product.imageUrl,
      slug: product.slug,
      status: product.status,
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Unable to fetch products');
  }
};