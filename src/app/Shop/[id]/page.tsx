"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@sanity/client";
import { urlFor } from "@/sanity/lib/image";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: "2025-01-11",
});

type Product = {
  _id: string;
  name: string;
  price: number;
  discountPercentage?: number;
  priceWithoutDiscount?: number;
  rating?: number;
  ratingCount?: number;
  image: string;
  description?: string;
  location?: string;
};

const Dynamic: React.FC = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0); 
  const [outOfStock, setOutOfStock] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await sanityClient.fetch(
          `*[_type == "product" && _id == $id][0]{
            _id,
            name,
            price,
            discountPercentage,
            priceWithoutDiscount,
            rating,
            ratingCount,
            image,
            description,
            location
          }`,
          { id }
        );
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleIncrement = () => {
    if (quantity >= 10) {
      setOutOfStock(true);
    } else {
      setQuantity((prev) => prev + 1);
      setOutOfStock(false);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    setOutOfStock(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium">
        Loading product details, please wait...
      </div>
    );
  }

  if (!product) {
    return (
      <section className="flex flex-col items-center justify-center bg-gray-100 px-6 text-center">
        <div className="max-w-lg">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            Oops! The product you’re looking for doesn’t exist or has been removed. But don’t worry, we’ve got plenty of other amazing things for you to explore.
          </p>
          <a
            className="inline-block bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
            href="/Shop"
          >
            Back to Gallery
          </a>
        </div>
      </section>
    );
  }

  const { name, price, rating, ratingCount, image, description } = product;

  return (
    <section className="min-h-screen flex flex-col md:flex-row justify-center items-center gap-8 py-16 px-6 bg-gray-50">
      {/* Image Section */}
      <div className="img h-96 w-96 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
        <img
          src={urlFor(image).url()}
          alt={name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Content Section */}
      <div className="content w-full max-w-md h-full bg-white p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
        <div className="flex items-center space-x-2">
          {rating !== undefined ? (
            <>
              <span className="text-yellow-500 text-sm">
                ⭐ {rating.toFixed(1)}
              </span>
              <span className="text-sm text-gray-500">
                ({ratingCount || 0} reviews)
              </span>
            </>
          ) : (
            <span className="text-sm text-gray-500">No ratings available</span>
          )}
        </div>
        {description && (
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        )}
        <span className="text-xl font-bold text-green-600 block">
          ${price.toFixed(2)}
        </span>

        {/* Quantity Selector */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleDecrement}
            className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg shadow hover:bg-gray-300"
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg shadow hover:bg-gray-300"
          >
            +
          </button>
        </div>

        {/* Out of Stock Message */}
        {outOfStock && (
          <p className="text-red-500 text-sm mt-2">
            Maximum stock reached. Cannot add more than 10 items.
          </p>
        )}

        <a
          href="/Components/Contact"
          className="inline-block w-full px-6 py-3 text-center bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-200"
        >
          Buy Now
        </a>
      </div>
    </section>
  );
};

export default Dynamic;
