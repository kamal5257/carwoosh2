"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Tabs,
  Tab,
  Card,
  CardContent,
  Stack,
  Rating,
  Divider,
} from "@mui/material";
import { MessageCircle, X } from "lucide-react";
import { Tooltip } from "@mui/material";
import { NotificationsActive } from "@mui/icons-material";

import DashboardCards from "@/components/Dashboard/DashboardCards";
import SalesBarChart from "@/components/Dashboard/SalesBarChart";
import ServiceList from "@/components/Dashboard/ServiceList";
import PartsInventory from "@/components/Dashboard/PartsInventory";
import ComplaintsManagement from "@/components/Dashboard/ComplaintsManagements";
import StockAlert from "@/components/Dashboard/StockAlert";

const feedbackData = {
  customer: [
    {
      id: 1,
      name: "John Doe",
      contact: "john@example.com",
      againstName: "Service Center #12",
      againstContact: "support@servicecenter12.com",
      rating: 4,
      feedback: "Great service! Quick turnaround.",
    },
    {
      id: 2,
      name: "Alice Smith",
      contact: "alice@abc.com",
      againstName: "Service Center #07",
      againstContact: "manager@servicecenter07.com",
      rating: 5,
      feedback: "Very professional team. Highly recommend!",
    },
  ],
  mechanic: [
    {
      id: 3,
      name: "Mike Johnson",
      contact: "mike@abc.com",
      againstName: "Rahul Mech",
      againstContact: "rahul.mech@autogarage.com",
      serviceId: "SRV-1021",
      serviceTitle: "Brake Replacement",
      rating: 2,
      feedback: "Brake issue not fully resolved, had to revisit.",
    },
    {
      id: 4,
      name: "Sarah Lee",
      contact: "sarah@xyz.com",
      againstName: "Alex Mech",
      againstContact: "alex.mech@autogarage.com",
      serviceId: "SRV-1045",
      serviceTitle: "Oil Change",
      rating: 5,
      feedback: "Oil changed quickly and professionally. Highly satisfied.",
    },
    {
      id: 5,
      name: "David Kim",
      contact: "david@auto.com",
      againstName: "Tom Mech",
      againstContact: "tom.mech@garagehub.com",
      serviceId: "SRV-1080",
      serviceTitle: "Tire Rotation",
      rating: 3,
      feedback: "Service was okay, but had to wait longer than expected.",
    },
  ],
  dealer: [
    {
      id: 6,
      name: "David Lee",
      contact: "dealer@autoparts.com",
      againstName: "ABC AutoParts Distributor",
      againstContact: "sales@abcautoparts.com",
      productId: "PRD-501",
      productTitle: "Car Battery - Bosch",
      rating: 3,
      feedback: "Battery arrived late, but works fine.",
    },
    {
      id: 7,
      name: "Emily Clark",
      contact: "emily@parts.com",
      againstName: "XYZ Auto Supplies",
      againstContact: "support@xyzautosupplies.com",
      productId: "PRD-502",
      productTitle: "Spark Plugs - NGK",
      rating: 4,
      feedback: "Good quality spark plugs. Packaging could be better.",
    },
    {
      id: 8,
      name: "Robert Brown",
      contact: "robert@dealers.com",
      againstName: "Speedy Auto Dealers",
      againstContact: "contact@speedyauto.com",
      productId: "PRD-503",
      productTitle: "Brake Pads - Brembo",
      rating: 2,
      feedback: "Brake pads were defective, had to return them.",
    },
  ],
};


