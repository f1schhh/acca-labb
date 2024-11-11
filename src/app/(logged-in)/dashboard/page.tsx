"use client";
import { Box, Typography } from "@mui/material";
import ApplicationCard from "../../../components/dashboard/ApplicationCard";
import ApplicationTable from "../../../components/dashboard/ApplicationTable";
import { useApplications } from "./ApplicationsContext";
import LoadingTable from "@/components/dashboard/LoadingTable";

export default function Dashboard() {
  const { applications, loading } = useApplications();

  const numOfApplications = applications ? applications.length : 0;

  const numOfOngoingApplications = applications ? applications.length : 0;
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
      {loading && (
        <>
          <Typography variant="h5">Latest applications</Typography>
          <LoadingTable items={5} />
        </>
      )}
      {applications && applications.length > 0 && (
        <>
          <Typography variant="h5">Latest applications</Typography>
          <Box>
            <ApplicationTable applications={applications} />
          </Box>
        </>
      )}
    </Box>
  );
}
