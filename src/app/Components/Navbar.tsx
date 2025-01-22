"use client"
import Link from "next/link";
import { useState } from "react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-600">
          Pharma<span className="text-green-500">Q</span>
        </div>
</Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
         
          <Link href="/Shop" className="text-gray-700 hover:text-blue-600">
          Shop
          </Link>
          <Link href="#contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </Link>
        </div>

        {/* Hamburger Icon */}
        <button
          className="block md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link
            href="#home"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            href="/Shop"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
          >
            Shop
          </Link>
          <Link
            href="#contact"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
