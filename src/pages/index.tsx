"use client";

import React, { useState, useEffect } from "react";
import { getToken, isTokenExpired } from "@/utils/auth";
import { Header } from "@/components/Header";
import { addToCart } from "@/utils/cart";
import {
  Box,
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

interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  discount?: number;
}

const services: Item[] = [
  { id: 1, name: "Oil Change", price: 1200, image: "/images/oil-change.jpg", description: "Includes engine oil & filter replacement", rating: 4.5, reviews: 120, discount: 10 },
  { id: 2, name: "Tire Replacement", price: 3500, image: "/images/tire-replacement.jpg", description: "Complete tire removal and fitting", rating: 4.7, reviews: 95 },
  { id: 3, name: "Tire Puncture", price: 3500, image: "/images/tire-puncture.jpg", description: "Quick puncture repair & pressure check", rating: 4.3, reviews: 60 },
  { id: 4, name: "Dent/Paint", price: 3500, image: "/images/dent-paint.jpg", description: "Spot repair & professional paint finish", rating: 4.8, reviews: 70, discount: 15 },
  { id: 5, name: "Engine Service", price: 3500, image: "/images/engine-service.jpg", description: "Full engine tune-up & cleaning", rating: 4.6, reviews: 80 },
  { id: 6, name: "Brake Change", price: 3500, image: "/images/brake-change.jpg", description: "Front/rear brake pads replacement", rating: 4.4, reviews: 50 },
];

const parts: Item[] = [
  { id: 1, name: "Brake Pad", price: 1500, image: "/images/brake-pad.jpg", description: "OEM quality brake pads", rating: 4.5, reviews: 32 },
  { id: 2, name: "Car Battery", price: 4500, image: "/images/car-battery.jpg", description: "12V high-performance battery", rating: 4.2, reviews: 18 },
];

const HomePage: React.FC = () => {
  const [view, setView] = useState<ViewType>("services");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
      // logout();
    }
  }, []);

  const data = view === "services" ? services : parts;

  return (
    <>
      <Header
        cartCount={4}
        view={view} // ✅ passes current state
        onViewChange={(newView) => setView(newView)} // ✅ updates state when clicked in Header
      />


      <Box
        px={{ xs: 2, md: 12 }}
        py={{ xs: 2, md: 8 }}
        minHeight="100vh"
        bgcolor="#f5f5f5"
        pt={{ xs: "60px", md: "80px" }}
      >
        {/* Toggle Buttons (Desktop Only) */}
        {!isMobile && (
          <Stack direction="row" justifyContent="center" mb={4}>
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={(_, val) => val && setView(val)}
              aria-label="view toggle"
            >
              <ToggleButton
                value="services"
                sx={{
                  borderRadius: 8,
                  px: 2,
                  py: 1,
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  "&.Mui-selected": {
                    fontWeight: 600,
                    transform: "scale(1.05)",
                    bgcolor: "primary.main",
                    color: "#fff",
                    "&:hover": { bgcolor: "primary.dark" },
                  },
                }}
              >
                Services
              </ToggleButton>

              <ToggleButton
                value="parts"
                sx={{
                  borderRadius: 8,
                  px: 2,
                  py: 1,
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  "&.Mui-selected": {
                    fontWeight: 600,
                    transform: "scale(1.05)",
                    bgcolor: "primary.main",
                    color: "#fff",
                    "&:hover": { bgcolor: "primary.dark" },
                  },
                }}
              >
                Shop
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        )}

        {/* Responsive Items Container */}
        <Box
          display="flex"
          flexWrap="wrap"
          gap={isMobile ? 1 : 2}
          justifyContent={isMobile ? "center" : "flex-start"}
          paddingLeft={isMobile ? 0 : 10}

        >
          {data.map((item) => (
            <Box
              key={item.id}
              flex={`0 0 ${isMobile ? "48%" : "22%"}`}
              maxWidth={isMobile ? "48%" : "22%"}
              boxShadow={3}
              borderRadius={3}
            >
              <ServiceCard item={item} view={view} isMobile={isMobile} />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

interface ServiceCardProps {
  item: Item;
  view: ViewType;
  isMobile?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ item, view, isMobile = false }) => (
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
    <Box position="relative">
      <Box
        component="img"
        src={item.image}
        alt={item.name}
        sx={{
          width: "100%",
          height: isMobile ? 120 : 180,
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

    <Typography variant={isMobile ? "body2" : "subtitle1"} fontWeight="bold" mt={1}>
      {item.name}
    </Typography>
    <Typography variant="caption" color="text.secondary" mb={0.5}>
      {item.description}
    </Typography>

    <Stack direction="row" alignItems="center" spacing={0.5} mb={0.5}>
      <Rating value={item.rating} precision={0.1} readOnly size="small" />
      <Typography variant="caption" color="text.secondary">
        ({item.reviews})
      </Typography>
    </Stack>

    <Divider sx={{ my: 0.5 }} />

    <Box display="flex" alignItems="center" justifyContent="space-between" mt={0.5}>
      <Typography variant="body2" color="primary" fontWeight="bold" fontFamily="cursive">
        ₹{item.price.toLocaleString()}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="small"
        sx={{ borderRadius: 2, textTransform: "none", px: 1.5, fontSize: "0.7rem", minWidth: "auto", fontWeight: "600", fontFamily: "inherit" }}
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
