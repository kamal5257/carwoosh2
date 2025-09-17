"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function ForgotPasswordPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://carwoosh.onrender.com/api/users/forgotPassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        }
      );

      const data = await response.json();
      console.log("Forgot password response:", data);

      if (data.statusCode === "APP_001") {
        router.push(
          `/VerifyOTP?txnId=${encodeURIComponent(
            data.txnId
          )}&username=${encodeURIComponent(username)}`
        );
      } else {
        alert(data.message || "User not found or something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* ✅ Wrap everything in a relative container */}
      <div className="relative w-full max-w-md">
        {/* ✅ Correctly positioned X button */}
        <button
          type="button"
          onClick={() => router.push("/authenticate")}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200 transition z-10"
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg w-full"
        >
          <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-700">
            Forgot Password
          </h2>

          <label
            htmlFor="username"
            className="block text-gray-500 font-medium mb-1 text-lg"
          >
            Username / Email
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            className="w-full p-3 mb-6 border border-gray-300 text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}
