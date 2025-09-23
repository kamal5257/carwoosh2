"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Search, Wrench, Home, LogOut, Car, MessageCircle, User } from "lucide-react";
import { logout } from "@/utils/auth";
import { getCartItems } from "@/utils/cart";
import Image from "next/image";

import "@/components/styles/Header.css";



interface HeaderProps {
  cartCount?: number;
  view?: "services" | "parts";
  onViewChange?: (v: "services" | "parts") => void;
  onSearch?: (query: string, context: "services" | "parts") => void;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://carwoosh.onrender.com";

export const Header = ({
  cartCount: externalCount = 0,
  view = "services",
  onViewChange,
  onSearch,
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState<number>(externalCount);
  const [avatar, setAvatar] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const items = getCartItems();
    setCartCount(items.length);

    const fetchUserData = async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const res = await fetch(`${API_BASE}/api/users/user-details`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}), // ✅ add token if present
          },
        });

        if (!res.ok) throw new Error("Failed to load user data");
        const data = await res.json();
        const user = data.data || data; // Adjust based on actual response structure
        setAvatar(`${user.profilePic || null}`);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUserData();

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) onSearch(query, view);
  };

  const goHomeAndSetView = (targetView: "services" | "parts") => {
    if (window.location.pathname !== "/") {
      router.push("/");
      setTimeout(() => onViewChange?.(targetView), 50);
    } else {
      onViewChange?.(targetView);
    }
  };

  return (
    <>
      {/* ✅ Desktop Header */}
      <header className="desktop-header hidden md:flex fixed top-0 left-0 right-0 bg-gray-50 border-b border-gray-300 shadow-sm z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center no-underline">
            <Image
              src="/logo.png"
              alt="CarWoosh Logo"
              width={120}
              height={40}
              className="h-12 w-auto"
              priority // loads it faster
            />
          </Link>


          {/* ✅ Center: Search */}
          <div className="flex-1 flex justify-center mx-6">
            <div className="w-full max-w-lg">
              <input
                type="text"
                placeholder={`Search ${view === "services" ? "services" : "products"
                  }...`}
                className="search-input w-full px-3 py-1 rounded-md border border-gray-400 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* ✅ Right: Links + Cart + Profile */}
          <div className="relative flex items-center space-x-4">
            {/* Quick Links */}
            <Link
              href="/trackStatus"
              className="text-gray-700 hover:text-blue-600 text-sm font-medium"
            >
              Track Status
            </Link>

            <Link
              href="/orderHistory"
              className="text-gray-700 hover:text-blue-600 text-sm font-medium"
            >
              Order History
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>

            {/* ✅ Profile Avatar */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center focus:outline-none flex-shrink-0"
              >
                <Image
                  src={"/public/images/profile/user_2_1758004589919_WhatsApp Image 2025-09-14 at 14.52.53.jpeg"}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full border border-gray-300 hover:scale-105 transition"
                />
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div className="absolute right-0 top-12 bg-white border border-gray-300 shadow-lg rounded-lg w-48 py-2 z-50">
                  <Link
                    href="/myVehicle"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Car className="h-4 w-4" /> My Vehicles
                  </Link>
                  <Link
                    href="/complaints"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    <MessageCircle className="h-4 w-4" /> Complaints
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    <User className="h-4 w-4" /> Profile
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

        </div>
      </header>

      {/* ✅ Mobile Top Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-gray-50 border-b border-gray-300 shadow-sm z-50 flex items-center justify-between px-4 py-2">
        <Link href="/" className="flex items-center no-underline">
          <span className="text-2xl font-bold text-gray-600">Car</span>
          <span className="text-2xl font-bold text-blue-400">Woosh</span>
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="text-gray-700 hover:text-blue-600"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link href="/cart" className="relative text-gray-700 hover:text-blue-600">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <button
            onClick={() => router.push("/profile")}
            className="text-gray-700 hover:text-blue-600"
          >
            <User className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* ✅ Mobile Bottom Nav */}
      <nav className="mobile-nav md:hidden fixed bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-300 shadow-lg z-50">
        <div className="flex justify-around items-center py-2">
          <button
            onClick={() => goHomeAndSetView("services")}
            className={`nav-item flex flex-col items-center ${view === "services"
              ? "text-blue-600 font-bold"
              : "text-gray-700 hover:text-blue-600"
              }`}
          >
            <Wrench className="h-5 w-5" />
            <span className="text-xs font-medium">Services</span>
          </button>

          <button
            onClick={() => goHomeAndSetView("parts")}
            className={`nav-item flex flex-col items-center ${view === "parts"
              ? "text-blue-600 font-bold"
              : "text-gray-700 hover:text-blue-600"
              }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">Shop</span>
          </button>

          <Link
            href="/cart"
            className="relative nav-item flex flex-col items-center text-gray-700 hover:text-blue-600"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="cart-badge bottom-badge">{cartCount}</span>
            )}
            <span className="text-xs font-medium">Cart</span>
          </Link>

          {/* ✅ NEW My Account Nav */}
          <Link
            href="/my-account"
            className="nav-item flex flex-col items-center text-gray-700 hover:text-blue-600"
          >
            <User className="h-5 w-5" />
            <span className="text-xs font-medium">My Account</span>
          </Link>
        </div>
      </nav>


      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start pt-20">
          <div className="bg-gray-50 rounded-xl shadow-lg w-[90%] max-w-md p-4">
            <input
              type="text"
              placeholder={`Search ${view === "services" ? "services" : "products"
                }...`}
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
              className="search-input text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-600"
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
