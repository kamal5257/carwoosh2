import React from "react";
import { FaCar, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-2 md:hidden">
      <Link to="/" className="flex flex-col items-center text-gray-700">
        <FaCar size={20} />
        <span className="text-xs">Services</span>
      </Link>
      <Link to="/cart" className="flex flex-col items-center text-gray-700">
        <FaShoppingCart size={20} />
        <span className="text-xs">Cart</span>
      </Link>
      <Link to="/login" className="flex flex-col items-center text-gray-700">
        <FaUser size={20} />
        <span className="text-xs">Profile</span>
      </Link>
    </nav>
  );
}
