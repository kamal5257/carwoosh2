"use client";

import React from "react";
import { Box, Typography, Stack, Link, TextField, Button, useMediaQuery, useTheme, IconButton } from "@mui/material";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";

export const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) return null; // Hide on mobile

  return (
    <Box component="footer" bgcolor="#141414" color="#fff" py={8} px={12}>
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" flexWrap="wrap" spacing={6}>
        {/* Company Info */}
        <Box flex="1 1 250px" mb={{ xs: 4, md: 0 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            CarWoosh
          </Typography>
          <Typography variant="body2" lineHeight={1.8} color="#ccc">
            High quality car services and parts for your vehicle. Keep your car in top condition.
          </Typography>
          <Stack direction="row" spacing={1.5} mt={2}>
            <IconButton component="a" href="https://facebook.com" target="_blank" sx={{ color: "#ccc", "&:hover": { color: "#3b5998" } }}>
              <Facebook />
            </IconButton>
            <IconButton component="a" href="https://instagram.com" target="_blank" sx={{ color: "#ccc", "&:hover": { color: "#E4405F" } }}>
              <Instagram />
            </IconButton>
            <IconButton component="a" href="https://linkedin.com" target="_blank" sx={{ color: "#ccc", "&:hover": { color: "#0A66C2" } }}>
              <LinkedIn />
            </IconButton>
            <IconButton component="a" href="https://twitter.com" target="_blank" sx={{ color: "#ccc", "&:hover": { color: "#1DA1F2" } }}>
              <Twitter />
            </IconButton>
          </Stack>
        </Box>

        {/* Quick Links */}
        <Box flex="1 1 200px" mb={{ xs: 4, md: 0 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Quick Links
          </Typography>
          <Stack spacing={1}>
            {["Services", "Shop", "About Us", "Contact"].map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase().replace(/\s/g, "")}`}
                underline="none"
                color="#ccc"
                sx={{ "&:hover": { color: "#fff" }, transition: "color 0.2s ease-in-out", fontSize: "0.95rem" }}
              >
                {link}
              </Link>
            ))}
          </Stack>
        </Box>

        {/* Contact Info */}
        <Box flex="1 1 250px" mb={{ xs: 4, md: 0 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Contact
          </Typography>
          <Stack spacing={0.5}>
            <Typography variant="body2" color="#ccc">
              Email: support@carwoosh.com
            </Typography>
            <Typography variant="body2" color="#ccc">
              Phone: +91 7973857970
            </Typography>
            <Typography variant="body2" color="#ccc">
              Address: Plot-931 Phase-II, Chandigarh, India
            </Typography>
          </Stack>
        </Box>

        {/* Newsletter / Quick Form */}
        <Box flex="1 1 300px">
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Subscribe
          </Typography>
          <Typography variant="body2" color="#ccc" mb={2}>
            Get the latest updates and offers directly in your inbox.
          </Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              placeholder="Enter your email"
              size="small"
              variant="outlined"
              sx={{
                bgcolor: "#fff",
                borderRadius: 1,
                flex: 1,
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              }}
            />
            <Button variant="contained" color="primary" sx={{ borderRadius: 1, px: 2 }}>
              Subscribe
            </Button>
          </Stack>
        </Box>
      </Stack>

      <Box mt={6} textAlign="center" borderTop="1px solid #333" pt={3}>
        <Typography variant="body2" color="#999">
          © {new Date().getFullYear()} CarWoosh. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};
