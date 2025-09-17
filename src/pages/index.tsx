"use client";

import React, { useState, useEffect } from "react";
import { getToken, isTokenExpired, logout } from "@/utils/auth";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/SideBar";
import { addToCart } from "@/utils/cart";
import { BookService } from "@/components/BookService";
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
  category?: string;
}

// ✅ Added categories to services for filtering
const services: Item[] = [
  { id: 1, name: "Oil Change", price: 1200, image: "/images/oil-change.jpg", description: "Includes engine oil & filter replacement", rating: 4.5, reviews: 120, discount: 10, category: "Car Maintenance" },
  { id: 2, name: "Tire Replacement", price: 3500, image: "/images/tire-replacement.jpg", description: "Complete tire removal and fitting", rating: 4.7, reviews: 95, category: "Car Maintenance" },
  { id: 3, name: "Tire Puncture", price: 3500, image: "/images/tire-puncture.jpg", description: "Quick puncture repair & pressure check", rating: 4.3, reviews: 60, category: "Vehicle Inspection" },
  { id: 4, name: "Dent/Paint", price: 3500, image: "/images/dent-paint.jpg", description: "Spot repair & professional paint finish", rating: 4.8, reviews: 70, discount: 15, category: "Body Repair" },
  { id: 5, name: "Engine Service", price: 3500, image: "/images/engine-service.jpg", description: "Full engine tune-up & cleaning", rating: 4.6, reviews: 80, category: "Car Maintenance" },
  { id: 6, name: "Brake Change", price: 3500, image: "/images/brake-change.jpg", description: "Front/rear brake pads replacement", rating: 4.4, reviews: 50, category: "Customization" },
];

const parts: Item[] = [
  { id: 1, name: "Brake Pad", price: 1500, image: "/images/brake-pad.jpg", description: "OEM quality brake pads", rating: 4.5, reviews: 32 },
  { id: 2, name: "Car Battery", price: 4500, image: "/images/car-battery.jpg", description: "12V high-performance battery", rating: 4.2, reviews: 18 },
];

const categories = ["All Type", "Car Maintenance", "Vehicle Inspection", "Body Repair", "Customization"];

