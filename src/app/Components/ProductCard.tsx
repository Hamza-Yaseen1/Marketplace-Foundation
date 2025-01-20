import { urlFor } from '@/sanity/lib/image';
import React from 'react';

interface ProductCardProps {
  name: string;
  price: number;
  discountPercentage: number;
  priceWithoutDiscount: number;
  rating: number;
  ratingCount: number;
  image: any; 
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
    <div className=" max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden h-auto flex flex-col hover:shadow-2xl hover:scale-105 transition-transform duration-300">
      {/* Product Image */}
      <img
        className="w-full h-48 object-cover"
        src={urlFor(image).url()} // Use Sanity image URL
        alt={name}
      />
      {/* Product Details */}
      <div className="p-4 flex-grow ">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {name}
        </h2>
        <div className="mt-2 flex items-center space-x-2">
          <span className="text-xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          <span className="text-sm line-through text-gray-500">
            ${priceWithoutDiscount.toFixed(2)}
          </span>
          <span className="text-sm text-green-600">-{discountPercentage}%</span>
        </div>
        <div className="mt-2 flex items-center space-x-1">
          <span className="text-orange-600 text-sm">⭐ {rating.toFixed(1)}</span>
          <span className="text-sm text-gray-500">({ratingCount} reviews)</span>
        </div>
      </div>

      {/* Buy Now Button */}
      <div className="p-4">
        <button className=" text-black py-2 px-4 rounded-3xl items-center font-mono border border-blue-950 hover:bg-blue-950 hover:text-white transition duration-300">
          + Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
