"use client";

import {
  Typography,
  Paper,
  Chip,
  Stack,
  Grid,
  Box,
  Divider,
  Button,
} from "@mui/material";

const todayJobs = [
  { time: "09:00 AM", job: "Oil Change - Toyota Camry", status: "Scheduled" },
  { time: "11:30 AM", job: "Brake Pad Replacement - Honda Civic", status: "In Progress" },
  { time: "02:00 PM", job: "Tire Rotation - Ford Focus", status: "Pending" },
];

const jobHistory = [
  { date: "Sep 1, 2024", job: "Tire Rotation", status: "Completed" },
  { date: "Aug 28, 2024", job: "Engine Diagnostics", status: "Completed" },
  { date: "Aug 20, 2024", job: "Oil Change", status: "Completed" },
];

export default function MechanicDashboard() {
  return (
    <Box className="bg-gray-50 min-h-screen p-4">
      {/* Header */}
      <Typography variant="h5" fontWeight={700} mb={4}>
        Mechanic Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Today's Jobs Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Today's Jobs
            </Typography>

            <Stack spacing={2}>
              {todayJobs.map((job, idx) => (
                <Paper
                  key={idx}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: "#fafafa",
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {job.time}
                    </Typography>
                    <Typography variant="body2">{job.job}</Typography>
                  </Box>
                  <Chip
                    label={job.status}
                    color={
                      job.status === "Scheduled"
                        ? "primary"
                        : job.status === "In Progress"
                        ? "warning"
                        : "default"
                    }
                    size="small"
                  />
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Job History Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Job History
            </Typography>

            <Stack spacing={2}>
              {jobHistory.map((job, idx) => (
                <Paper
                  key={idx}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: "#fafafa",
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {job.date}
                    </Typography>
                    <Typography variant="body2">{job.job}</Typography>
                  </Box>
                  <Chip label={job.status} color="success" size="small" />
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box mt={4} display="flex" justifyContent="center" gap={2} flexWrap="wrap">
        <Button variant="contained" color="primary">
          Add New Job
        </Button>
        <Button variant="outlined" color="secondary">
          View All Jobs
        </Button>
      </Box>
    </Box>
  );
}
