"use client";

import React, { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  IconButton,
  InputAdornment,
  Stack,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  // ✅ Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/"); // instantly redirect to home
    }
  }, [router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://carwoosh.onrender.com/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const encodedPassword = btoa(password);
      const response = await fetch("https://carwoosh.onrender.com/api/users/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userName, password: encodedPassword }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Login failed");
      }

      const data = await response.json();
      const token = data.token || data.data?.token;

      if (data.statusCode === "APP_001" && token) {
        setSuccess("✅ Login successful! Redirecting...");
        localStorage.setItem("token", token.accessToken || token);
        setTimeout(() => router.push("/"), 1000);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const response = await fetch("https://carwoosh.onrender.com/api/users/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await response.json();
      if (response.ok && data.statusCode === "APP_001") {
        localStorage.setItem("token", data.token);
        router.push("/");
      } else {
        setError(data.message || "Google login failed");
      }
    } catch (err) {
      setError("Google login failed. Try again.");
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f9fafb"
        px={2}
      >
        <motion.div
          style={{
            perspective: "1000px",
            width: "100%",
            maxWidth: 420,
            position: "relative",
            minHeight: 520, // ✅ fixes jumpy layout
            boxShadow: "0 14px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: 16,
          }}
        >
          <motion.div
            animate={{ rotateY: isSignup ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{
              transformStyle: "preserve-3d",
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            {/* LOGIN SIDE */}
            <Paper
              elevation={4}
              sx={{
                p: 4,
                borderRadius: 4,
                boxShadow:
                  "0 8px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
                  backfaceVisibility: "hidden",
                bgcolor: "white",
              }}
            >
              <Typography variant="h5" align="center" gutterBottom fontWeight={700}>
                Welcome Back 👋
              </Typography>
              <Typography variant="body2" align="center" sx={{ mb: 3, color: "text.secondary" }}>
                Sign in to continue to <strong>CarWoosh</strong>
              </Typography>

              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

              <Box component="form" onSubmit={handleLogin}>
                <Stack spacing={2}>
                  <TextField
                    label="Email"
                    type="email"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    fullWidth
                    required
                  />
                  <TextField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {/* ✅ Forgot Password Link */}
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "right",
                      color: "primary.main",
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                    onClick={() => router.push("/forgot-password")}
                  >
                    Forgot Password?
                  </Typography>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                  </Button>
                </Stack>
              </Box>

              <Divider sx={{ my: 3 }}>OR</Divider>

              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google login failed")}
                useOneTap
              />

              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => router.push("/MobileLoginPage")}
              >
                Login with Mobile
              </Button>

              <Typography
                mt={2}
                align="center"
                variant="body2"
                sx={{ cursor: "pointer", color: "primary.main" }}
                onClick={() => setIsSignup(true)}
              >
                Don’t have an account? Sign up
              </Typography>
            </Paper>

            {/* SIGNUP SIDE */}
            <Paper
              elevation={4}
              sx={{
                p: 4,
                borderRadius: 4,
                backfaceVisibility: "hidden",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                bgcolor: "white",
                transform: "rotateY(180deg)",
              }}
            >
              <Typography variant="h5" align="center" gutterBottom fontWeight={700}>
                Welcome 👋
              </Typography>
              <Typography variant="body2" align="center" sx={{ mb: 3, color: "text.secondary" }}>
                Sign up to be a member of <strong>CarWoosh</strong>
              </Typography>

              {message && (
                <Alert severity={message.includes("✅") ? "success" : "error"} sx={{ mb: 2 }}>
                  {message}
                </Alert>
              )}

              <Stack component="form" spacing={2} onSubmit={handleSignup}>
                <TextField label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} fullWidth required />
                <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
                <TextField label="Mobile No" type="tel" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} fullWidth required />
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
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
                <Button type="submit" variant="contained" fullWidth size="large" disabled={loading}>
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
                </Button>
                <Typography
                  align="center"
                  variant="body2"
                  sx={{ cursor: "pointer", color: "primary.main" }}
                  onClick={() => setIsSignup(false)}
                >
                  Already have an account? Login
                </Typography>
              </Stack>
            </Paper>
          </motion.div>
        </motion.div>
      </Box>
    </GoogleOAuthProvider>
  );
}
