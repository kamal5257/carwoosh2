"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Link as MuiLink,
  Alert,
  Stack,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import NextLink from "next/link";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://carwoosh.onrender.com/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, fullName, mobileNo }),
      });

      const data = await response.json();

      if (response.ok && data.statusCode === "APP_001") {
        setMessage(`✅ ${data.message || "Signup successful!"}`);
        setFullName("");
        setEmail("");
        setPassword("");
        setMobileNo("");
      } else {
        setMessage(`❌ ${data.message || "Signup failed."}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      px={2}
    >
      {/* Motion wrapper for animation */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ width: "100%", maxWidth: 400 }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%", borderRadius: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Sign Up
          </Typography>

          {message && (
            <Alert severity={message.includes("✅") ? "success" : "error"} sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <Stack component="form" spacing={2} onSubmit={handleSignup}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Mobile No"
              type="tel"
              variant="outlined"
              fullWidth
              required
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
            </Button>

            <Typography variant="body2" align="center">
              Already have an account?{" "}
              <MuiLink component={NextLink} href="/login" underline="hover">
                Sign In
              </MuiLink>
            </Typography>
          </Stack>
        </Paper>
      </motion.div>
    </Box>
  );
}
