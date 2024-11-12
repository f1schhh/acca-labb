"use client";
import { Box, Typography } from "@mui/material";
import SummaryCard from "../../../components/dashboard/SummaryCard";
import ApplicationTable from "../../../components/dashboard/ApplicationTable";
import { useApplications } from "./ApplicationsContext";
import LoadingTable from "@/components/dashboard/LoadingTable";
import ExportDataButton from "@/components/dashboard/ExportDataButton";

export default function Dashboard() {
  const { applications, loading } = useApplications();

  const numOfApplications = applications ? applications.length : 0;

  const latestApplication = applications
    ? applications[numOfApplications - 1]
    : null;
  const company_name = latestApplication?.company_name;
  const job_title = latestApplication?.job_title;

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
      <ExportDataButton email={"hej@live.se"} />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          marginTop: 2,
        }}
      >
        <SummaryCard
          title="Total applications"
          stat={numOfApplications}
        />
        <SummaryCard
          title="Latest applications"
          jobbTitle={job_title?.toString()}
          companyTitle={company_name}
        />
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
