"use client";

import Link from "next/link";
import { useState } from "react";
import { Car, MessageCircle, User, LogOut } from "lucide-react";
import Image from "next/image";
import { logout } from "@/utils/auth";

interface ProfileDropdownProps {
  avatar: string | null;
}

export const ProfileDropdown = ({ avatar }: ProfileDropdownProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="relative">
      <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center focus:outline-none flex-shrink-0">
        <Image
          src={avatar || "/default-avatar.png"}
          alt="Profile"
          width={36}
          height={36}
          className="rounded-full border border-gray-300 hover:scale-105 transition"
        />
      </button>

      {menuOpen && (
        <div className="absolute right-0 top-12 bg-white border border-gray-300 shadow-lg rounded-lg w-48 py-2 z-50">
          <Link href="/myVehicle" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <Car className="h-4 w-4" /> My Vehicles
          </Link>
          <Link href="/complaints" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <MessageCircle className="h-4 w-4" /> Complaints
          </Link>
          <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <User className="h-4 w-4" /> Profile
          </Link>
          <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center gap-2">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      )}
    </div>
  );
};
