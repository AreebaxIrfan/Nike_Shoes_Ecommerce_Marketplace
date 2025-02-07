import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import ProductDetails from './ProductDetails';
import { client } from '@/app/lib/sanity';

interface Product {
  _type: 'product';
  _id: string;
  slug: string;
  productName: string;
  description?: string;
  color: string;
 inventory?: number;
  price?: number;
 
  category?: string;
  image?: {
    url?: string;
  };
}
async function getProduct(slug: string): Promise<Product | null> {
  const query = `*[_type == "product" && slug == "${slug}"][0] {
    _id,
    price,
    productName,
    slug,
    description,
    category,
    inventory,
    "image": image.asset->{
      url,
    }
  }`;

  return await client.fetch(query);
}
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) {
    notFound();
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetails product={product} />
    </Suspense>
  );
}

