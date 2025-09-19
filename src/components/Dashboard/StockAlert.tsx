"use client";

import React, { useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
  Chip,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { AlertTriangle, Package, RefreshCcw } from "lucide-react";

interface StockItem {
  id: number;
  name: string;
  sku: string;
  stock: number;
  reorderLevel: number;
  supplier: string;
}

const initialLowStock: StockItem[] = [
  { id: 1, name: "Brake Pad Front Set", sku: "BP-101", stock: 8, reorderLevel: 15, supplier: "AutoParts Co." },
  { id: 2, name: "Air Filter", sku: "AF-300", stock: 4, reorderLevel: 10, supplier: "CleanAir Supply" },
  { id: 3, name: "Spark Plug Set", sku: "SP-77", stock: 6, reorderLevel: 12, supplier: "Ignite Supplies" },
];

export default function StockAlert() {
  const [items, setItems] = useState<StockItem[]>(initialLowStock);
  const [snack, setSnack] = useState<{ open: boolean; message?: string; severity?: "success" | "info" }>({
    open: false,
    message: "",
    severity: "info",
  });

  const handleCloseSnack = () => setSnack({ ...snack, open: false });

  // Simulate reorder
  const handleReorder = (id: number) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, stock: it.stock + Math.max(5, Math.round(it.reorderLevel * 0.75)) } : it
      )
    );
    setSnack({ open: true, message: "Reorder placed — ETA ~10min (local distributor)", severity: "success" });
  };

  const handleRefresh = (id: number) => {
    setSnack({ open: true, message: "Stock refreshed", severity: "info" });
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <AlertTriangle size={18} color="#ff9800" />
          <Typography variant="h6" fontWeight={600}>
            Low Stock Alert
          </Typography>
          <Chip label={`${items.length} items`} size="small" sx={{ ml: 1 }} />
        </Stack>

        <Typography variant="body2" color="text.secondary">
          Automatic delivery: local distributor (≈10min)
        </Typography>
      </Stack>

      {/* Table */}
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Part</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Reorder At</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {items.map((it, index) => {
              const isLow = it.stock < it.reorderLevel;
              return (
                <TableRow
                  key={it.id}
                  sx={{
                    bgcolor: index % 2 === 0 ? "#e7e7e7ff" : "#ffffff", // ✅ alternating colors
                    "&:hover": { bgcolor: "#f1f5f9" }, // ✅ Subtle hover effect
                  }}
                >
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Package size={16} />
                      <Typography fontWeight={600}>{it.name}</Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>{it.sku}</TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: isLow ? "error.main" : "text.primary",
                        }}
                      >
                        {it.stock}
                      </Typography>
                      {isLow ? (
                        <Chip label="LOW" size="small" color="error" />
                      ) : (
                        <Chip label="OK" size="small" />
                      )}
                    </Stack>
                  </TableCell>

                  <TableCell>{it.reorderLevel}</TableCell>
                  <TableCell>{it.supplier}</TableCell>

                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleReorder(it.id)}
                        sx={{ px: 2 }}
                      >
                        Reorder
                      </Button>

                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleRefresh(it.id)}
                        startIcon={<RefreshCcw size={14} />}
                      >
                        Refresh
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>

      {/* Snackbar */}
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity={snack.severity} sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
