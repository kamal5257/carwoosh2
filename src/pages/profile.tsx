"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Pencil, ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";



interface Address {
  id: number;
  line1: string;
  city: string;
  state: string;
  zip: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://carwoosh.onrender.com";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAddress, setNewAddress] = useState<Address>({
    id: 0,
    line1: "",
    city: "",
    state: "",
    zip: "",
  });

  const router = useRouter();

  // Fetch user profile & addresses on load
  useEffect(() => {
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
        setName(user.name);
        setEmail(user.email);
        setPhone(user.mobileNumber || "");
        setAvatar(`${user.profilePic || null}`);
        // setAvatar( null);
        setAddresses(user.addresses || []);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const [uploading, setUploading] = useState(false);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    console.log("Uploading file:", uploading);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_BASE}/api/users/upload-profile`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload profile picture");
      const data = await res.json();

      setAvatar(data.profilePicUrl || URL.createObjectURL(file));
    } catch (error) {
      console.error("Error uploading profile pic:", error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };


  // Save Profile API
  const saveProfile = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/user`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, avatar }),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Could not save profile. Try again.");
    }
  };

  // Add / Update Address API
  const saveAddress = async () => {
    if (!newAddress.line1.trim()) return;

    try {
      if (newAddress.id) {
        // Update address logic here if needed
      } else {
        const res = await fetch(`${API_BASE}/api/addresses`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAddress),
        });
        if (!res.ok) throw new Error("Failed to add address");
        const added = await res.json();
        setAddresses((prev) => [...prev, added]);
      }
      setNewAddress({ id: 0, line1: "", city: "", state: "", zip: "" });
    } catch (error) {
      console.error("Error adding address:", error);
      alert("Could not save address.");
    }
  };

  // Delete Address API
  const deleteAddress = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/api/addresses/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete address");
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Could not delete address.");
    }
  };

  if (loading) return <div className="text-center p-10">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24 text-gray-900">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-6 border border-gray-200 relative">

        <button
          onClick={() => router.push("/")}
          className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition"
          title="Back to Home"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4">
            <Image
              src={avatar || "/default-avatar.png"}
              alt="Profile"
              fill
              className="rounded-full object-cover border border-gray-300 shadow-sm"
            />
            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer shadow-md">
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              <Pencil className="w-4 h-4" />
            </label>
          </div>

          {/* Profile Info */}
          <input
            className="border border-gray-300 bg-gray-50 p-2 rounded w-full mb-2 focus:ring focus:ring-blue-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            className="border border-gray-300 bg-gray-50 p-2 rounded w-full mb-2 focus:ring focus:ring-blue-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="border border-gray-300 bg-gray-50 p-2 rounded w-full mb-4 focus:ring focus:ring-blue-200"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
          />

          <button
            onClick={saveProfile}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition"
          >
            Save Profile
          </button>
          
          <button
            onClick={() => {
              localStorage.removeItem("token"); // clear token
              window.location.href = "/authenticate"; // redirect to login page
            }}
            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-xl shadow hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Address Section */}
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4 text-gray-900">Delivery Addresses</h2>

          {addresses.length === 0 && (
            <p className="text-gray-700 text-sm mb-3">No addresses added yet.</p>
          )}

          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="flex justify-between items-start border border-gray-200 bg-gray-50 p-3 rounded-xl mb-3"
            >
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">{addr.line1}</p>
                <p className="text-sm text-gray-800">
                  {addr.city}, {addr.state} {addr.zip}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setNewAddress(addr)} className="text-blue-600 hover:text-blue-800">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => deleteAddress(addr.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Add/Edit Address Form */}
          <div className="mt-4 border border-gray-300 p-4 rounded-xl bg-white shadow">
            <input
              className="border border-gray-300 p-2 rounded w-full mb-2 bg-gray-50"
              placeholder="Address line"
              value={newAddress.line1}
              onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input
                className="border border-gray-300 p-2 rounded bg-gray-50"
                placeholder="City"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
              />
              <input
                className="border border-gray-300 p-2 rounded bg-gray-50"
                placeholder="State"
                value={newAddress.state}
                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
              />
            </div>
            <input
              className="border border-gray-300 p-2 rounded w-full mb-2 bg-gray-50"
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
