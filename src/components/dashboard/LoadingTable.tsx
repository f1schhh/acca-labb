import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Skeleton,
} from "@mui/material";
import { useApplications } from "@/app/(logged-in)/dashboard/ApplicationsContext";

interface LoadingTableProps {
  items: number;
}

const LoadingTable: React.FC<LoadingTableProps> = ({ items }) => {
  const { currentPath } = useApplications();
  const [isArchivedPage, setIsArchivedPage] = useState<boolean>(false);

  useEffect(() => {
    if (currentPath?.startsWith("/dashboard/archived")) {
      setIsArchivedPage(true);
    } else {
      setIsArchivedPage(false);
    }
  }, [currentPath]);
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="loading skeleton table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Job Title</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Application URL</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Edit</TableCell>
            {!isArchivedPage && <TableCell align="right">Archive</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: items }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton variant="text" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" />
              </TableCell>
              <TableCell align="right">
                <Skeleton
                  variant="circular"
                  width={24}
                  height={24}
                />
              </TableCell>
              {!currentPath?.startsWith("/dashboard/archived") && (
                <TableCell align="right">
                  <Skeleton
                    variant="circular"
                    width={24}
                    height={24}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LoadingTable;
