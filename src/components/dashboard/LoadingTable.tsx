import React from "react";
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

interface LoadingTableProps {
  items: number;
}

const LoadingTable: React.FC<LoadingTableProps> = ({ items }) => {
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
            <TableCell align="right">Archive</TableCell>
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
              <TableCell align="right">
                <Skeleton
                  variant="circular"
                  width={24}
                  height={24}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LoadingTable;
