"use client";

import { useState, useEffect } from "react";
import { createClient } from "@sanity/client";
import ProductCard from "../Components/ProductCard";
import { LuArrowDownUp } from "react-icons/lu";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: "2025-01-11",
});

interface Product {
  _id: string;
  name: string;
  price: number;
  discountPercentage: number;
  priceWithoutDiscount: number;
  rating: number;
  ratingCount: number;
  image: string;
}

function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("lowToHigh"); // Default sort order
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown visibility state

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

  // Handle sorting the products based on selected order
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "lowToHigh") {
      return a.price - b.price;
    }
    if (sortOrder === "highToLow") {
      return b.price - a.price;
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium">
        Loading products, please wait...
      </div>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium">
        Error fetching products
      </div>
    );
  }
 

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
        Our Products
      </h1>

      {/* Filter Icon and Dropdown */}
      <div className="mb-6 flex justify-end items-center relative">
        <button
          className="flex items-center space-x-2"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <LuArrowDownUp size={24} className="text-gray-700" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-32 mb-9 bg-white border border-gray-300 rounded-lg shadow-lg">
            <ul className="py-1">
              <li
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  sortOrder === "lowToHigh" ? "font-sans text-blue-600" : ""
                }`}
                onClick={() => {
                  setSortOrder("lowToHigh");
                  setIsDropdownOpen(false); // Close dropdown after selection
                }}
              >
                Price: Low to High
              </li>
              <li
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  sortOrder === "highToLow" ? " text-blue-600" : ""
                }`}
                onClick={() => {
                  setSortOrder("highToLow");
                  setIsDropdownOpen(false); 
                }}
              >
                Price: High to Low
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedProducts.map((product) => (
          <a key={product._id} href={`/Shop/${product._id}`}>
            <ProductCard {...product} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Shop;
