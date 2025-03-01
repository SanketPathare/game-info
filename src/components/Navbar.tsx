"use client";
import Link from "next/link";
import { useState } from "react";
import { Home, Info, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-neutral-900/75 py-4 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-10">
        <Link href="/" className="text-xl font-bold text-white">
          Game Info
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-6">
          <li>
            <Link
              href="/"
              className="flex items-center space-x-2 text-sm font-medium text-white hover:text-gray-300"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="flex items-center space-x-2 text-sm font-medium text-white hover:text-gray-300"
            >
              <Info size={18} />
              <span>About</span>
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-5">
          <ul className="container mx-auto px-4 py-2 space-y-4 ">
            <li>
              <Link
                href="/"
                onClick={toggleMenu}
                className="flex items-center space-x-2 text-sm font-medium hover:bg-neutral-700  p-2 rounded-md text-white hover:text-gray-300"
              >
                <Home size={18} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={toggleMenu}
                className="flex items-center space-x-2 text-sm font-medium hover:bg-neutral-700 p-2 rounded-md text-white hover:text-gray-300"
              >
                <Info size={18} />
                <span>About</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
