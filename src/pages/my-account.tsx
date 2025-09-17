"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Car,
  ClipboardList,
  Package,
  MessageCircle,
  MapPin,
  LogOut,
} from "lucide-react";
import { logout } from "@/utils/auth";

export default function MyAccountPage() {
  const router = useRouter();

  const handleLogout = () => logout();

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold text-gray-800 mb-6">My Account</h1>

      {/* ✅ Menu List in Grid */}
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <button
          onClick={() => router.push("/myVehicle")}
          className="flex flex-col items-center justify-center p-4 rounded-lg bg-white shadow hover:bg-gray-100"
        >
          <Car className="h-6 w-6 text-blue-600 mb-2" />
          <span className="text-sm font-medium">My Vehicles</span>
        </button>

        <button
          onClick={() => router.push("/orderHistory")}
          className="flex flex-col items-center justify-center p-4 rounded-lg bg-white shadow hover:bg-gray-100"
        >
          <ClipboardList className="h-6 w-6 text-blue-600 mb-2" />
          <span className="text-sm font-medium">Order History</span>
        </button>

        <button
          onClick={() => router.push("/trackStatus")}
          className="flex flex-col items-center justify-center p-4 rounded-lg bg-white shadow hover:bg-gray-100"
        >
          <Package className="h-6 w-6 text-blue-600 mb-2" />
          <span className="text-sm font-medium">Track Status</span>
        </button>

        <button
          onClick={() => router.push("/complaints")}
          className="flex flex-col items-center justify-center p-4 rounded-lg bg-white shadow hover:bg-gray-100"
        >
          <MessageCircle className="h-6 w-6 text-blue-600 mb-2" />
          <span className="text-sm font-medium">Complaints</span>
        </button>
      </div>

      {/* ✅ Manage Address + Logout */}
      <div className="mt-6 space-y-3 text-gray-700">
        <Link
          href="/manage-address"
          className="flex items-center justify-between w-full p-3 rounded-lg bg-white shadow hover:bg-gray-100"
        >
          <span className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" /> Manage Address
          </span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full p-3 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100"
        >
          <LogOut className="h-5 w-5 mr-2" /> Logout
        </button>
      </div>
    </div>
  );
}
