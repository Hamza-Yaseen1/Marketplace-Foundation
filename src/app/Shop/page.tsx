"use client";

import { useState, useEffect } from "react";
import { createClient } from "@sanity/client";
import ProductCard from "../Components/ProductCard";
const sanityClient = createClient({
  projectId: "axjzlhqu",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: "2025-01-11",
});

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await sanityClient.fetch(
          `*[_type == "product"]{
            _id,
            name,
            price,
            discountPercentage,
            priceWithoutDiscount,
            rating,
            ratingCount,
            image
          }`
        );
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium">
        Loading products, please wait...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
        Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product: any) => (
          <a key={product._id} href={`/Shop/${product._id}`} >
            <a>
              <ProductCard {...product} />
            </a>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Shop;