const HomePage: React.FC = () => {
  const [view, setView] = useState<ViewType>("services");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [bookOpen, setBookOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Item | null>(null);

  const [category, setCategory] = useState<string>("All Type"); // ✅ Category filter state

  const userAddresses = [
    { id: 1, line1: "123 Main St", city: "Delhi", state: "DL", zip: "110001" },
    { id: 2, line1: "456 Market Rd", city: "Mumbai", state: "MH", zip: "400001" },
  ];
  const userVehicles = [
    { id: 1, name: "Honda City", model: "2020", number: "DL1AB1234" },
    { id: 2, name: "Suzuki Swift", model: "2019", number: "MH2XY5678" },
  ];

  useEffect(() => {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
      logout();
    }
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Filter by category & search query
  const filteredData = (view === "services" ? services : parts).filter((item) => {
    const matchCategory = category === "All Type" || item.category === category;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleBookClick = (service: Item) => {
    setSelectedService(service);
    setBookOpen(true);
  };

  return (
    <>
    
      <Header
        cartCount={4}
        view={view}
        onViewChange={(newView) => {
          setView(newView);
          setSearchQuery("");
        }}
        onSearch={(query, context) => {
          if (context === view) setSearchQuery(query);
        }}
      />

      <Box
        px={{ xs: 2, md: 12 }}
        py={{ xs: 2, md: 8 }}
        minHeight="100vh"
        bgcolor="#e9e9e9ff"
        pt={{ xs: "60px", md: "80px" }}
      >
        {/* Toggle Buttons */}
        {!isMobile && (
          <Stack direction="row" justifyContent="center" mb={4}>
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={(_, val) => val && setView(val)}
              aria-label="view toggle"
              sx={{
                display: "flex",
                width: "100%",
                height: 38,
                maxWidth: "1150px",
                mx: "auto",
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
                bgcolor: "#fff",
              }}
            >
              <ToggleButton value="services" sx={{ flex: 1, borderRadius: 0, py: 1.5, fontWeight: 600, fontSize: "1rem", textTransform: "none", "&.Mui-selected": { bgcolor: "primary.main", color: "#fff" } }}>
                Services
              </ToggleButton>
              <ToggleButton value="parts" sx={{ flex: 1, borderRadius: 0, py: 1.5, fontWeight: 600, fontSize: "1rem", textTransform: "none", "&.Mui-selected": { bgcolor: "primary.main", color: "#fff" } }}>
                Shop
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        )}

        {/* Section Title */}
        {!isMobile && (
          <Typography
            variant="h6"
            component="div"
            textAlign="left"
            mb={2}
            color="#141414ff"
            fontFamily="Arial"
            fontWeight="400"
            paddingLeft={16}
          >
            Available Services
          </Typography>
        )}


        {/* ✅ Category Filter Buttons */}
        {/* ✅ Category Filter */}
        {view === "services" && (
          <>
            {/* Desktop - Buttons */}
            {!isMobile && (
              <Stack direction="row" flexWrap="wrap" gap={1.5} mb={3} px={16}>
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    sx={{
                      borderColor: "#ccc",
                      color: category === cat ? "#fff" : "#333",
                      bgcolor: category === cat ? "primary.main" : "#fff",
                      "&:hover": { bgcolor: category === cat ? "primary.dark" : "#f5f5f5" },
                      borderRadius: 3,
                      textTransform: "none",
                      fontWeight: 500,
                      px: 2,
                      py: 0.75,
                      fontSize: "0.9rem",
                      boxShadow: category === cat ? "0px 2px 6px rgba(0,0,0,0.15)" : "none",
                    }}
                  >
                    {cat}
                  </Button>
                ))}
              </Stack>
            )}

            {/* Mobile - Dropdown */}
            {isMobile && (
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="500" color="#141414ff">
                  Available Services
                </Typography>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
          </>
        )}


        {/* Responsive Items Container */}
        <Box
          display="flex"
          flexWrap="wrap"
          gap={isMobile ? 1 : 3}
          justifyContent={isMobile ? "center" : "justify"}
          px={isMobile ? 0 : 3.75}
          py={isMobile ? 0 : 2}
          maxWidth={isMobile ? "100%" : "1200px"}
          mx="auto"
        >
          {filteredData.map((item) => (
            <Box key={item.id} flex={`0 0 ${isMobile ? "48%" : "23%"}`} maxWidth={isMobile ? "48%" : "23%"} display="flex">
              <ServiceCard item={item} view={view} isMobile={isMobile} onBookClick={handleBookClick} />
            </Box>
          ))}
        </Box>
      </Box>

      {/* BookService Modal */}
      {selectedService && (
        <BookService
          open={bookOpen}
          onClose={() => setBookOpen(false)}
          service={selectedService}
          addresses={userAddresses}
          vehicles={userVehicles}
          onConfirm={(data) => {
            console.log("Booking Confirmed:", data);
            alert("Service booked successfully!");
            setBookOpen(false);
          }}
        />
      )}
      <Footer />
    </>
      
  );
};

interface ServiceCardProps {
  item: Item;
  view: ViewType;
  isMobile?: boolean;
  onBookClick?: (service: Item) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ item, view, isMobile = false, onBookClick }) => (
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
    {/* Card Content */}
    <Box position="relative">
      <Box component="img" src={item.image} alt={item.name} sx={{ width: "100%", height: isMobile ? 120 : 180, objectFit: "cover", borderRadius: 2 }} />
      {item.discount && <Chip label={`-${item.discount}%`} color="error" size="small" sx={{ position: "absolute", top: 6, left: 6, fontWeight: "bold", fontSize: isMobile ? "0.65rem" : "0.75rem" }} />}
    </Box>

    <Typography variant={isMobile ? "body2" : "subtitle1"} fontWeight="bold" mt={1}>{item.name}</Typography>
    <Typography variant="caption" color="text.secondary" mb={0.5}>{item.description}</Typography>

    <Stack direction="row" alignItems="center" spacing={0.5} mb={0.5}>
      <Rating value={item.rating} precision={0.1} readOnly size="small" />
      <Typography variant="caption" color="text.secondary">({item.reviews})</Typography>
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
        onClick={() => (view === "parts" ? addToCart({ id: item.id, name: item.name, price: item.price, image: item.image }) : onBookClick?.(item))}
      >
        {view === "services" ? "Book Now" : "Add to Cart"}
      </Button>
    </Box>
  </Paper>
  
);


export default HomePage;
