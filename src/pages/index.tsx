"use client";

import React, { useState, useEffect } from "react";
import { getToken, isTokenExpired, logout } from "@/utils/auth";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer";
import { useSearchParams, useRouter } from "next/navigation";
import { BookService } from "@/components/BookService";
import { Box, Stack, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ServicesList } from "@/components/Cards/ServiceList";
import { PartsList } from "@/components/Cards/PartsList";

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

// ✅ Sample Services & Parts
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialView = (searchParams?.get("view") as ViewType) || "services";
  const [view, setView] = useState<ViewType>(initialView);
  const [category, setCategory] = useState<string>("All Type");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookOpen, setBookOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Item | null>(null);

  useEffect(() => {
    router.replace(`/?view=${view}`);
  }, [view, router]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  const handleBookClick = (service: Item) => {
    setSelectedService(service);
    setBookOpen(true);
  };

  return (
    <>
      {/* Header */}
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

      {/* Page Content */}
      <Box px={{ xs: 2, md: 12 }} py={{ xs: 2, md: 8 }} minHeight="100vh" bgcolor="#e9e9e9ff" pt={{ xs: "60px", md: "80px" }}>
        {/* Desktop Toggle */}
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
                maxWidth: "1150px",
                height: 38,
                mx: "auto",
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
                bgcolor: "#fff",
              }}
            >
              <ToggleButton
                value="services"
                sx={{
                  flex: 1,
                  borderRadius: 0,
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: "1rem",
                  textTransform: "none",
                  "&.Mui-selected": { bgcolor: "primary.main", color: "#fff" },
                }}
              >
                Services
              </ToggleButton>
              <ToggleButton
                value="parts"
                sx={{
                  flex: 1,
                  borderRadius: 0,
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: "1rem",
                  textTransform: "none",
                  "&.Mui-selected": { bgcolor: "primary.main", color: "#fff" },
                }}
              >
                Shop
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        )}

        {/* Section */}
        {view === "services" ? (
          <ServicesList
            items={services}
            categories={categories}
            selectedCategory={category}
            onCategoryChange={setCategory}
            onBookClick={handleBookClick}
            isMobile={isMobile}
            searchQuery={searchQuery}
          />
        ) : (
          <PartsList items={parts} isMobile={isMobile} searchQuery={searchQuery} />
        )}
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

export default HomePage;
