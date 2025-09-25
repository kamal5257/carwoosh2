"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// interface VerifyOTPProps {
//   username?: string; // Optional: you can pass username via query params or state
// }

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const safeParams = searchParams ?? new URLSearchParams();
  const username: string = safeParams.get("username") ?? "";
  const txnId: string = safeParams.get("txnId") ?? "";
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!otp) {
      alert("Please enter the OTP");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://carwoosh.onrender.com/api/users/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ "txnId": txnId, "otp": otp }),
        }
      );

      const data = await response.json();
      console.log("OTP verification response:", data);

      if (data.statusCode === "APP_001") {
        alert("OTP verified successfully! You can reset your password now.");
        router.push(`/ResetPassword?txnId=${encodeURIComponent(data.txnId)}&username=${encodeURIComponent(username)}`); // Redirect to reset password page
      } else {
        alert(data.message || "Invalid OTP. Please try again.");
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
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Verify OTP</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-2 mb-4 border rounded border-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button className={`w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 
          ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}
