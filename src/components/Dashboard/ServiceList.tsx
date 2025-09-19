"use client";

import {
  Paper,
  Typography,
  Stack,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { Search, Plus, Pencil, Trash } from "lucide-react";

const services = [
  { id: 1, name: "Oil Change", price: "$95.00", status: "Active" },
  { id: 2, name: "Tire Rotation", price: "$40.00", status: "Active" },
  { id: 3, name: "Brake Replacement", price: "$320.00", status: "Inactive" },
  { id: 4, name: "Wheel Alignment", price: "$110.00", status: "Active" },
];

export default function ServiceList() {
  return (
    <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={600}>
          Service List Management
        </Typography>
        <Button startIcon={<Plus size={18} />} variant="contained">
          Add Service
        </Button>
      </Stack>

      {/* Search Bar */}
      <TextField
        size="small"
        placeholder="Search Service..."
        InputProps={{
          startAdornment: <Search size={16} style={{ marginRight: 8 }} />,
        }}
        fullWidth
        sx={{ mb: 2 }}
      />

      {/* Service Rows */}
      <Stack spacing={1}>
        {services.map((s, index) => (
          <Paper
            key={s.id}
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: index % 2 === 0 ? "#e7e7e7ff" : "#ffffff", // ✅ alternating colors
              border: "1px solid #e5e7eb",
              borderRadius: 2,
            }}
          >
            {/* Service Info */}
            <Stack>
              <Typography fontWeight={600}>{s.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {s.price}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: s.status === "Active" ? "green" : "red",
                  fontWeight: 500,
                }}
              >
                {s.status}
              </Typography>
            </Stack>

            {/* Action Buttons */}
            <Stack direction="row" spacing={1}>
              <IconButton size="small" color="primary">
                <Pencil size={16} />
              </IconButton>
              <IconButton size="small" color="error">
                <Trash size={16} />
              </IconButton>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
}
