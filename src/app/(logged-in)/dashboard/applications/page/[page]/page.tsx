"use client";
import { useEffect } from "react";
import { Box, Typography, Pagination } from "@mui/material";
import ApplicationTable from "../../../../../../components/dashboard/ApplicationTable";
import LoadingTable from "@/components/dashboard/LoadingTable";
import { useApplications } from "../../../ApplicationsContext";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function ApplicationsPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { applications, loading, setCurrentPage, totalCount } =
    useApplications();
  const router = useRouter();

  // React use needs to be used here (nextjs 15 bug) - https://github.com/vercel/next.js/issues/71690
  const { page } = use(params);

  useEffect(() => {
    setCurrentPage(parseInt(page));
  }, [page, setCurrentPage]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    router.push(`/dashboard/applications/page/${value}`);
  };

  const itemsPerPage = 10;
  const pageCount = Math.ceil(totalCount / itemsPerPage);

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
      <Typography variant="h5">All Applications</Typography>

      {loading ? (
        <LoadingTable items={10} />
      ) : (
        <ApplicationTable applications={applications} />
      )}

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Pagination
          count={pageCount}
          page={parseInt(page)}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
