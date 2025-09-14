"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });

  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("usernName"); // Pass username from previous step
  const txnId = searchParams.get("txnId"); // Pass txnId from previous step

  const validate = (): boolean => {
    let valid = true;
    const newErrors = { password: "", confirmPassword: "" };

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  console.log("ResetPasswordPage params:", { username, txnId });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:8089/api/users/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "username":username, "txnId":txnId, "newPassword": password }),
      });

      const data = await response.json();
      console.log("Reset password response:", data);

      if (data.statusCode === "APP_001") {
        alert("Password reset successfully! Please login.");
        router.push("/LoginPage");
      } else {
        alert(data.message || "Failed to reset password");
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
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 mb-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p className="text-red-600 text-sm mb-2">{errors.password}</p>}
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 mb-2 border rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {errors.confirmPassword && <p className="text-red-600 text-sm mb-2">{errors.confirmPassword}</p>}
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-2">
          Reset Password
        </button>
      </form>
    </div>
  );
}
