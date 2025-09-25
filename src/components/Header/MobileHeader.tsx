"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Search, User } from "lucide-react";

interface MobileHeaderProps {
  cartCount: number;
  onSearchOpen: () => void;
  onProfileClick: () => void;
}

export const MobileHeader = ({ cartCount, onSearchOpen, onProfileClick }: MobileHeaderProps) => {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 bg-gray-50 border-b border-gray-300 shadow-sm z-50 flex items-center justify-between px-4 py-2">
      <Link href="/" className="flex items-center no-underline">
        <span className="text-2xl font-bold text-gray-600">Car</span>
        <span className="text-2xl font-bold text-blue-400">Woosh</span>
      </Link>
      <div className="flex items-center gap-4">
        <button onClick={onSearchOpen} className="text-gray-700 hover:text-blue-600">
          <Search className="h-5 w-5" />
        </button>
        <Link href="/cart" className="relative text-gray-700 hover:text-blue-600">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
        <button onClick={onProfileClick} className="text-gray-700 hover:text-blue-600">
          <User className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};
