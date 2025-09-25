"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Visibility, VisibilityOff, CheckCircle, Cancel, Info } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { motion, AnimatePresence } from "framer-motion";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
  const [showRules, setShowRules] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const safeParams = searchParams ?? new URLSearchParams();
  const username = safeParams.get("username");
  const txnId = safeParams.get("txnId");

  const [validation, setValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    setValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });

    setPasswordMatch(confirmPassword ? password === confirmPassword : null);
  }, [password, confirmPassword]);

  const isPasswordValid = Object.values(validation).every(Boolean);
  const strengthScore = Object.values(validation).filter(Boolean).length;
  const strengthColor =
    strengthScore <= 2 ? "text-red-500" : strengthScore <= 4 ? "text-yellow-500" : "text-green-500";
  const strengthLabel =
    strengthScore <= 2 ? "Weak" : strengthScore <= 4 ? "Medium" : "Strong";
  const strengthWidth = (strengthScore / 5) * 100 + "%";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid || password !== confirmPassword) return;

    try {
      const response = await fetch("https://carwoosh.onrender.com/api/users/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, txnId, newPassword: password }),
      });

      const data = await response.json();
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
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Reset Password
        </h2>

        {/* New Password */}
        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setShowRules(true)}
            onBlur={() => setShowRules(false)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </button>
          <Tooltip title="Password must meet the criteria below" placement="right">
            <Info className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" />
          </Tooltip>
        </div>

        {/* Password Rules / Strength - Animated */}
        <AnimatePresence>
          {showRules && password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4 overflow-hidden"
            >
              {/* Slim Strength Bar */}
              <div className="flex items-center gap-2 mb-1">
                <div className="flex-1 h-1 bg-gray-300 rounded-full">
                  <div
                    className={`h-1 rounded-full ${strengthColor} transition-all duration-300`}
                    style={{ width: strengthWidth }}
                  ></div>
                </div>
                <span className={`font-semibold text-sm ${strengthColor}`}>{strengthLabel}</span>
              </div>

              {/* Validation List */}
              <div className="text-sm space-y-1 mt-1 text-gray-600">
                {[
                  { key: "length", text: "At least 8 characters" },
                  { key: "uppercase", text: "At least 1 uppercase letter" },
                  { key: "lowercase", text: "At least 1 lowercase letter" },
                  { key: "number", text: "At least 1 number" },
                  { key: "special", text: "At least 1 special character" },
                ].map((item) => (
                  <Tooltip key={item.key} title={item.text} placement="right">
                    <p className="flex items-center gap-2 cursor-help select-none">
                      {validation[item.key as keyof typeof validation] ? (
                        <CheckCircle className="text-green-600" fontSize="small" />
                      ) : (
                        <Cancel className="text-red-600" fontSize="small" />
                      )}
                      {item.text}
                    </p>
                  </Tooltip>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirm Password */}
        <div className="relative mb-2">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onFocus={() => setShowRules(true)}
            onBlur={() => setShowRules(false)}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
          </button>
        </div>

        {/* Password Match Message */}
        {passwordMatch !== null && (
          <p
            className={`text-sm font-medium mb-2 ${
              passwordMatch ? "text-green-600" : "text-red-600"
            }`}
          >
            {passwordMatch ? "Passwords match ✅" : "Passwords do not match ❌"}
          </p>
        )}

        <button
          type="submit"
          disabled={!isPasswordValid || !passwordMatch}
          className={`w-full py-3 rounded-lg mt-2 font-bold text-white transition ${
            isPasswordValid && passwordMatch
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
