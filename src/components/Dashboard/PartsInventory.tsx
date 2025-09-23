"use client";

import React, { useState, useMemo } from "react";
import {
  Paper,
  Typography,
  TextField,
  Stack,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  Box,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import { Search, Pencil, Trash, Plus, ArrowUpAZ, ArrowDownAZ } from "lucide-react";

export default function PartsInventory() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

   const [parts, setParts] = useState([
    { name: "Brake Pad Front Set", image: "", price: "100", discount:"10%", sku: "BP-101", stock: 8, reorder: 15, supplier: "AutoParts Co.", category: "Car", status: "Active" },
    { name: "Oil Filter", image: "", price: "50", discount:"5%", sku: "OF-223", stock: 12, reorder: 20, supplier: "FilterWorks", category: "Car", status: "Active" },
    { name: "Air Filter", image: "", price: "30", discount:"5%", sku: "AF-300", stock: 5, reorder: 10, supplier: "CleanAir Supply", category: "Two Wheeler", status: "Active" },
    { name: "Spark Plug Set", image: "", price: "25", discount:"5%", sku: "SP-110", stock: 20, reorder: 25, supplier: "SparkWorks", category: "Two Wheeler", status: "Active" },
    { name: "Brake Disc Front", image: "", price: "150", discount:"10%", sku: "BD-210", stock: 6, reorder: 10, supplier: "AutoParts Co.", category: "Car", status: "Inactive" },
    { name: "Fuel Pump", image: "", price: "200", discount:"15%", sku: "FP-330", stock: 4, reorder: 8, supplier: "PumpTech", category: "Car", status: "Active" },
    { name: "Clutch Plate", image: "", price: "75", discount:"5%", sku: "CP-440", stock: 7, reorder: 12, supplier: "ClutchWorld", category: "Two Wheeler", status: "Active" },
    { name: "Timing Belt", image: "", price: "90", discount:"5%", sku: "TB-150", stock: 10, reorder: 15, supplier: "BeltPro", category: "Car", status: "Active" },
    { name: "Car Battery - Bosch", image: "", price: "250", discount:"10%", sku: "CB-501", stock: 3, reorder: 5, supplier: "Bosch Auto", category: "Car", status: "Active" },
    { name: "Headlight Bulb", image: "", price: "20", discount:"5%", sku: "HB-610", stock: 15, reorder: 20, supplier: "LightPro", category: "Car", status: "Active" },
    { name: "Coolant", image: "", price: "10", discount:"5%", sku: "CL-720", stock: 18, reorder: 25, supplier: "FluidTech", category: "Car", status: "Active" },
    { name: "Wiper Blade Set", image: "", price: "35", discount:"5%", sku: "WB-830", stock: 12, reorder: 15, supplier: "WiperWorks", category: "Car", status: "Active" },
    { name: "Brake Caliper", image: "", price: "120", discount:"10%", sku: "BC-940", stock: 5, reorder: 8, supplier: "AutoParts Co.", category: "Car", status: "Inactive" },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });
  const [newPart, setNewPart] = useState({
    title: "",
    image: "",
    price: "",
    discount: "",
    category: "Car",
    status: "Active",
    supplier: "",
    stock: "",
    reorder: "",
  });

  const columnMap = {
    Name: "name",
    SKU: "sku",
    Stock: "stock",
    Reorder: "reorder",
    Supplier: "supplier",
    Category: "category",
    Status: "status",
  };

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  const handleChange = (field: string, value: string) => setNewPart((prev) => ({ ...prev, [field]: value }));

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setNewPart({ title: "", image: "", price: "", discount: "", category: "Car", status: "Active", supplier: "", stock: "", reorder: "" });
    setOpenDialog(true);
  };

  const handleEdit = (index: number) => {
    const part = parts[index];
    setEditingIndex(index);
    setNewPart({
      title: part.name,
      image: part.image || "",
      price: part.price || "",
      discount: part.discount || "",
      category: part.category,
      status: part.status,
      supplier: part.supplier,
      stock: String(part.stock),
      reorder: String(part.reorder),
    });
    setOpenDialog(true);
  };

  const handleSave = () => {
    if (!newPart.title) return alert("Please enter part title");

    const updatedPart = {
      name: newPart.title,
      sku: editingIndex !== null ? parts[editingIndex].sku : `SKU-${Math.floor(Math.random() * 900 + 100)}`,
      stock: Number(newPart.stock) || 0,
      reorder: Number(newPart.reorder) || 10,
      supplier: newPart.supplier || "Unknown Supplier",
      image: newPart.image,
      price: newPart.price,
      discount: newPart.discount,
      category: newPart.category,
      status: newPart.status,
    };

    if (editingIndex !== null) {
      const updatedParts = [...parts];
      updatedParts[editingIndex] = updatedPart;
      setParts(updatedParts);
      setSnackbar({ open: true, message: "Part updated successfully", severity: "success" });
    } else {
      setParts((prev) => [...prev, updatedPart]);
      setSnackbar({ open: true, message: "Part added successfully", severity: "success" });
    }

    setOpenDialog(false);
    setEditingIndex(null);
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      setSnackbar({ open: true, message: `Deleted ${parts[deleteIndex].name}`, severity: "success" });
      setParts((prev) => prev.filter((_, i) => i !== deleteIndex));
      setDeleteIndex(null);
    }
  };

  const filteredParts = parts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedParts = useMemo(() => {
    if (sortConfig) {
      return [...filteredParts].sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
        }
        return sortConfig.direction === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });
    }
    return filteredParts;
  }, [filteredParts, sortConfig]);

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  return (
    <Paper sx={{ p: 2, mb: 4 }} elevation={3}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={600}>
          Parts Inventory Management
        </Typography>
        <Button startIcon={<Plus size={18} />} variant="contained" onClick={handleOpenAdd}>
          Add Part
        </Button>
      </Stack>

      {/* Search */}
      <TextField
        size="small"
        placeholder="Search Part..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{ startAdornment: <Search size={16} style={{ marginRight: 8 }} /> }}
        fullWidth
        sx={{ mb: 2 }}
      />

      {/* Table / Cards */}
      {!isMobile ? (
        <Box
          sx={{
            maxHeight: 400,
            overflow: "auto",
            border: "1px solid #ddd",
            borderRadius: 1,
            "&::-webkit-scrollbar": { width: 6 },
            "&::-webkit-scrollbar-thumb": { backgroundColor: "#bdbdbd", borderRadius: 10 },
          }}
        >
          {/* Headings */}
          <Stack direction="row" sx={{ position: "sticky", top: 0, bgcolor: "#f5f5f5", zIndex: 1, borderBottom: "1px solid #ccc", p: 1 }}>
            {(Object.keys(columnMap) as Array<keyof typeof columnMap>).map((heading) => {
              const key = columnMap[heading];
              const isActive = sortConfig?.key === key;
              const isAsc = sortConfig?.direction === "asc";
              return (
                <Box
                  key={heading}
                  sx={{ flex: 1, display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer", userSelect: "none" }}
                  onClick={() => requestSort(key)}
                >
                  <Typography fontWeight={600}>{heading}</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", opacity: isActive ? 1 : 0.3, transform: isActive && !isAsc ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <ArrowUpAZ size={14} />
                  </Box>
                </Box>
              );
            })}
            <Box sx={{ flex: "0 0 80px", display: "flex", alignItems: "center" }}>
              <Typography fontWeight={600}>Actions</Typography>
            </Box>
          </Stack>

          {/* Rows */}
          {sortedParts.map((p, idx) => (
            <Stack key={idx} direction="row" sx={{ p: 1, bgcolor: idx % 2 === 0 ? "#fafafa" : "#fff", borderBottom: "1px solid #eee", alignItems: "center" }}>
              <Box sx={{ flex: 1 }}>{p.name}</Box>
              <Box sx={{ flex: 1 }}>{p.sku}</Box>
              <Box sx={{ flex: 1 }}>{p.stock}</Box>
              <Box sx={{ flex: 1 }}>Reorder @ {p.reorder}</Box>
              <Box sx={{ flex: 1 }}>{p.supplier}</Box>
              <Box sx={{ flex: 1 }}>{p.category}</Box>
              <Box sx={{ flex: 1 }}>{p.status}</Box>
              <Stack direction="row" spacing={1} sx={{ flex: "0 0 80px" }}>
                <IconButton size="small" onClick={() => handleEdit(idx)}>
                  <Pencil size={16} />
                </IconButton>
                <IconButton size="small" onClick={() => setDeleteIndex(idx)}>
                  <Trash size={16} color="red" />
                </IconButton>
              </Stack>
            </Stack>
          ))}
        </Box>
      ) : (
        // 📱 MOBILE: Card layout
        <Stack spacing={1}>
          {sortedParts.map((p, idx) => (
            <Paper key={idx} sx={{ p: 1.5, border: "1px solid #ddd", borderRadius: 2 }}>
              <Typography fontWeight={600}>{p.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {p.sku}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2">Stock: {p.stock} | Reorder: {p.reorder}</Typography>
              <Typography variant="body2">Supplier: {p.supplier}</Typography>
              <Typography variant="body2">Category: {p.category}</Typography>
              <Typography variant="body2">Status: {p.status}</Typography>
              <Stack direction="row" spacing={1} mt={1}>
                <IconButton size="small" onClick={() => handleEdit(idx)}>
                  <Pencil size={16} />
                </IconButton>
                <IconButton size="small" onClick={() => setDeleteIndex(idx)}>
                  <Trash size={16} color="red" />
                </IconButton>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingIndex !== null ? "Edit Part" : "Add New Part"}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} mt={1}>
            <TextField label="Title" value={newPart.title} onChange={(e) => handleChange("title", e.target.value)} fullWidth />
            <TextField label="Image URL" value={newPart.image} onChange={(e) => handleChange("image", e.target.value)} fullWidth />
            <TextField label="Price" value={newPart.price} onChange={(e) => handleChange("price", e.target.value)} fullWidth />
            <TextField label="Discount (%)" value={newPart.discount} onChange={(e) => handleChange("discount", e.target.value)} fullWidth />
            <TextField label="Supplier" value={newPart.supplier} onChange={(e) => handleChange("supplier", e.target.value)} fullWidth />
            <TextField label="Stock" type="number" value={newPart.stock} onChange={(e) => handleChange("stock", e.target.value)} fullWidth />
            <TextField label="Reorder Level" type="number" value={newPart.reorder} onChange={(e) => handleChange("reorder", e.target.value)} fullWidth />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select value={newPart.category} onChange={(e) => handleChange("category", e.target.value)}>
                <MenuItem value="Car">Car</MenuItem>
                <MenuItem value="Two Wheeler">Two Wheeler</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={newPart.status} onChange={(e) => handleChange("status", e.target.value)}>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="inherit">Cancel</Button>
          <Button variant="contained" onClick={handleSave}>{editingIndex !== null ? "Update" : "Save"}</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteIndex !== null} onClose={() => setDeleteIndex(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent dividers>
          <Typography>Are you sure you want to delete <strong>{deleteIndex !== null && parts[deleteIndex].name}</strong>?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteIndex(null)} color="inherit">Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert>
      </Snackbar>
    </Paper>
  );
}
