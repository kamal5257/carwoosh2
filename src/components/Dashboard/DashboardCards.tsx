"use client";

import { Paper, Stack, Typography } from "@mui/material";
import { DollarSign, Users, BarChart2, AlertTriangle } from "lucide-react";

const metrics = [
  { title: "Total Sales", value: "$125,000", change: "+12%", icon: <DollarSign size={18} /> },
  { title: "New Customers", value: "340", change: "+8%", icon: <Users size={18} /> },
  { title: "Avg Deal Value", value: "$2,450", change: "-3%", icon: <BarChart2 size={18} /> },
  { title: "Open Complaints", value: "15", change: "+5%", icon: <AlertTriangle size={18} /> },
];

export default function DashboardCards() {
  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={3} mb={4}>
      {metrics.map((item, index) => (
        <Paper key={index} sx={{ p: 3, flex: 1 }} elevation={3}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2" color="text.secondary">
              {item.title}
            </Typography>
            {item.icon}
          </Stack>
          <Typography variant="h5" fontWeight={700}>
            {item.value}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: item.change.startsWith("+") ? "green" : "red" }}
          >
            {item.change} from last month
          </Typography>
        </Paper>
      ))}
    </Stack>
  );
}
