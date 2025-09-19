"use client";

import { Paper, Typography, TextField, Stack, IconButton } from "@mui/material";
import { Search, Pencil, Trash } from "lucide-react";

const parts = [
  { name: "Brake Pad Front Set", sku: "BP-101", stock: 8, reorder: 15, supplier: "AutoParts Co." },
  { name: "Oil Filter", sku: "OF-223", stock: 12, reorder: 20, supplier: "FilterWorks" },
  { name: "Air Filter", sku: "AF-300", stock: 5, reorder: 10, supplier: "CleanAir Supply" },
];

export default function PartsInventory() {
  return (
    <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Parts Inventory Management
      </Typography>
      <TextField
        size="small"
        placeholder="Search Part..."
        InputProps={{
          startAdornment: <Search size={16} style={{ marginRight: 8 }} />,
        }}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Stack spacing={1}>
        {parts.map((p, idx) => (
          <Paper
            key={idx}
            sx={{
              p: 2,
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr auto",
              bgcolor: idx % 2 === 0 ? "#e7e7e7ff" : "#ffffff", // ✅ alternating colors
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography>{p.name}</Typography>
            <Typography>{p.sku}</Typography>
            <Typography>{p.stock}</Typography>
            <Typography>Reorder @ {p.reorder}</Typography>
            <Typography>{p.supplier}</Typography>
            <Stack direction="row">
              <IconButton><Pencil size={16} /></IconButton>
              <IconButton><Trash size={16} color="red" /></IconButton>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
}
