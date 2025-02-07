'use client';
import Image from 'next/image';
import Link from 'next/link';
import { AllProducts } from '@/sanity/types/type';
import React from 'react';

interface ProductCardProps {
  product: AllProducts;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isSoldOut = product.inventory === 0;

  return (
    <div className="p-2 border rounded shadow-sm">
      <Link href={`/products/${product.slug}`}>
        <Image
          src={product.image}
          alt={product.productName}
          width={700}
          height={700}
          className="mb-2 object-cover h-[96]"
          priority
        />
      </Link>
      {isSoldOut ? (
        <span className="text-sm font-medium text-red-600">Sold Out</span>
      ) : (
        <span className="text-sm font-medium text-yellow-600">{product.status}</span>
      )}
      <h3 className="font-semibold text-lg mb-1">{product.productName}</h3>
      <span className="block text-sm text-gray-500 mb-2">{product.category}</span>
      <p className="font-bold text-gray-800">Rs. {product.price}</p>
    </div>
  );
};

export default ProductCard;