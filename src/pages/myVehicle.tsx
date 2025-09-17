"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Image from "next/image";

export default function MyVehicle() {
  const [vehicle] = useState({
    make: "Toyota",
    model: "Camry XSE",
    year: 2023,
    vin: "J1FABG123DEF45678",
    mileage: "35,200 mi",
    status: "Active",
    engineType: "2.5L 4-Cylinder",
    fuelType: "Gasoline",
    transmission: "8-Speed Automatic",
    color: "Dark Blue Metallic",
    doors: 4,
    seats: 5,
    registrationNo: "ABC-1234",
    registrationExpiry: "2025-09-30",
    insuranceProvider: "SafeDrive Inc.",
    insurancePolicy: "SD-96754321",
    warrantyStatus: "Active",
    warrantyExpiry: "2026-05-20",
    contact: {
      name: "Jane Doe",
      phone: "+1 (555) 123-4567",
      email: "jane.doe@example.com",
      dealership: "Prime Autos",
      location: "Main Street, Anytown",
    },
    serviceHistory: [
      { date: "2024-06-15", type: "Oil Change", mileage: "35,200 mi", cost: "$95.00", mechanic: "Quick Lube" },
      { date: "2024-03-01", type: "Tire Rotation", mileage: "30,150 mi", cost: "$40.00", mechanic: "TyreWorks" },
      { date: "2023-11-20", type: "Brake Pad Replacement", mileage: "25,500 mi", cost: "$320.00", mechanic: "AutoPro" },
      { date: "2023-08-05", type: "Full Inspection", mileage: "20,000 mi", cost: "$150.00", mechanic: "Dealership Service" },
      { date: "2023-02-10", type: "Fluid Check", mileage: "12,000 mi", cost: "$0.00", mechanic: "Quick Lube" },
    ],
  });

  return (
    <Box bgcolor="#f5f5f5" minHeight="100vh" py={7} sx={{ width: "100%", overflowX: "hidden" }}>
      {/* ✅ Centered Container */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, md: 4 },
          width: "100%", // Ensures no overflow
        }}
      >
        <Typography variant="h5" fontWeight={700} mb={2} color="text.primary">
          Vehicle Details: {vehicle.year} {vehicle.make} {vehicle.model}
        </Typography>

        <Stack spacing={3}>
          {/* Vehicle Overview */}
          <Paper sx={{ p: 3 }} elevation={3}>
            <Typography variant="h6" fontWeight={600} mb={2}>Vehicle Overview</Typography>
            <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Box
                  sx={{
                    width: { xs: "100%", sm: 200 }, // Responsive width
                    maxWidth: 250,
                    height: "auto",
                    bgcolor: "#ddd",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src="/images/toyota-camry-color-454898.avif"
                    alt="Vehicle"
                    width={200}
                    height={150}
                    style={{ width: "100%", height: "auto" }} // ✅ Makes image shrink on small screens
                  />
                </Box>
              </Box>

              <Stack spacing={1}>
                <Typography><strong>Make:</strong> {vehicle.make}</Typography>
                <Typography><strong>Model:</strong> {vehicle.model}</Typography>
                <Typography><strong>Year:</strong> {vehicle.year}</Typography>
                <Typography><strong>VIN:</strong> {vehicle.vin}</Typography>
                <Typography><strong>Mileage:</strong> {vehicle.mileage}</Typography>
                <Typography>
                  <strong>Status:</strong>{" "}
                  <span style={{ color: "green", fontWeight: 600 }}>{vehicle.status}</span>
                </Typography>
              </Stack>
            </Stack>

            {/* Quick Actions */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={3}>
              <Button variant="contained" color="primary" fullWidth>
                Schedule Service
              </Button>
              <Button variant="outlined" fullWidth>
                Generate Report
              </Button>
              <Button variant="text" color="error" fullWidth>
                Archive Vehicle
              </Button>
            </Stack>
          </Paper>

          {/* Specifications + Ownership */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <Paper sx={{ p: 3, flex: 1 }} elevation={3}>
              <Typography variant="h6" fontWeight={600} mb={2}>Specifications</Typography>
              <Typography><strong>Engine:</strong> {vehicle.engineType}</Typography>
              <Typography><strong>Fuel Type:</strong> {vehicle.fuelType}</Typography>
              <Typography><strong>Transmission:</strong> {vehicle.transmission}</Typography>
              <Typography><strong>Color:</strong> {vehicle.color}</Typography>
              <Typography><strong>Doors:</strong> {vehicle.doors}</Typography>
              <Typography><strong>Seating Capacity:</strong> {vehicle.seats}</Typography>
            </Paper>

            <Paper sx={{ p: 3, flex: 1 }} elevation={3}>
              <Typography variant="h6" fontWeight={600} mb={2}>Ownership & Documentation</Typography>
              <Typography><strong>Registration No:</strong> {vehicle.registrationNo}</Typography>
              <Typography><strong>Registration Expiry:</strong> {vehicle.registrationExpiry}</Typography>
              <Typography><strong>Insurance Provider:</strong> {vehicle.insuranceProvider}</Typography>
              <Typography><strong>Policy No:</strong> {vehicle.insurancePolicy}</Typography>
              <Typography><strong>Warranty:</strong>{" "}
                <span style={{ color: "green" }}>{vehicle.warrantyStatus}</span>
              </Typography>
              <Typography><strong>Warranty Expiry:</strong> {vehicle.warrantyExpiry}</Typography>
            </Paper>
          </Stack>

          {/* ✅ Scrollable Table for Mobile */}
          <Paper sx={{ p: 3, overflowX: "auto" }} elevation={3}>
            <Typography variant="h6" fontWeight={600} mb={2}>Service History</Typography>
            <Table size="small" sx={{ minWidth: 500 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Service Type</TableCell>
                  <TableCell>Mileage</TableCell>
                  <TableCell>Cost</TableCell>
                  <TableCell>Mechanic</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vehicle.serviceHistory.map((s, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{s.date}</TableCell>
                    <TableCell>{s.type}</TableCell>
                    <TableCell>{s.mileage}</TableCell>
                    <TableCell>{s.cost}</TableCell>
                    <TableCell>{s.mechanic}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          {/* Notes + Contact */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <Paper sx={{ p: 3, flex: 1 }} elevation={3}>
              <Typography variant="h6" fontWeight={600} mb={2}>Custom Notes</Typography>
              <Typography variant="body2">
                Vehicle is in excellent condition. Recent detailing was completed on 2024-07-10. Ready for sale.
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, flex: 1 }} elevation={3}>
              <Typography variant="h6" fontWeight={600} mb={2}>Contact Information</Typography>
              <Typography><strong>Primary Contact:</strong> {vehicle.contact.name}</Typography>
              <Typography><strong>Phone:</strong> {vehicle.contact.phone}</Typography>
              <Typography><strong>Email:</strong> {vehicle.contact.email}</Typography>
              <Typography><strong>Dealership:</strong> {vehicle.contact.dealership}</Typography>
              <Typography><strong>Location:</strong> {vehicle.contact.location}</Typography>
            </Paper>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
