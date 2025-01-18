import { urlFor } from '@/sanity/lib/image';
import React from 'react';

interface ProductCardProps {
  name: string;
  price: number;
  discountPercentage: number;
  priceWithoutDiscount: number;
  rating: number;
  ratingCount: number;
  image: any; // Sanity image object
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  discountPercentage,
  priceWithoutDiscount,
  rating,
  ratingCount,
  image,
}) => {
  return (
    <>
<div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden h-96 flex flex-col">
      <img
        className="w-full h-40 object-cover"
        src={urlFor(image).url()} // Use Sanity image URL
        alt={name}
      />
      <div className="p-4 flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>
        <div className="mt-2 flex items-center">
          <span className="text-xl font-bold text-gray-900">${price.toFixed(2)}</span>
          <span className="ml-2 text-sm line-through text-gray-500">${priceWithoutDiscount.toFixed(2)}</span>
          <span className="ml-2 text-sm text-green-600">-{discountPercentage}%</span>
        </div>
        <div className="mt-2 flex items-center">
          <span className="text-sm text-yellow-500">⭐ {rating.toFixed(1)}</span>
          <span className="ml-2 text-sm text-gray-500">({ratingCount} reviews)</span>
        </div>
      </div>
      <div className="p-4">
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
          Buy Now
        </button>
      </div>
    </div>
</>
    
  );
};

export default ProductCard;
