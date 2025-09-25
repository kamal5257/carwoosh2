"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { SearchInput } from "@/components/Header/SearchInput";
import { ProfileDropdown } from "./ProfileDropdown";

interface DesktopHeaderProps {
  cartCount: number;
  avatar: string | null;
  searchQuery: string;  // required now
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;  // required
}


export const DesktopHeader = ({ cartCount, avatar, searchQuery, onSearchChange }: DesktopHeaderProps) => {
  return (
    <header className="desktop-header hidden md:flex fixed top-0 left-0 right-0 bg-gray-50 border-b border-gray-300 shadow-sm z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center no-underline">
          <Image src="/logo.png" alt="CarWoosh Logo" width={120} height={40} className="h-12 w-auto" priority />
        </Link>

        {/* Search */}
        <div className="flex-1 flex justify-center mx-6">
          <div className="w-full max-w-lg">
            <SearchInput query={searchQuery || ""} 
            onChange={onSearchChange || (() => {})} placeholder="Search services or products..." />
          </div>
        </div>

        {/* Right Links + Cart + Profile */}
        <div className="relative flex items-center space-x-4">
          <Link href="/trackStatus" className="text-gray-700 hover:text-blue-600 text-sm font-medium">Track Status</Link>
          <Link href="/orderHistory" className="text-gray-700 hover:text-blue-600 text-sm font-medium">Order History</Link>
          <Link href="/cart" className="relative text-gray-700 hover:text-blue-600 transition-colors">
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {/* Profile Dropdown */}
          <ProfileDropdown avatar={avatar} />
        </div>
      </div>
    </header>
  );
};
