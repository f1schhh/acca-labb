"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Skeleton } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import { JobApplicationTypes } from "../../../types";
import { useState } from "react";
import ApplicationDialog from "./ApplicationDialog";

interface ApplicationTableProps {
  applications: JobApplicationTypes[];
  loading?: boolean;
  onAction: () => void;
}

const ApplicationTable: React.FC<ApplicationTableProps> = ({
  applications,
  loading,
  onAction,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplicationTypes | null>(null);
  const [title, setTitle] = useState<string>("");
  const [applicationType, setApplicationType] = useState<
    "archive" | "edit" | "create"
  >("edit");

  const handleOpenDialog = (
    application: JobApplicationTypes,
    title: string,
    applicationType: "archive" | "edit" | "create"
  ) => {
    setSelectedApplication(application);
    setOpenDialog(true);
    setTitle(title);
    setApplicationType(applicationType);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedApplication(null);
  };
  const skeletonRows = Array.from({ length: 5 });
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="job applications table">
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
            {loading
              ? skeletonRows.map((_, index) => (
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
                      <Skeleton variant="circular" width={24} height={24} />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="circular" width={24} height={24} />
                    </TableCell>
                  </TableRow>
                ))
              : applications?.map((row) => (
                  <TableRow
                    key={row.job_title}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.job_title}
                    </TableCell>
                    <TableCell>{row.job_location}</TableCell>
                    <TableCell>{row.company_name}</TableCell>
                    <TableCell>{row.contact_person}</TableCell>
                    <TableCell>
                      {row.application_url && (
                        <Link href={row.application_url} color="inherit">
                          {row.application_url}
                        </Link>
                      )}
                    </TableCell>
                    <TableCell>{row.job_type}</TableCell>
                    <TableCell>{row.job_status}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          handleOpenDialog(row, "Edit Application", "edit");
                        }}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          handleOpenDialog(
                            row,
                            "Archive Application",
                            "archive"
                          );
                        }}>
                        <ArchiveIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!loading && (
        <ApplicationDialog
          applicationType={applicationType}
          open={openDialog}
          onClose={handleCloseDialog}
          onAction={onAction}
          title={title}
          application={selectedApplication}
        />
      )}
    </>
  );
};
export default ApplicationTable;
