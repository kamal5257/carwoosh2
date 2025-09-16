"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Modal,
  Stack,
} from "@mui/material";

interface Address {
  id: number;
  line1: string;
  city: string;
  state: string;
  zip: string;
}

interface Vehicle {
  id: number;
  name: string;
  model: string;
  number: string;
}

interface BookServiceProps {
  open: boolean;
  onClose: () => void;
  service: { id: number; name: string; price: number };
  addresses: Address[];
  vehicles: Vehicle[];
  onConfirm: (data: {
    serviceId: number;
    addressId: number;
    vehicleId?: number;
    customVehicle?: { name: string; model: string; number: string };
  }) => void;
}

export const BookService: React.FC<BookServiceProps> = ({
  open,
  onClose,
  service,
  addresses,
  vehicles,
  onConfirm,
}) => {
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<
    number | "custom" | null
  >(null);
  const [customVehicle, setCustomVehicle] = useState({
    name: "",
    model: "",
    number: "",
  });

  useEffect(() => {
    if (addresses.length) setSelectedAddress(addresses[0].id);
    if (vehicles.length) setSelectedVehicle(vehicles[0].id);
  }, [addresses, vehicles]);

  const handleConfirm = () => {
    if (!selectedAddress) return alert("Please select an address");
    if (!selectedVehicle) return alert("Please select a vehicle");

    if (selectedVehicle === "custom") {
      if (!customVehicle.name || !customVehicle.model || !customVehicle.number) {
        return alert("Please fill custom vehicle details");
      }
      onConfirm({
        serviceId: service.id,
        addressId: selectedAddress,
        customVehicle,
      });
    } else {
      onConfirm({
        serviceId: service.id,
        addressId: selectedAddress,
        vehicleId: selectedVehicle,
      });
    }

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 400 },
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 3,
          color: "text.primary", // make all text dark by default
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="text.primary" mb={2}>
          Book {service.name}
        </Typography>

        <Typography variant="subtitle2" color="text.primary" mb={1}>
          Select Address
        </Typography>
        <RadioGroup
          value={selectedAddress?.toString() || ""}
          onChange={(e) => setSelectedAddress(Number(e.target.value))}
        >
          {addresses.map((addr) => (
            <FormControlLabel
              key={addr.id}
              value={addr.id.toString()}
              control={<Radio />}
              label={
                <Typography variant="body2" color="text.primary">
                  {addr.line1}, {addr.city}, {addr.state} - {addr.zip}
                </Typography>
              }
            />
          ))}
        </RadioGroup>

        <Typography variant="subtitle2" color="text.primary" mt={2} mb={1}>
          Select Vehicle
        </Typography>
        <RadioGroup
          value={selectedVehicle?.toString() || ""}
          onChange={(e) =>
            setSelectedVehicle(
              e.target.value === "custom" ? "custom" : Number(e.target.value)
            )
          }
        >
          {vehicles.map((v) => (
            <FormControlLabel
              key={v.id}
              value={v.id.toString()}
              control={<Radio />}
              label={
                <Typography variant="body2" color="text.primary">
                  {v.name} ({v.model}, {v.number})
                </Typography>
              }
            />
          ))}
          <FormControlLabel
            value="custom"
            control={<Radio />}
            label={
              <Typography variant="body2" color="text.primary">
                Not for self / Add new vehicle
              </Typography>
            }
          />
        </RadioGroup>

        {selectedVehicle === "custom" && (
          <Stack spacing={1} mt={1}>
            <TextField
              label="Vehicle Name"
              value={customVehicle.name}
              onChange={(e) =>
                setCustomVehicle({ ...customVehicle, name: e.target.value })
              }
              size="small"
              fullWidth
              InputLabelProps={{ style: { color: "#000" } }}
              InputProps={{ style: { color: "#000" } }}
            />
            <TextField
              label="Model"
              value={customVehicle.model}
              onChange={(e) =>
                setCustomVehicle({ ...customVehicle, model: e.target.value })
              }
              size="small"
              fullWidth
              InputLabelProps={{ style: { color: "#000" } }}
              InputProps={{ style: { color: "#000" } }}
            />
            <TextField
              label="Number"
              value={customVehicle.number}
              onChange={(e) =>
                setCustomVehicle({ ...customVehicle, number: e.target.value })
              }
              size="small"
              fullWidth
              InputLabelProps={{ style: { color: "#000" } }}
              InputProps={{ style: { color: "#000" } }}
            />
          </Stack>
        )}

        <Box display="flex" justifyContent="flex-end" mt={3} gap={1}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleConfirm}>
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
