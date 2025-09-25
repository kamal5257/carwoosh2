"use client";

import React, { useState, useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Divider,
  Stack,
  TextField,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Header } from "@/components/Header/Header";
import { Plus, Minus, X } from "lucide-react"; // ✅ Added X icon

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  discount?: number;
};

const initialCart: CartItem[] = [
  { id: 1, name: "Oil Change", price: 1200, image: "/images/oil-change.jpg", quantity: 1, discount: 10 },
  { id: 2, name: "Brake Pad", price: 1500, image: "/images/brake-pad.jpg", quantity: 2 },
];

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [shipping, setShipping] = useState(5);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = cart.reduce(
      (sum, item) =>
        sum + (item.discount ? (item.price * item.discount) / 100 * item.quantity : 0),
      0
    );
    const total = subtotal - discount + shipping;
    return { subtotal, discount, total };
  }, [cart, shipping]);

  const updateQuantity = (id: number, change: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(item.quantity + change, 1) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <Header cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />

      <Box
        px={{ xs: 2, md: 4 }}
        py={{ xs: 2, md: 6 }}
        bgcolor="#f5f5f5"
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        paddingTop={{ xs: "60px", md: "80px" }}
        pb={isMobile ? "80px" : 0}
      >
        <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={4} width="100%" maxWidth="md">
          {/* LEFT: CART ITEMS */}
          <Box flex={isMobile ? "unset" : 2}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 3,
                bgcolor: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <Stack direction="row" justifyContent="space-between" mb={3}>
                <Typography variant="h6" fontWeight={600}>
                  Shopping Cart
                </Typography>
                <Typography fontWeight={500} color="text.secondary">
                  {cart.length} Items
                </Typography>
              </Stack>

              <Divider sx={{ mb: 2 }} />

              <Stack spacing={2}>
                {cart.map((item) => (
                  <Box
                    key={item.id}
                    position="relative"
                    display="flex"
                    flexDirection="row"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    sx={{ gap: 2, py: 1, borderBottom: "1px solid #f0f0f0" }}
                  >
                    {/* X ICON (REMOVE) - Positioned at top right */}
                    <IconButton
                      size="small"
                    
                      onClick={() => removeItem(item.id)}
                      sx={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        color: "red",
                        fontWeight: 600,
                      }}
                    >
                      <X size={16} />
                    </IconButton>

                    {/* LEFT: IMAGE + TEXT + QUANTITY */}
                    <Box display="flex" gap={2} flex={1}>
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.name}
                        sx={{ width: 70, height: 70, borderRadius: 2, objectFit: "cover" }}
                      />
                      <Box flex={1}>
                        {/* Title */}
                        <Typography fontWeight={600}>{item.name}</Typography>

                        {/* Quantity (under title always) */}
                        <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                          <IconButton size="small" onClick={() => updateQuantity(item.id, -1)}>
                            <Minus size={16} />
                          </IconButton>
                          <Typography fontWeight={500}>{item.quantity}</Typography>
                          <IconButton size="small" onClick={() => updateQuantity(item.id, 1)}>
                            <Plus size={16} />
                          </IconButton>
                        </Stack>
                      </Box>
                    </Box>

                    {/* RIGHT: PRICE & TOTAL */}
                    {/* RIGHT: PRICE & TOTAL */}
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-end"
                      pr={1}
                      mt={3} // ✅ added margin-top to push price below the cross icon
                    >
                      <Typography color="text.secondary" fontSize="0.9rem">
                        ₹{item.price.toLocaleString()}
                      </Typography>
                      <Typography fontWeight={600}>
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </Typography>
                    </Box>

                  </Box>
                ))}
              </Stack>

              <Button
                variant="text"
                sx={{ mt: 3, textTransform: "none", color: "primary.main", fontWeight: 500 }}
              >
                ← Continue Shopping
              </Button>
            </Paper>
          </Box>

          {/* RIGHT: ORDER SUMMARY */}
          <Box flex={isMobile ? "unset" : 1}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 3,
                bgcolor: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="h6" fontWeight={600} textAlign="center">
                Order Summary
              </Typography>

              <Stack direction="row" justifyContent="space-between">
                <Typography>Items ({cart.length})</Typography>
                <Typography fontWeight={500}>
                  ₹{totals.subtotal.toLocaleString()}
                </Typography>
              </Stack>

              <TextField
                select
                label="Shipping"
                value={shipping}
                onChange={(e) => setShipping(Number(e.target.value))}
                size="small"
                fullWidth
              >
                <MenuItem value={5}>Standard Delivery – ₹5</MenuItem>
                <MenuItem value={15}>Express Delivery – ₹15</MenuItem>
              </TextField>

              <TextField label="Promo Code" size="small" fullWidth placeholder="Enter your code" />
              <Button variant="outlined" fullWidth sx={{ textTransform: "none", borderRadius: 2 }}>
                Apply
              </Button>

              <Divider />

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle1" fontWeight={600}>
                  Total Cost
                </Typography>
                <Typography variant="subtitle1" fontWeight={600}>
                  ₹{totals.total.toLocaleString()}
                </Typography>
              </Stack>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  mt: 1,
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              >
                Checkout
              </Button>
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CartPage;
