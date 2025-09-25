"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Wrench, Home, ShoppingCart, User } from "lucide-react";

interface MobileBottomNavProps {
  cartCount: number;
  view: "services" | "parts";
  onViewChange: (v: "services" | "parts") => void;
}

export const MobileBottomNav = ({ cartCount, view, onViewChange }: MobileBottomNavProps) => {
  const router = useRouter();

  const goHomeAndSetView = (targetView: "services" | "parts") => {
    if (window.location.pathname !== "/") {
      router.push(`/?view=${targetView}`);
    } else {
      onViewChange(targetView);
      router.replace(`/?view=${targetView}`); // update URL without reload
    }
  };


  return (
    <nav className="mobile-nav md:hidden fixed bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-300 shadow-lg z-50">
      <div className="flex justify-around items-center py-2">
        <button
          onClick={() => goHomeAndSetView("services")}
          className={`nav-item flex flex-col items-center ${view === "services" ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-600"}`}
        >
          <Wrench className="h-5 w-5" />
          <span className="text-xs font-medium">Services</span>
        </button>

        <button
          onClick={() => goHomeAndSetView("parts")}
          className={`nav-item flex flex-col items-center ${view === "parts" ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-600"}`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs font-medium">Shop</span>
        </button>

        <Link href="/cart" className="relative nav-item flex flex-col items-center text-gray-700 hover:text-blue-600">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && <span className="cart-badge bottom-badge">{cartCount}</span>}
          <span className="text-xs font-medium">Cart</span>
        </Link>

        <Link href="/my-account" className="nav-item flex flex-col items-center text-gray-700 hover:text-blue-600">
          <User className="h-5 w-5" />
          <span className="text-xs font-medium">My Account</span>
        </Link>
      </div>
    </nav>
  );
};
