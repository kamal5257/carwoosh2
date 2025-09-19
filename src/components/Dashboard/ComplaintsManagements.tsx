"use client";

import { Paper, Typography, Stack, Divider } from "@mui/material";
import { AlertTriangle, CheckCircle } from "lucide-react";

const complaints = [
  { id: 1, title: "Brake noise issue", status: "Open" },
  { id: 2, title: "Engine oil leakage", status: "Resolved" },
  { id: 3, title: "AC not cooling", status: "Open" },
];

export default function ComplaintsManagement() {
  return (
    <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={600}>
          Complaints Management
        </Typography>
        <Stack direction="row" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <AlertTriangle size={16} color="orange" />
            <Typography variant="body2">Open: 2</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CheckCircle size={16} color="green" />
            <Typography variant="body2">Resolved: 1</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Divider />
      <Stack spacing={1} mt={2}>
        {complaints.map((c) => (
          <Paper key={c.id} sx={{ p: 2, display: "flex", justifyContent: "space-between", bgcolor: c.status === "Open" ? "#e7e7e7ff" : "#ffffff" }}>
            <Typography>{c.title}</Typography>
            <Typography
              color={c.status === "Open" ? "orange" : "green"}
              
              fontWeight={600}
            >
              {c.status}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
}
