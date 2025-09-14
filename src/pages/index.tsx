"use client";

import React, { useState, useEffect } from "react";
import { getToken, isTokenExpired } from "@/utils/auth";
import { Header } from "@/components/Header";
import { addToCart } from "@/utils/cart";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Divider,
  Chip,
  Rating,
  useMediaQuery,
  useTheme,
} from "@mui/material";

type ViewType = "services" | "parts";

const services = [
  { id: 1, name: "Oil Change", price: 1200, image: "/images/oil-change.jpg", description: "Includes engine oil & filter replacement", rating: 4.5, reviews: 120, discount: 10 },
  { id: 2, name: "Tire Replacement", price: 3500, image: "/images/tire-replacement.jpg", description: "Complete tire removal and fitting", rating: 4.7, reviews: 95 },
  { id: 3, name: "Tire Puncture", price: 3500, image: "/images/tire-puncture.jpg", description: "Quick puncture repair & pressure check", rating: 4.3, reviews: 60 },
  { id: 4, name: "Dent/Paint", price: 3500, image: "/images/dent-paint.jpg", description: "Spot repair & professional paint finish", rating: 4.8, reviews: 70, discount: 15 },
  { id: 5, name: "Engine Service", price: 3500, image: "/images/engine-service.jpg", description: "Full engine tune-up & cleaning", rating: 4.6, reviews: 80 },
  { id: 6, name: "Brake Change", price: 3500, image: "/images/brake-change.jpg", description: "Front/rear brake pads replacement", rating: 4.4, reviews: 50 },
];

const parts = [
  { id: 1, name: "Brake Pad", price: 1500, image: "/images/brake-pad.jpg", description: "OEM quality brake pads", rating: 4.5, reviews: 32 },
  { id: 2, name: "Car Battery", price: 4500, image: "/images/car-battery.jpg", description: "12V high-performance battery", rating: 4.2, reviews: 18 },
];

const HomePage: React.FC = () => {
  const [view, setView] = useState<ViewType>("services");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // ✅ Detect mobile screen

  useEffect(() => {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
      // logout();
    }
  }, []);

  const data = view === "services" ? services : parts;

  return (
    <>
      <Header cartCount={4} />

      <Box
        px={{ xs: 2, md: 12 }}   // ✅ more left/right padding for desktop
        py={{ xs: 2, md: 8 }}
        minHeight="100vh"
        bgcolor="#f5f5f5"
        paddingTop={{ xs: "60px", md: "80px" }}
      >

       {/* Toggle Buttons (Desktop Only) */}
{!isMobile && (
  <Stack direction="row" justifyContent="center" mb={4}>
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={(_, val) => val && setView(val)}
      aria-label="view toggle"
      color="primary"
      
    >
      <ToggleButton
        value="services"
        sx={{
          fontWeight: 600,
          transition: "all 0.3s ease",  // ✅ smooth animation
          borderRadius: 6,
          "&.Mui-selected": {
            fontWeight: 600,           // ✅ slightly bolder
            transform: "scale(1.05)", // ✅ small grow effect
            backgroundColor: "primary.main",
            color: "#fff",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
            borderRadius: 6,
          },
        }}
      >
        Services
      </ToggleButton>
      <ToggleButton
        value="parts"
        sx={{
          fontWeight: 600,
          transition: "all 0.3s ease",
          borderRadius: 6,
          "&.Mui-selected": {
            fontWeight: 600,
            transform: "scale(1.05)",
            backgroundColor: "primary.main",
            color: "#fff",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
            borderRadius: 6,
          },
        }}
      >
        Shop
      </ToggleButton>
    </ToggleButtonGroup>
  </Stack>
)}




        {/* ✅ Desktop View */}
        {!isMobile && (
          <Grid container spacing={3} justifyContent="justify">  {/* 🔧 Justify content for better alignment */}
            {data.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <ServiceCard item={item} view={view} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* ✅ Mobile View (Two Cards per Row, Reduced Spacing) */}
        {isMobile && (
          <Grid container spacing={1} justifyContent="center">  {/* 🔧 Reduce spacing for mobile */} 
            {data.map((item) => (
              <Grid item xs={6} key={item.id}>
                <ServiceCard item={item} view={view} isMobile={true} />
              </Grid>
            ))}
          </Grid>
        )}

      </Box>
    </>
  );
};

const ServiceCard = ({ item, view, isMobile = false }: { item: any; view: string; isMobile?: boolean }) => (
  <Paper
    elevation={3}
    sx={{
      p: isMobile ? 1 : 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
      borderRadius: 3,
      border: "1px solid #e0e0e0",
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      transition: "transform 0.2s ease-in-out",
      "&:hover": { transform: "translateY(-4px)" },
    }}
  >
    {/* Image */}
    <Box position="relative">
      <Box
        component="img"
        src={item.image}
        alt={item.name}
        sx={{
          width: isMobile ? "100vh" : 280,
          height: isMobile ? 180 : { xs: 120, md: 200 },
          objectFit: "cover",
          borderRadius: 2,
        }}
      />
      {item.discount && (
        <Chip
          label={`-${item.discount}%`}
          color="error"
          size="small"
          sx={{
            position: "absolute",
            top: 6,
            left: 6,
            fontWeight: "bold",
            fontSize: isMobile ? "0.65rem" : "0.75rem",
          }}
        />
      )}
    </Box>

    {/* Title + Description */}
    <Typography variant={isMobile ? "body2" : "subtitle1"} fontWeight="bold" mt={1}>
      {item.name}
    </Typography>
    <Typography variant="caption" color="text.secondary" mb={0.5}>
      {item.description}
    </Typography>

    {/* Ratings */}
    <Stack direction="row" alignItems="center" spacing={0.5} mb={0.5}>
      <Rating value={item.rating} precision={0.1} readOnly size="small" />
      <Typography variant="caption" color="text.secondary">
        ({item.reviews})
      </Typography>
    </Stack>

    <Divider sx={{ my: 0.5 }} />

    {/* Price + Button */}
    <Box display="flex" alignItems="center" justifyContent="space-between" mt={0.5}>
      <Typography variant="body2" color="primary" fontWeight="bold" fontFamily={"cursive"}>
        ₹{item.price.toLocaleString()}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="small"
        sx={{
          borderRadius: 2,
          textTransform: "none",
          px: 1.5,
          fontSize: "0.7rem",
          minWidth: "auto",
        }}
        onClick={() => {
          if (view === "parts") {
            addToCart({
              id: item.id,
              name: item.name,
              price: item.price,
              image: item.image,
            });
          }
        }}
      >
        {view === "services" ? "Book Now" : "Add to Cart"}
      </Button>
    </Box>
  </Paper>
);



export default HomePage;
