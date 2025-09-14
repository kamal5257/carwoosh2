"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, Pencil } from "lucide-react";

interface Address {
  id: number;
  line1: string;
  city: string;
  state: string;
  zip: string;
}

const ProfilePage = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [phone, setPhone] = useState("9876543210");
  const [avatar, setAvatar] = useState<string | null>(null);

  const [addresses, setAddresses] = useState<Address[]>([
    { id: 1, line1: "123 Main Street", city: "Mumbai", state: "MH", zip: "400001" },
  ]);

  const [newAddress, setNewAddress] = useState<Address>({
    id: 0,
    line1: "",
    city: "",
    state: "",
    zip: "",
  });

  // ✅ handle profile image upload
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // ✅ add or update address
  const saveAddress = () => {
    if (!newAddress.line1.trim()) return;
    if (newAddress.id) {
      // update existing
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === newAddress.id ? newAddress : addr))
      );
    } else {
      // add new
      setAddresses((prev) => [
        ...prev,
        { ...newAddress, id: Date.now() },
      ]);
    }
    setNewAddress({ id: 0, line1: "", city: "", state: "", zip: "" });
  };

  const editAddress = (addr: Address) => setNewAddress(addr);
  const deleteAddress = (id: number) =>
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-24">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4">
            <Image
              src={avatar || "/default-avatar.png"}
              alt="Profile"
              fill
              className="rounded-full object-cover border"
            />
            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              <Pencil className="w-4 h-4" />
            </label>
          </div>

          {/* Profile Info */}
          <input
            className="border p-2 rounded w-full mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            className="border p-2 rounded w-full mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="border p-2 rounded w-full mb-4"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition">
            Save Profile
          </button>
        </div>

        {/* Address Section */}
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">Delivery Addresses</h2>

          {addresses.length === 0 && (
            <p className="text-gray-500 text-sm mb-3">No addresses added yet.</p>
          )}

          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="flex justify-between items-start border p-3 rounded-xl mb-3"
            >
              <div>
                <p className="font-semibold">{addr.line1}</p>
                <p className="text-sm text-gray-600">
                  {addr.city}, {addr.state} {addr.zip}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editAddress(addr)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteAddress(addr.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Add/Edit Address Form */}
          <div className="mt-4 border p-4 rounded-xl bg-gray-50">
            <input
              className="border p-2 rounded w-full mb-2"
              placeholder="Address line"
              value={newAddress.line1}
              onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input
                className="border p-2 rounded"
                placeholder="City"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
              />
              <input
                className="border p-2 rounded"
                placeholder="State"
                value={newAddress.state}
                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
              />
            </div>
            <input
              className="border p-2 rounded w-full mb-2"
              placeholder="ZIP"
              value={newAddress.zip}
              onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
            />

            <button
              onClick={saveAddress}
              className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition w-full flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {newAddress.id ? "Update Address" : "Add Address"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
