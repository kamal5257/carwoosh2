"use client";

import React from "react";
import { Box, Stack, Button, Typography } from "@mui/material";
import ServiceCard from "./ServiceCard";

interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  discount?: number;
  category?: string;
}

interface ServicesListProps {
  items: Item[];
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  onBookClick: (service: Item) => void;
  isMobile: boolean;
  searchQuery?: string;
}

export const ServicesList: React.FC<ServicesListProps> = ({
  items,
  categories,
  selectedCategory,
  onCategoryChange,
  onBookClick,
  isMobile,
  searchQuery = "",
}) => {
  // ✅ Filter items by category and search query
  const filteredItems = items.filter((item) => {
    const matchCategory = selectedCategory === "All Type" || item.category === selectedCategory;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
      {/* Category Filter */}
      {!isMobile && (
        <Stack direction="row" flexWrap="wrap" gap={1.5} mb={3} px={16}>
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              sx={{
                borderColor: "#ccc",
                color: selectedCategory === cat ? "#fff" : "#333",
                bgcolor: selectedCategory === cat ? "primary.main" : "#fff",
                "&:hover": { bgcolor: selectedCategory === cat ? "primary.dark" : "#f5f5f5" },
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 500,
                px: 2,
                py: 0.75,
                fontSize: "0.9rem",
                boxShadow: selectedCategory === cat ? "0px 2px 6px rgba(0,0,0,0.15)" : "none",
              }}
            >
              {cat}
            </Button>
          ))}
        </Stack>
      )}

      {/* Mobile Dropdown */}
      {isMobile && (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="500" color="#141414ff">
            Available Services
          </Typography>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            style={{
              padding: "6px 10px",
              color: "#333",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </Box>
      )}

      {/* Service Cards */}
      <Box display="flex" flexWrap="wrap" gap={isMobile ? 1 : 3} justifyContent={isMobile ? "center" : "justify"} px={isMobile ? 0 : 3.75} py={isMobile ? 0 : 2} maxWidth={isMobile ? "100%" : "1200px"} mx="auto">
        {filteredItems.map((item) => (
          <Box key={item.id} flex={`0 0 ${isMobile ? "48%" : "23%"}`} maxWidth={isMobile ? "48%" : "23%"} display="flex">
            <ServiceCard item={item} type="services" isMobile={isMobile} onBookClick={onBookClick} />
          </Box>
        ))}
      </Box>
    </>
  );
};
