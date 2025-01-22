import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import ProductDetails from './ProductDetails';
import { client } from '@/sanity/lib/client';


interface Product {
  _type: 'product';
  _id: string;
  slug: string;
  productName: string;
  description?: string;
  color: string;
  status?: string;
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
    "image": image.asset->{
      _id,
      url,
      mimeType,
      extension,
      size,
      metadata,
      originalFilename,
      _createdAt,
      _updatedAt
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

