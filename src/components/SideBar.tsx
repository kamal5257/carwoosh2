"use client";

import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Car,
  History,
  MapPin,
  Settings,
  MessageCircle,
  Bot,
  Menu,
} from "lucide-react"; // ✅ lucide-react icons

const menuItems = [
  { label: "My Vehicle", icon: <Car size={20} />, href: "/my-vehicle" },
  { label: "Order History", icon: <History size={20} />, href: "/order-history" },
  { label: "Track Status", icon: <MapPin size={20} />, href: "/trackStatus" },
  { label: "Settings", icon: <Settings size={20} />, href: "/settings" },
  { label: "Complaints", icon: <MessageCircle size={20} />, href: "/complaints" },
  { label: "Chatbot", icon: <Bot size={20} />, href: "/chatbot" },
];

export const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen(!open);

  return (
    <>
      {/* Menu button for mobile */}
      <IconButton
        onClick={toggleDrawer}
        sx={{
          display: { xs: "inline-flex", md: "none" },
          position: "absolute",
          top: 16,
          left: 16,
        }}
      >
        <Menu />
      </IconButton>

      {/* Drawer Sidebar */}
      <Drawer
        variant="permanent"
        open
        sx={{
          width: 240,
          flexShrink: 0,
          display: { xs: "none", md: "block" }, // Hide on mobile
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            bgcolor: "#fff",
            borderRight: "1px solid #e5e5e5",
            p: 2,
          },
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2} color="primary">
          Menu
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.label}
              component="a"
              href={item.href}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "white",
                  "& .MuiListItemIcon-root": { color: "white" },
                },
                "&:hover": {
                  bgcolor: "primary.light",
                  color: "white",
                  "& .MuiListItemIcon-root": { color: "white" },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: "primary.main" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Drawer for mobile (temporary) */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 240,
            p: 2,
          },
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2} color="primary">
          Menu
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.label}
              component="a"
              href={item.href}
              onClick={toggleDrawer}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                "&:hover": {
                  bgcolor: "primary.light",
                  color: "white",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};
