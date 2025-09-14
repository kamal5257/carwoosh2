"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, User, Search, Wrench, Home, LogOut } from "lucide-react";
import { logout } from "@/utils/auth"; 
import { getCartItems } from "@/utils/cart"; // ✅ utility to read cart from localStorage or API

import "@/components/styles/header.css";

interface HeaderProps {
  cartCount?: number; // optional prop (fallback to internal state)
}

export const Header = ({ cartCount: externalCount = 0 }: HeaderProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState<number>(externalCount);

  const router = useRouter();

  useEffect(() => {
    // ✅ Load cart count dynamically
    const items = getCartItems();
    setCartCount(items.length);

    // ✅ Optional: Listen for cart updates via window event
    const handleCartUpdate = () => {
      const updatedItems = getCartItems();
      setCartCount(updatedItems.length);
    };

    window.addEventListener("cart-updated", handleCartUpdate);
    return () => window.removeEventListener("cart-updated", handleCartUpdate);
  }, []);

  const handleLogout = () => {
    logout(); 
  };

  return (
    <>
      {/* ✅ Desktop Header */}
      <header className="desktop-header hidden md:flex fixed top-0 left-0 right-0 bg-gray-50 border-b border-gray-300 shadow-sm z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Left: Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            CarCare
          </Link>

          {/* Center: Search Bar */}
          <div className="desktop-search w-full max-w-lg mx-6">
            <input
              type="text"
              placeholder="Search for services, products..."
              className="search-input w-full px-3 py-1 rounded-md border border-gray-400 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          {/* Right: Cart + Profile */}
          <div className="relative flex items-center space-x-4">
            {/* ✅ Cart button navigates to /cart */}
            <Link href="/cart" className="relative text-gray-700 hover:text-blue-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>

            {/* Profile Dropdown */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              <User className="h-6 w-6" />
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 top-10 bg-white border border-gray-300 shadow-lg rounded-lg w-40 py-2"
              >
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ✅ Mobile Bottom Nav */}
      <nav className="mobile-nav md:hidden fixed bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-300 shadow-lg z-50">
        <div className="flex justify-around items-center py-2 text-blue-600">
          <button onClick={() => router.push("/")} className="nav-item flex flex-col items-center">
            <Wrench className="h-5 w-5" />
            <span className="text-xs font-medium">Services</span>
          </button>

          <button onClick={() => router.push("/shop")} className="nav-item flex flex-col items-center">
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">Shop</span>
          </button>

          <button onClick={() => setSearchOpen(!searchOpen)} className="nav-item flex flex-col items-center">
            <Search className="h-5 w-5" />
            <span className="text-xs font-medium">Search</span>
          </button>

          {/* ✅ Cart button for mobile */}
          <Link href="/cart" className="relative nav-item flex flex-col items-center">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && <span className="cart-badge bottom-badge">{cartCount}</span>}
            <span className="text-xs font-medium">Cart</span>
          </Link>

          {/* Profile Dropdown for Mobile */}
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="nav-item flex flex-col items-center">
              <User className="h-5 w-5" />
              <span className="text-xs font-medium">Profile</span>
            </button>

            {menuOpen && (
              <div className="absolute bottom-12 right-0 bg-white border border-gray-300 shadow-lg rounded-lg w-40 py-2">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ✅ Mobile Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start pt-20">
          <div className="bg-gray-50 rounded-xl shadow-lg w-[90%] max-w-md p-4">
            <input
              type="text"
              placeholder="Search services, products..."
              className="search-input text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-600"
              autoFocus
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={() => setSearchOpen(false)}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
