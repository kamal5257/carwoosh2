"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
  Alert,
  CircularProgress,
  Paper,
  IconButton,
  InputAdornment,
  Stack,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse  } from "@react-oauth/google";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

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
        console.log("Stored token:", token.accessToken || token);
        setTimeout(() => router.push("/"), 1000);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Google Login
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    console.log("Google Credential:", credentialResponse);
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
      console.error("Google login error:", err);
      setError("Google login failed. Try again.");
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
     <Box
        display="flex"
        flexDirection="column"
        justifyContent={{ xs: "flex-start", md: "center" }}
        alignItems="center"
        minHeight={{
          xs: "calc(100vh - 60px)",
          md: "calc(100vh - 80px)",
        }}
        pt={{ xs: 4, md: 0 }}
        bgcolor="#f5f5f5"
        p={2}
    >


        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ width: "100%", maxWidth: 400 }}
        >
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Login
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            {/* Email + Password Login */}
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
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

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

            {/* Divider for social logins */}
            <Divider sx={{ my: 3 }}>OR</Divider>

            {/* Google Login */}
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google login failed")}
              useOneTap
            />

            {/* Mobile Login */}
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 2}}
              onClick={() => router.push("/MobileLoginPage")}
              
            >
              Login with Mobile
            </Button>

            {/* Footer Links */}
            <Box mt={2} display="flex" justifyContent="space-between">
              <MuiLink component={NextLink} href="/forgot-password" underline="hover" variant="body2">
                Forgot Password?
              </MuiLink>
              <MuiLink component={NextLink} href="/signup" underline="hover" variant="body2">
                Sign Up
              </MuiLink>
            </Box>
          </Paper>
        </motion.div>
      </Box>
    </GoogleOAuthProvider>
  );
}
