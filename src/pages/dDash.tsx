import StockAlert from "@/components/dashboard/StockAlert";
import { Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function DistributorDashboard() {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <Typography variant="h5" fontWeight={700} mb={4}>
        Distributor Dashboard
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6" fontWeight={600}>My Inventory</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Part</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Reorder Level</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow><TableCell>Brake Pad</TableCell><TableCell>8</TableCell><TableCell>15</TableCell></TableRow>
          </TableBody>
        </Table>
      </Paper>

      <StockAlert />

      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" fontWeight={600}>Orders to Fulfill</Typography>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell>Order #567</TableCell>
              <TableCell>2x Brake Pads</TableCell>
              <TableCell>Status: Pending</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
