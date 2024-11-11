"use client";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import ApplicationTable from "@/components/dashboard/ApplicationTable";

export default function Archived() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getUserApplications = async () => {
    try {
      const response = await fetch("/api/applications/status");
      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }
      const data = await response.json();
      setApplications(data.data);
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
    <Box sx={{}}>
      <Typography variant="h3">Archived</Typography>
      <ApplicationTable
        onAction={getUserApplications}
        loading={loading}
        applications={applications}
      />
    </Box>
  );
}
