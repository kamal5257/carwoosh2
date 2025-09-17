"use client";

import React, { useState } from "react";
import { Box, Typography, ToggleButton, ToggleButtonGroup, Stack,  } from "@mui/material";
import { ServiceStatus } from "@/components/ServiceStatus";
import { PartStatus } from "@/components/PartStatus";

type ViewType = "services" | "parts";

export default function TrackStatus() {
  const [view, setView] = useState<ViewType>("services");

  return (
    <Box px={{ xs: 2, md: 12 }} py={6} bgcolor="#f5f5f5" minHeight="100vh">
      <Typography variant="h5" fontWeight="600" mb={3}>
        Track Your Orders & Bookings
      </Typography>

      <Stack direction="row" justifyContent="center" mb={4}>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, val) => val && setView(val)}
          aria-label="view toggle"
        >
          <ToggleButton value="services">Services</ToggleButton>
          <ToggleButton value="parts">Parts</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Box>
        {view === "services" ? <ServiceStatus /> : <PartStatus />}
      </Box>
    </Box>
  );
};
