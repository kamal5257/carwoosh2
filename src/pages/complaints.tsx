"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
  Stack,
  Divider,
} from "@mui/material";

interface Complaint {
  id: number;
  orderType: "Service" | "Product";
  orderId: string;
  category: string;
  description: string;
  contact: string;
  status: "Pending" | "Resolved";
}

// ✅ Mock Complaints Data
const mockComplaints: Complaint[] = [
  {
    id: 1,
    orderType: "Service",
    orderId: "SRV12345",
    category: "Delay in Service",
    description: "Technician arrived 30 mins late.",
    contact: "user@example.com",
    status: "Resolved",
  },
  {
    id: 2,
    orderType: "Product",
    orderId: "PRD98765",
    category: "Damaged Product",
    description: "Received battery with scratches.",
    contact: "+91-9876543210",
    status: "Pending",
  },
  {
    id: 3,
    orderType: "Service",
    orderId: "SRV11111",
    category: "Wrong Service",
    description: "Oil change was missed.",
    contact: "user2@example.com",
    status: "Pending",
  },
];

export default function ComplaintsPage() {
  const [orderType, setOrderType] = useState<"Service" | "Product">("Service");
  const [orderId, setOrderId] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | "Pending" | "Resolved">("All");

  const handleSubmit = () => {
    console.log({ orderType, orderId, category, description, contact });
    alert("Complaint submitted successfully!");
  };

  // ✅ Filter Complaints based on selected status
  const filteredComplaints =
    filterStatus === "All"
      ? mockComplaints
      : mockComplaints.filter((c) => c.status === filterStatus);

  return (
    <Box px={{ xs: 2, md: 6 }} py={4} bgcolor="#f5f5f5" minHeight="100vh">
      {/* Page Header */}
      <Typography variant="h5" fontWeight={700} mb={4} textAlign="center">
        Complaints & Support
      </Typography>

      {/* Submit Complaint Section */}
      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Submit Complaint
        </Typography>

        <Stack spacing={2}>
          {/* Order Type Dropdown */}
          <TextField
            select
            label="Order Type"
            value={orderType}
            onChange={(e) => setOrderType(e.target.value as "Service" | "Product")}
            fullWidth
          >
            <MenuItem value="Service">Service</MenuItem>
            <MenuItem value="Product">Product</MenuItem>
          </TextField>

          <TextField
            label="Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            fullWidth
          />

          <TextField
            label="Complaint Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
          />

          <TextField
            label="Details / Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />

          <TextField
            label="Contact Info (Email / Phone)"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
          >
            Submit Complaint
          </Button>
        </Stack>
      </Paper>

      {/* My Complaints Section */}
      <Paper sx={{ p: 3 }} elevation={3}>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            My Complaints
          </Typography>

          {/* ✅ Status Filter Dropdown */}
          <TextField
            select
            size="small"
            label="Filter by Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as "All" | "Pending" | "Resolved")}
            sx={{ width: { xs: "100%", sm: "200px" }, mt: { xs: 2, sm: 0 } }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
          </TextField>
        </Stack>

        {/* ✅ Complaints List */}
        <Stack spacing={2}>
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map((c) => (
              <Paper key={c.id} sx={{ p: 2, bgcolor: "#fff" }} elevation={1}>
                <Typography fontWeight={600}>
                  {c.orderType} - {c.orderId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {c.category}
                </Typography>
                <Typography variant="body2" mt={1}>
                  {c.description}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography
                  variant="body2"
                  color={c.status === "Resolved" ? "green" : "orange"}
                  fontWeight={600}
                >
                  Status: {c.status}
                </Typography>
              </Paper>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" textAlign="center">
              No complaints found for this filter.
            </Typography>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}
