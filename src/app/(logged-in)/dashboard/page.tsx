"use client";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ApplicationCard from "../../../components/dashboard/ApplicationCard";
import ApplicationTable from "../../../components/dashboard/ApplicationTable";

export default function Dashboard() {
  const [applications, setApplications] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getUserApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/latestapplications/1");
      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }
      const data = await response.json();
      setApplications(data);
    } catch (err) {
      console.error(err);
      setError("Error fetching applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserApplications();
  }, []);

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
      <Box>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <ApplicationTable
            applications={applications || []}
            loading={loading}
          />
        )}
      </Box>
    </Box>
  );
}
