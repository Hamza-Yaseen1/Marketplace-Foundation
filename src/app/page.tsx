'use client';
import { useState, useEffect } from "react";
import ProductCard from "./Components/ProductCard";
import { createClient } from '@sanity/client';
import Hero from "./Components/Hero";

const sanityClient = createClient({
  projectId: 'axjzlhqu',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2025-01-11',
});

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6); // Number of products to show initially
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await sanityClient.fetch(`*[_type == "product"]{
          name,
          price,
          discountPercentage,
          priceWithoutDiscount,
          rating,
          ratingCount,
          image
        }`);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const showMoreProducts = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Increase the number of visible products
  };

  const limitedProducts = products.slice(0, visibleCount);

  if (loading) {
    return <div>Sabr kar Yar...</div>;
  }

  return (
    <> <Hero/> 
    <div className="p-4">
          <h1 className="text-5xl p-4 mb-4 font-semibold text-gray-800 text-center">Products</h1>
          
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {limitedProducts.map((product: any) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </div>
      {visibleCount < products.length && ( // Show the button only if there are more products to show
        <button
          onClick={showMoreProducts}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Show More Products
        </button>
      )}
    </div>
    </>
  );
}
