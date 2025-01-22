import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className="text-sm text-gray-400">
            We provide a wide range of pharmaceutical products, ensuring quality and affordability. Your health, our priority.
          </p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-bold mb-4">Customer Service</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>
              <a href="/help" className="hover:text-white">
                Help & Support
              </a>
            </li>
            <li>
              <a href="/returns" className="hover:text-white">
                Returns & Refunds
              </a>
            </li>
            <li>
              <a href="/shipping" className="hover:text-white">
                Shipping Policy
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-white">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>
              <a href="/products" className="hover:text-white">
                Browse Products
              </a>
            </li>
            <li>
              <a href="/categories" className="hover:text-white">
                Categories
              </a>
            </li>
            <li>
              <a href="/deals" className="hover:text-white">
                Today&apos;s Deals
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe to our newsletter to get the latest updates and offers.
          </p>
         <div className="flex flex-col items-center  sm:flex-row">
         <form className=" items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto px-4 py-2 text-sm text-gray-900 rounded-md focus:ring focus:ring-blue-500"
            />
        
            <button
              type="submit"
              className="bg-blue-600 px-4 py-2 mt-3 text-sm font-semibold text-white rounded-md hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
         </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-6 text-sm text-gray-400 text-center">
        <p>&copy; {new Date().getFullYear()} Pharmacy Marketplace. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
