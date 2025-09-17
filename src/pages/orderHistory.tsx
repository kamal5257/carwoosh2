"use client";

import React, { useState } from "react";
import {
    Box,
    Typography,
    Stack,
    Paper,
    ToggleButton,
    ToggleButtonGroup,
    Button,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
} from "@mui/material";

type ViewType = "services" | "products";

interface Props {
  onBack: () => void;
}

interface Order {
    id: string;
    name: string;
    date: string;
    status: "Completed" | "Cancelled" | "Failed";
    type: "service" | "product";
    price: number;
    description: string;
    onBack?: () => void; // ✅ Added this
}

const mockOrders: Order[] = [
    {
        id: "SVCHIST001",
        name: "Oil Change & Filter Replacement",
        date: "2024-07-10",
        status: "Completed",
        type: "service",
        price: 1200,
        description: "Engine oil & filter replaced with fully synthetic oil.",
    },
    {
        id: "SVCHIST002",
        name: "Tire Rotation & Balance",
        date: "2024-06-15",
        status: "Completed",
        type: "service",
        price: 900,
        description: "Tires rotated and balanced for smooth driving.",
    },
    {
        id: "SVCHIST003",
        name: "Brake System Inspection",
        date: "2024-05-20",
        status: "Failed",
        type: "service",
        price: 0,
        description: "Service failed due to parts unavailability.",
    },
    {
        id: "PRDHIST001",
        name: "Car Battery - Amaron",
        date: "2024-06-25",
        status: "Completed",
        type: "product",
        price: 4500,
        description: "Delivered and installed Amaron 12V battery.",
    },
    {
        id: "PRDHIST002",
        name: "Brake Pads - Bosch",
        date: "2024-05-28",
        status: "Cancelled",
        type: "product",
        price: 0,
        description: "Order cancelled by user.",
    },
];

export default function OrderHistoryPage({ onBack }: Props) {
    const [view, setView] = useState<ViewType>("services");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const filteredOrders = mockOrders.filter(
        (o) => (view === "services" ? o.type === "service" : o.type === "product")
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Completed":
                return "success";
            case "Cancelled":
                return "error";
            case "Failed":
                return "warning";
            default:
                return "default";
        }
    };

    return (
        <Box px={{ xs: 2, md: 12 }} py={10} bgcolor="#fafafa" minHeight="100vh">
            <Typography variant="h5" color="text.primary" fontWeight="700" mb={2}>
                Order History
            </Typography>

            {/* Toggle Button Group */}
            <Stack direction="row" justifyContent="flex-start" mb={4}>
                <ToggleButtonGroup
                    value={view}
                    exclusive
                    onChange={(_, val) => val && setView(val)}
                    sx={{
                        border: "none",
                        "& .MuiToggleButton-root": {
                            border: "none",
                            borderRadius: 0,
                            textTransform: "none",
                            fontWeight: 500,
                            px: 2,
                            "&.Mui-selected": {
                                borderBottom: "3px solid",
                                borderColor: "primary.main",
                                bgcolor: "transparent",
                                color: "primary.main",
                            },
                            "&:hover": {
                                bgcolor: "transparent",
                                color: "primary.main",
                            },
                        },
                    }}
                >
                    <ToggleButton value="services">Services</ToggleButton>
                    <ToggleButton value="products">Products</ToggleButton>
                </ToggleButtonGroup>
            </Stack>


            {/* Orders List */}
            <Stack spacing={2}>
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        <Paper
                            key={order.id}
                            sx={{
                                p: 2.5,
                                borderRadius: 3,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            {/* Left Section */}
                            <Box>
                                <Typography fontWeight="600">{order.id}</Typography>
                                <Typography color="text.secondary" variant="body2">
                                    {order.name}
                                </Typography>
                                <Typography color="text.secondary" variant="caption">
                                    📅 {order.date}
                                </Typography>
                            </Box>

                            {/* Right Section */}
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Chip
                                    label={order.status}
                                    color={getStatusColor(order.status)}
                                    variant="outlined"
                                />
                                {order.status === "Completed" && (
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => alert("Reordering...")}
                                    >
                                        Reorder
                                    </Button>
                                )}
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={() => setSelectedOrder(order)}
                                >
                                    Review
                                </Button>
                            </Stack>
                        </Paper>
                    ))
                ) : (
                    <Typography textAlign="center" color="text.secondary">
                        No orders found in this category.
                    </Typography>
                )}
            </Stack>

            {/* Review Dialog */}
            <Dialog
                open={!!selectedOrder}
                onClose={() => setSelectedOrder(null)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Order Details</DialogTitle>
                <DialogContent>
                    {selectedOrder && (
                        <>
                            <Typography variant="h6" fontWeight="700" mb={1}>
                                {selectedOrder.name}
                            </Typography>
                            <Typography variant="body2" mb={1}>
                                Order ID: {selectedOrder.id}
                            </Typography>
                            <Typography variant="body2" mb={1}>
                                Date: {selectedOrder.date}
                            </Typography>
                            <Typography variant="body2" mb={1}>
                                Status: {selectedOrder.status}
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body2" mb={2}>
                                {selectedOrder.description}
                            </Typography>
                            {selectedOrder.price > 0 && (
                                <Typography fontWeight="700">
                                    Total Paid: ₹{selectedOrder.price.toLocaleString()}
                                </Typography>
                            )}
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectedOrder(null)}>Close</Button>
                    <Button
                        variant="contained"
                        onClick={() => alert("Submitting Review")}
                    >
                        Submit Review
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
