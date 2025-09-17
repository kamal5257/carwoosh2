"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Chip,
  Button,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/Circle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

interface PartOrder {
  id: number;
  name: string;
  price: number;
  gst: number;
  distributor: string;
  distributorContact: string;
  deliveryPerson: string;
  deliveryContact: string;
  status: "Ordered" | "Preparing" | "Out for Delivery" | "Delivered";
  etaMinutes: number; // initial ETA in minutes
  time: string;
}

const mockParts: PartOrder[] = [
  {
    id: 1,
    name: "Brake Pad - Honda City",
    price: 1500,
    gst: 18,
    distributor: "AutoZone Delhi",
    distributorContact: "+91 9876543210",
    deliveryPerson: "Ramesh Kumar",
    deliveryContact: "+91 9123456780",
    status: "Out for Delivery",
    etaMinutes: 10,
    time: "10:10 AM",
  },
  {
    id: 2,
    name: "Car Battery - Suzuki Swift",
    price: 4500,
    gst: 18,
    distributor: "BatteryHub Mumbai",
    distributorContact: "+91 9123456780",
    deliveryPerson: "Suresh Singh",
    deliveryContact: "+91 9876543211",
    status: "Preparing",
    etaMinutes: 10,
    time: "09:55 AM",
  },
];

const statusSteps = ["Ordered", "Preparing", "Out for Delivery", "Delivered"];

export const PartStatus: React.FC = () => {
  const [countdowns, setCountdowns] = useState<number[]>(
    mockParts.map((p) => p.etaMinutes * 60)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns((prev) =>
        prev.map((time) => (time > 0 ? time - 1 : 0))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")} min`;
  };

  return (
    <Stack spacing={3}>
      {mockParts.map((part, idx) => {
        const currentStepIndex = statusSteps.indexOf(part.status);
        const finalPrice = part.price + part.price * (part.gst / 100);

        return (
          <Paper key={part.id} sx={{ p: 3, borderRadius: 3, position: "relative" }}>
            {/* Header */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Box>
                <Typography fontWeight="700" variant="h6">
                  {part.name}
                </Typography>
              </Box>
              <Chip label={part.status} color="primary" />
            </Stack>

            <Divider sx={{ my: 1 }} />

            {/* Price Details */}
            <Stack direction="row" justifyContent="space-between" mb={1}>
              <Typography>Price:</Typography>
              <Typography fontWeight="600">₹{part.price.toLocaleString()}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" mb={1}>
              <Typography>GST ({part.gst}%):</Typography>
              <Typography fontWeight="600">₹{(part.price * (part.gst / 100)).toFixed(0)}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Typography>Total:</Typography>
              <Typography fontWeight="700">₹{finalPrice.toLocaleString()}</Typography>
            </Stack>

            <Divider sx={{ my: 1 }} />

            {/* ETA & Distributor / Delivery Person Info */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
              <Box>
                <Stack direction="row" alignItems="center" gap={1}>
                  <LocalShippingIcon color="secondary" />
                  <Typography variant="body2">
                    ETA: {formatTime(countdowns[idx])}
                  </Typography>
                </Stack>
                <Typography variant="body2">Distributor: {part.distributor}</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mt: 0.5, textTransform: "none" }}
                  onClick={() => alert(`Call Distributor: ${part.distributorContact}`)}
                >
                  Contact Distributor
                </Button>
              </Box>
              <Box>
                <Typography variant="body2">Delivery Boy: {part.deliveryPerson}</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mt: 0.5, textTransform: "none" }}
                  onClick={() => alert(`Call Delivery Boy: ${part.deliveryContact}`)}
                >
                  Contact Delivery
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
            <Stack direction="row" justifyContent="flex-end">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => alert("Contacting support")}
              >
                Support
              </Button>
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
};
