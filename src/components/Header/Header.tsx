"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCartItems } from "@/utils/cart";
import { DesktopHeader } from "./DesktopHeader";
import { MobileHeader } from "./MobileHeader";
import { MobileBottomNav } from "./MobileBottomNav";
import { logout } from "@/utils/auth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://carwoosh.onrender.com";

interface HeaderProps {
  cartCount?: number;
  view?: "services" | "parts";
  onViewChange?: (v: "services" | "parts") => void;
  onSearch?: (query: string, context: "services" | "parts") => void;
}

export const Header = ({ cartCount: externalCount = 0, view = "services", onViewChange, onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState<number>(externalCount);
  const [avatar, setAvatar] = useState<string | null>(null);

  const router = useRouter();

  // Fetch user data & cart items
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
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!res.ok) throw new Error("Failed to load user data");
        const data = await res.json();
        const user = data.data || data;
        setAvatar(user.profilePic || null);
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) onSearch(query, view);
  };

  const handleLogout = () => {
    logout();
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  const handleViewChange = (v: "services" | "parts") => {
    if (onViewChange) onViewChange(v);
  };

  return (
    <>
      {/* Desktop Header */}
      <DesktopHeader
        cartCount={cartCount}
        avatar={avatar}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* Mobile Top Header */}
      <MobileHeader cartCount={cartCount} onSearchOpen={handleSearchOpen} onProfileClick={handleProfileClick} />

      {/* Mobile Bottom Nav */}
      <MobileBottomNav cartCount={cartCount} view={view} onViewChange={handleViewChange} />

      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start pt-20">
          <div className="bg-gray-50 rounded-xl shadow-lg w-[90%] max-w-md p-4">
            <input
              type="text"
              placeholder={`Search ${view === "services" ? "services" : "products"}...`}
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
              className="search-input text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-600"
            />
            <div className="flex justify-end mt-2">
              <button onClick={handleSearchClose} className="text-sm text-gray-600 hover:text-gray-900">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