export default function DashboardPage() {
  const [view, setView] = useState<"analysis" | "services" | "inventory">("analysis");
  const [openFeedback, setOpenFeedback] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"customer" | "mechanic" | "dealer">("customer");
  const [openStockAlert, setOpenStockAlert] = useState(false);

  return (
    <Box bgcolor="#f5f5f5" minHeight="100vh" py={4} position="relative">
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, md: 4 } }}>
        <Typography variant="h4" fontWeight={700} mb={3}>
          Dashboard Overview
        </Typography>

        {/* Toggle Views */}
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, val) => val && setView(val)}
          sx={{
            mb: 4,
            border: "none",
            "& .MuiToggleButton-root": {
              border: "none",
              borderBottom: "2px solid transparent",
              borderRadius: 0,
              fontWeight: 600,
              px: 3,
              textTransform: "none",
            },
            "& .Mui-selected": {
              borderBottom: "2px solid #1976d2",
              color: "#1976d2",
              backgroundColor: "transparent",
            },
          }}
        >
          <ToggleButton value="analysis">Analysis View</ToggleButton>
          <ToggleButton value="services">Service Management</ToggleButton>
          <ToggleButton value="inventory">Inventory Management</ToggleButton>
        </ToggleButtonGroup>

        {/* Conditional Views */}
        {view === "analysis" && (
          <>
            <DashboardCards />
            <SalesBarChart />
          </>
        )}

        {view === "services" && (
          <>
            <ServiceList />
          </>
        )}

        {view === "inventory" && (
          <>
            <PartsInventory />
            <StockAlert />
          </>
        )}
      </Box>

      {/* Floating Chatbot Button */}
      <Box
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          display: "flex",
          gap: 2,             // space between buttons
          flexDirection: { xs: "column", sm: "row" }, // stacked on mobile
        }}
      >
        {/* Feedback Button */}
        <Fab
          color="primary"
          aria-label="chat"
          sx={{ boxShadow: 4 }}
          onClick={() => setOpenFeedback(true)}
        >
          <MessageCircle size={22} />
        </Fab>

        {/* Stock Alert Button (only on inventory view) */}
        {view === "inventory" && (
          <Tooltip title="Stock Alerts">
            <Fab
              color="secondary"
              aria-label="stock-alert"
              sx={{ boxShadow: 4 }}
              onClick={() => setOpenStockAlert(true)}
            >
              <NotificationsActive />
            </Fab>
          </Tooltip>
        )}
      </Box>


      {/* Feedback Popup */}
      <Dialog
        open={openFeedback}
        onClose={() => setOpenFeedback(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 3, overflow: "hidden" } }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Customer Feedback & Complaints
          </Typography>
          <IconButton onClick={() => setOpenFeedback(false)}>
            <X />
          </IconButton>
        </DialogTitle>

        {/* Tabs for Customer / Mechanic / Dealer */}
        <Tabs
          value={selectedTab}
          onChange={(_, v) => setSelectedTab(v)}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab value="customer" label="Customer" />
          <Tab value="mechanic" label="Mechanic" />
          <Tab value="dealer" label="Dealer" />
        </Tabs>

        <DialogContent dividers sx={{ maxHeight: 400, overflowY: "auto", bgcolor: "#fafafa" }}>
          <Stack spacing={2}>
            {feedbackData[selectedTab].map((item) => (
              <Card key={item.id} variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  {/* Row with Complaint By & Against */}
                  <Stack direction="row" spacing={2} justifyContent="space-between" mb={1}>
                    {/* Complaint By */}
                    <Box flex={1}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Complaint By:
                      </Typography>
                      <Typography fontWeight={600}>{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        📞 {item.contact}
                      </Typography>
                    </Box>

                    {/* Complaint Against */}
                    <Box flex={1}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Complaint Against:
                      </Typography>
                      <Typography fontWeight={600}>{item.againstName}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        📧 {item.againstContact}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Service or Product Info */}
                  {selectedTab === "mechanic" && (
                    <Typography variant="body2" mt={1}>
                      🔧 <b>{item.serviceTitle}</b> (ID: {item.serviceId})
                    </Typography>
                  )}
                  {selectedTab === "dealer" && (
                    <Typography variant="body2" mt={1}>
                      📦 <b>{item.productTitle}</b> (ID: {item.productId})
                    </Typography>
                  )}

                  {/* Rating & Feedback */}
                  <Rating value={item.rating} precision={0.5} readOnly size="small" />
                  <Typography variant="body2" color="text.primary">
                    {item.feedback}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
      <Dialog
      open={openStockAlert}
      onClose={() => setOpenStockAlert(false)}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: 3, overflow: "hidden" } }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Stock Alerts
        </Typography>
        <IconButton onClick={() => setOpenStockAlert(false)}>
          <X />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <StockAlert />
      </DialogContent>
    </Dialog>
    </Box>
  );
}
