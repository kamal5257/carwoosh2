"use client";

import { Box, Typography } from "@mui/material";
import DashboardCards from "@/components/Dashboard/DashboardCards";
import SalesBarChart from "@/components/Dashboard/SalesBarChart";
import ServiceList from "@/components/Dashboard/ServiceList";
import PartsInventory from "@/components/Dashboard/PartsInventory";
import ComplaintsManagement from "@/components/Dashboard/ComplaintsManagements";
import StockAlert from "@/components/Dashboard/StockAlert";

export default function DashboardPage() {
  return (
    <Box bgcolor="#f5f5f5" minHeight="100vh" py={4}>
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, md: 4 } }}>
        <Typography variant="h4" fontWeight={700} mb={4}>
          Dashboard Overview
        </Typography>
        <DashboardCards />
        <SalesBarChart />
        <ServiceList />
        <PartsInventory />
        <StockAlert />
        <ComplaintsManagement />
      </Box>
    </Box>
  );
}

// const role = getUserRole(); // auth logic to get user role - utils/auth.ts

//   if (role === "admin") return <AdminDashboard />;
//   if (role === "distributor") return <DistributorDashboard />;
//   if (role === "mechanic") return <MechanicDashboard />;

//   return <div className="p-4">Unauthorized</div>;
