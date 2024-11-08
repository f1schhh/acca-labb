"use client";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ApplicationCard from "../../../components/dashboard/ApplicationCard";
import ApplicationTable from "../../../components/dashboard/ApplicationTable";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getUserApplications = async () => {
    try {
      const response = await fetch("/api/applications");
      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }
      const result = await response.json();
      if (result.data.length === 0) {
        return;
      } else {
        setApplications(result.data);
      }
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
      {applications && applications.length > 0 && (
        <>
          <Typography variant="h5">Latest applications</Typography>
          <Box>
            {error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              <ApplicationTable
                applications={applications}
                loading={loading}
                onAction={() => getUserApplications()}
              />
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
