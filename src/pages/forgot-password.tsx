"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js 13+ App Router

export default function ForgotPasswordPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8089/api/users/forgotPassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        }
      );

      const data = await response.json();
      console.log("Forgot password response:", data);

      if (data.statusCode === "APP_001") {
        // Redirect to Verify OTP page
        router.push(`/VerifyOTP?txnId=${encodeURIComponent(data.txnId)}&username=${encodeURIComponent(username)}`); 
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
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Send OTP
        </button>
      </form>
    </div>
  );
}
