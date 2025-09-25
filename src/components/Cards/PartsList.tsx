"use client";

import React from "react";
import { Box } from "@mui/material";
import ServiceCard from "./ServiceCard";

interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
}

interface PartsListProps {
  items: Item[];
  isMobile: boolean;
  searchQuery?: string;
}

export const PartsList: React.FC<PartsListProps> = ({ items, isMobile, searchQuery = "" }) => {
  // ✅ Filter items by search query
  const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Box display="flex" flexWrap="wrap" gap={isMobile ? 1 : 3} justifyContent={isMobile ? "center" : "justify"} px={isMobile ? 0 : 3.75} py={isMobile ? 0 : 2} maxWidth={isMobile ? "100%" : "1200px"} mx="auto">
      {filteredItems.map((item) => (
        <Box key={item.id} flex={`0 0 ${isMobile ? "48%" : "23%"}`} maxWidth={isMobile ? "48%" : "23%"} display="flex">
          <ServiceCard item={item} type="parts" isMobile={isMobile} />

        </Box>
      ))}
    </Box>
  );
};
