'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: 'axjzlhqu',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2025-01-11',
});

const Dynamic = () => {
  const params = useParams(); // Retrieve route parameters
  const { id } = params;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await sanityClient.fetch(
          `*[_type == "product" && _id == $id][0]{
            _id,
            name,
            description,
            price,
            image
          }`,
          { id }
        );
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium">
        Loading product details, please wait...
      </div>
    );
  }

  if (!product) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 text-center">
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

  return (
    <section className="flex flex-col md:flex-row justify-center items-center gap-2 mt-8 px-4">
      <div className="img h-96 w-96 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </div>
      <div className="content h-80 w-96 max-w-md border-0 p-6 bg-white">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <h3 className="text-lg text-gray-700 mb-4">{product.location}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
        <span className="text-xl font-bold text-green-600 block mb-4 pt-3">{product.price}</span>
        <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition">
          <a href="/Components/Contact">Buy Now</a>
        </button>
      </div>
    </section>
  );
};

export default Dynamic;
