"use client";
import { Box, Typography } from "@mui/material";
import ApplicationCard from "../../../components/dashboard/ApplicationCard";
import ApplicationTable from "../../../components/dashboard/ApplicationTable";

export default function Dashboard() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
      }}
    >
      <Typography variant="h5">Summary</Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          marginTop: 2,
        }}
      >
        <ApplicationCard />
        <ApplicationCard />
      </Box>
      <Typography variant="h5">Latest applications</Typography>
      <Box sx={{}}>
        <ApplicationTable />
      </Box>
    </Box>
  );
}
