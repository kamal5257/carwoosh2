"use client";

import { useState } from "react";
import {
  Paper,
  Typography,
  Stack,
  Box,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { ArrowDown, ArrowUp } from "lucide-react";

// ✅ Sample data for monthly & yearly
const monthlyData = [
  { month: "Jan", sales: 2400 },
  { month: "Feb", sales: 3200 },
  { month: "Mar", sales: 2800 },
  { month: "Apr", sales: 4000 },
  { month: "May", sales: 4500 },
  { month: "Jun", sales: 3800 },
];

const yearlyData = [
  { month: "2021", sales: 21000 },
  { month: "2022", sales: 28000 },
  { month: "2023", sales: 32000 },
  { month: "2024", sales: 36000 },
];

const categorySales = [
  { name: "Oil Change", value: 4200 },
  { name: "Brake Replacement", value: 3100 },
  { name: "Tire Replacement", value: 2700 },
  { name: "Engine Checkup", value: 1900 },
  { name: "Battery Replacement", value: 1200 },
];

// 🎨 Pie Colors
const COLORS = ["#1976d2", "#4caf50", "#ff9800", "#9c27b0", "#f44336"];

// Custom label renderer for pie chart
const renderCustomizedLabel = (props: unknown) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, outerRadius, value, index } = props as {
    cx: number;
    cy: number;
    midAngle: number;
    outerRadius: number;
    value: number;
    index: number;
  };
  const radius = outerRadius + 15;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={COLORS[index % COLORS.length]}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight="600"
    >
      ${value.toLocaleString()}
    </text>
  );
};

export default function SalesBarChart() {
  const [viewType, setViewType] = useState<"Monthly" | "Yearly">("Monthly");
  const [selected, setSelected] = useState(viewType === "Monthly" ? "Jan" : "2024");

  const dataSource = viewType === "Monthly" ? monthlyData : yearlyData;

  // Add MoM or YoY % change dynamically
  const dataWithChange = dataSource.map((d, i) => {
    if (i === 0) return { ...d, change: 0, positive: true };
    const prev = dataSource[i - 1].sales;
    const diff = d.sales - prev;
    const change = (diff / prev) * 100;
    return { ...d, change, positive: diff >= 0 };
  });

  const handleViewTypeChange = (event: unknown) => {
    const value = (event as unknown as { target: { value: "Monthly" | "Yearly" } }).target.value;
    setViewType(value);
    setSelected(value === "Monthly" ? "Jan" : "2024");
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h6" fontWeight={600}>
            📊 Revenue Performance
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Month-over-Month Growth + Category Sales Distribution
          </Typography>
        </Box>

        {/* ✅ Dropdown Controls */}
        <Stack direction="row" spacing={1}>
          <FormControl size="small">
            <Select value={viewType} onChange={handleViewTypeChange}>
              <MenuItem value="Monthly">Monthly</MenuItem>
              <MenuItem value="Yearly">Yearly</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small">
            <Select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              {viewType === "Monthly"
                ? monthlyData.map((m) => (
                    <MenuItem key={m.month} value={m.month}>
                      {m.month}
                    </MenuItem>
                  ))
                : yearlyData.map((y) => (
                    <MenuItem key={y.month} value={y.month}>
                      {y.month}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      {/* Main Content Layout */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        alignItems="stretch"
      >
        {/* --- BAR CHART --- */}
        <ResponsiveContainer width="40%" height={300}>
          <BarChart data={dataWithChange}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                const item = payload[0].payload;
                return (
                  <Paper sx={{ p: 2, backgroundColor: "#fff" }} elevation={4}>
                    <Typography fontWeight={600}>{item.month}</Typography>
                    <Typography variant="body2">
                      Sales: <strong>${item.sales.toLocaleString()}</strong>
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      {item.positive ? (
                        <ArrowUp size={14} color="green" />
                      ) : (
                        <ArrowDown size={14} color="red" />
                      )}
                      <Typography
                        variant="body2"
                        color={item.positive ? "green" : "red"}
                        fontWeight={600}
                      >
                        {item.change.toFixed(1)}%
                      </Typography>
                    </Stack>
                  </Paper>
                );
              }}
            />
            <Bar dataKey="sales" radius={[6, 6, 0, 0]} animationDuration={900}>
              {dataWithChange.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.positive ? "#4caf50" : "#f44336"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* --- PIE CHART WITH LEGEND --- */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{
            width: { xs: "100%", md: "50%" },
            flexGrow: 1,
            flexWrap: "wrap",
          }}
        >
          <ResponsiveContainer width="70%" height={280}>
            <PieChart>
              <Pie
                data={categorySales}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                innerRadius={50}
                paddingAngle={3}
                labelLine={true}
                label={renderCustomizedLabel}
              >
                {categorySales.map((entry, index) => (
                  <Cell
                    key={`slice-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* ✅ Right-side Title / Legend */}
          <Stack spacing={1} sx={{ minWidth: 120 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              Category Sales
            </Typography>
            {categorySales.map((entry, index) => (
              <Stack
                key={entry.name}
                direction="row"
                alignItems="center"
                spacing={1}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />
                <Typography variant="body2">{entry.name}</Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
