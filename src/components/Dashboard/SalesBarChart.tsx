"use client";

import { Paper, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 2400 },
  { month: "Feb", sales: 3200 },
  { month: "Mar", sales: 2800 },
  { month: "Apr", sales: 4000 },
  { month: "May", sales: 4500 },
  { month: "Jun", sales: 3800 },
];

export default function SalesBarChart() {
  return (
    <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
      <Typography variant="h6" fontWeight={600}>
        Sales by Month
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Monthly Revenue Performance
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#1976d2" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}
