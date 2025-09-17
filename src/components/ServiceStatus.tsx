"use client";

import React from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  LinearProgress,
  Avatar,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/Circle";

interface ServiceBooking {
  id: number;
  name: string;
  car: string;
  type: string;
  price: number;
  gst: number; // in percentage
  status: "Booked" | "Request Accepted" | "Out for Service" | "Arrived" | "Service Done";
  etaMinutes: number; // ETA for mechanic
  mechanicName: string;
  mechanicContact: string;
  time: string;
}

const mockServices: ServiceBooking[] = [
  {
    id: 1,
    name: "Oil Change",
    car: "Honda City",
    type: "Car Maintenance",
    price: 1200,
    gst: 18,
    status: "Out for Service",
    etaMinutes: 15,
    mechanicName: "Rohit Kumar",
    mechanicContact: "+91 9876543210",
    time: "10:15 AM",
  },
  {
    id: 2,
    name: "Tire Replacement",
    car: "Suzuki Swift",
    type: "Car Maintenance",
    price: 3500,
    gst: 18,
    status: "Arrived",
    etaMinutes: 0,
    mechanicName: "Amit Sharma",
    mechanicContact: "+91 9123456780",
    time: "09:50 AM",
  },
];

const statusSteps = [
  "Booked",
  "Request Accepted",
  "Out for Service",
  "Arrived",
  "Service Done",
];

export const ServiceStatus: React.FC = () => {
  return (
    <Stack spacing={3}>
      {mockServices.map((service) => {
        const currentStepIndex = statusSteps.indexOf(service.status);

        const finalPrice = service.price + service.price * (service.gst / 100);

        return (
          <Paper key={service.id} sx={{ p: 3, borderRadius: 3, position: "relative" }}>
            {/* Header: Service + Car */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Box>
                <Typography fontWeight="700" variant="h6">
                  {service.name} - {service.car}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.type}
                </Typography>
              </Box>
              <Chip label={service.status} color="primary" />
            </Stack>

            <Divider sx={{ my: 1 }} />

            {/* Price */}
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Typography>Price:</Typography>
              <Typography fontWeight="600">₹{service.price.toLocaleString()}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Typography>GST ({service.gst}%):</Typography>
              <Typography fontWeight="600">
                ₹{(service.price * (service.gst / 100)).toFixed(0)}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Typography>Total:</Typography>
              <Typography fontWeight="700">₹{finalPrice.toLocaleString()}</Typography>
            </Stack>

            <Divider sx={{ my: 1 }} />

            {/* ETA & Mechanic Info */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Box display="flex" alignItems="center" gap={1}>
                <LocationOnIcon color="secondary" />
                <Typography variant="body2">
                  Mechanic ETA: {service.etaMinutes} min
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2">Mechanic: {service.mechanicName}</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mt: 0.5, textTransform: "none" }}
                  onClick={() => alert(`Call ${service.mechanicContact}`)}
                >
                  Contact
                </Button>
              </Box>
            </Stack>

            {/* Progress Tracker */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} sx={{ position: "relative" }}>
              {statusSteps.map((step, index) => (
                <Box key={step} textAlign="center" sx={{ flex: 1, position: "relative" }}>
                  {index <= currentStepIndex ? (
                    <CheckCircleIcon color="primary" />
                  ) : (
                    <CircleIcon color="disabled" />
                  )}
                  <Typography variant="caption" sx={{ mt: 0.5, display: "block" }}>
                    {step}
                  </Typography>
                  {index < statusSteps.length - 1 && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "12px",
                        left: "50%",
                        width: "100%",
                        height: "3px",
                        bgcolor: index < currentStepIndex ? "primary.main" : "#ccc",
                        zIndex: -1,
                      }}
                    />
                  )}
                </Box>
              ))}
            </Stack>

            {/* Support Button */}
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button variant="outlined" color="secondary" onClick={() => alert("Contacting support")}>
                Support
              </Button>
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
};
