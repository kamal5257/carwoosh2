"use client";

import React from "react";
import { Paper, Box, Typography, Stack, Button, Divider, Chip, Rating } from "@mui/material";
import { addToCart } from "@/utils/cart";

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

interface ServiceCardProps {
  item: Item;
  type: "services" | "parts"; // determines button action
  isMobile?: boolean;
  onBookClick?: (service: Item) => void; // only used for services
}

const ServiceCard: React.FC<ServiceCardProps> = ({ item, type, isMobile = false, onBookClick }) => {
  const handleButtonClick = () => {
    if (type === "services") {
      onBookClick?.(item);
    } else {
      addToCart({ id: item.id, name: item.name, price: item.price, image: item.image });
    }
  };

  const buttonText = type === "services" ? "Book Now" : "Add to Cart";

  return (
    <Paper
      elevation={4}
      sx={{
        p: isMobile ? 1 : 2.5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        borderRadius: 4,
        border: "1px solid #eaeaea",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
        backgroundColor: "#fff",
      }}
    >
      {/* Image & Discount */}
      <Box position="relative">
        <Box
          component="img"
          src={item.image}
          alt={item.name}
          sx={{ width: "100%", height: isMobile ? 120 : 180, objectFit: "cover", borderRadius: 2 }}
        />
        {item.discount && (
          <Chip
            label={`-${item.discount}%`}
            color="error"
            size="small"
            sx={{ position: "absolute", top: 6, left: 6, fontWeight: "bold", fontSize: isMobile ? "0.65rem" : "0.75rem" }}
          />
        )}
      </Box>

      {/* Info */}
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

      {/* Price & Action Button */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mt={0.5}>
        <Typography variant="body2" color="primary" fontWeight="bold" fontFamily="cursive">
          ₹{item.price.toLocaleString()}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{ borderRadius: 2, textTransform: "none", px: 1.5, fontSize: "0.7rem", minWidth: "auto", fontWeight: "600", fontFamily: "inherit" }}
          onClick={handleButtonClick}
        >
          {buttonText}
        </Button>
      </Box>
    </Paper>
  );
};

export default ServiceCard;
