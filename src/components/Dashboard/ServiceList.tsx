"use client";

import { useState } from "react";
import {
  Paper,
  Typography,
  Stack,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from "@mui/material";
import { Search, Plus, Pencil, Trash } from "lucide-react";

const initialServices = [
  { id: 1, name: "Oil Change", price: "$95.00", status: "Active", description: "", photo: null },
  { id: 2, name: "Tire Rotation", price: "$40.00", status: "Active", description: "", photo: null },
  { id: 3, name: "Brake Replacement", price: "$320.00", status: "Inactive", description: "", photo: null },
  { id: 4, name: "Wheel Alignment", price: "$110.00", status: "Active", description: "", photo: null },
];

export default function ServiceList() {
  const [services, setServices] = useState(initialServices);
  const [openModal, setOpenModal] = useState(false);
  const [editingService, setEditingService] = useState<typeof initialServices[0] | null>(null);

  const handleOpenModal = (service?: typeof initialServices[0]) => {
    if (service) {
      setEditingService(service);
    } else {
      setEditingService({ id: Date.now(), name: "", price: "", status: "Active", description: "", photo: null });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingService(null);
  };

  const handleSaveService = () => {
    if (!editingService) return;

    setServices((prev) => {
      const existingIndex = prev.findIndex((s) => s.id === editingService.id);
      if (existingIndex >= 0) {
        // Update existing
        const updated = [...prev];
        updated[existingIndex] = editingService;
        return updated;
      } else {
        // Add new
        return [...prev, editingService];
      }
    });

    handleCloseModal();
  };

  const handleDeleteService = (id: number) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <>
      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Service List Management
          </Typography>
          <Button startIcon={<Plus size={18} />} variant="contained" onClick={() => handleOpenModal()}>
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
          {services.map((s) => (
            <Paper
              key={s.id}
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
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
                <IconButton size="small" color="primary" onClick={() => handleOpenModal(s)}>
                  <Pencil size={16} />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => handleDeleteService(s.id)}>
                  <Trash size={16} />
                </IconButton>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Paper>

      {/* Modal for Add/Edit Service */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>{editingService && services.find(s => s.id === editingService.id) ? "Edit Service" : "Add Service"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Title"
              fullWidth
              value={editingService?.name || ""}
              onChange={(e) =>
                setEditingService((prev) => prev && { ...prev, name: e.target.value })
              }
            />
            <TextField
              label="Price"
              fullWidth
              value={editingService?.price || ""}
              onChange={(e) =>
                setEditingService((prev) => prev && { ...prev, price: e.target.value })
              }
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              minRows={3}
              value={editingService?.description || ""}
              onChange={(e) =>
                setEditingService((prev) => prev && { ...prev, description: e.target.value })
              }
            />
            <TextField
              select
              label="Status"
              value={editingService?.status || "Active"}
              onChange={(e) =>
                setEditingService((prev) => prev && { ...prev, status: e.target.value })
              }
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
            <Button variant="outlined" component="label">
              Upload Photo
              <input
                type="file"
                hidden
                onChange={(e) =>
                  setEditingService((prev) =>
                    prev && { ...prev, photo: e.target.files?.[0] || null }
                  )
                }
              />
            </Button>
            {editingService?.photo && <Typography>{editingService.photo.name}</Typography>}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveService}>
            {editingService && services.find(s => s.id === editingService.id) ? "Update Service" : "Add Service"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
