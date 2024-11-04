import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";

// Define the structure for a job application row
interface JobApplication {
  job_title: string;
  job_location: string;
  company_name: string;
  contact_person: string;
  application_url: string;
  job_type_id: number;
  job_status_id: number;
}

// Create data function with typed parameters
function createData(
  job_title: string,
  job_location: string,
  company_name: string,
  contact_person: string,
  application_url: string,
  job_type_id: number,
  job_status_id: number
): JobApplication {
  return {
    job_title,
    job_location,
    company_name,
    contact_person,
    application_url,
    job_type_id,
    job_status_id,
  };
}

// Sample data with JobApplication type
const rows: JobApplication[] = [
  createData(
    "Software Engineer",
    "San Francisco, CA",
    "TechCorp",
    "Alice Johnson",
    "https://techcorp.com/jobs/1",
    1,
    2
  ),
  createData(
    "Data Analyst",
    "New York, NY",
    "DataWorks",
    "Bob Smith",
    "https://dataworks.com/jobs/23",
    2,
    3
  ),
  createData(
    "Product Manager",
    "Remote",
    "InnovatePlus",
    "Carol White",
    "https://innovateplus.com/jobs/45",
    1,
    1
  ),
  createData(
    "UX Designer",
    "Los Angeles, CA",
    "DesignHub",
    "David Lee",
    "https://designhub.com/jobs/67",
    3,
    2
  ),
  createData(
    "Frontend Developer",
    "Austin, TX",
    "Webify",
    "Emma Brown",
    "https://webify.com/jobs/89",
    1,
    4
  ),
];

export default function ApplicationTable() {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="job applications table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Job Title</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Application URL</TableCell>
            <TableCell>Job Type ID</TableCell>
            <TableCell>Job Status ID</TableCell>
            <TableCell align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.job_title}
              sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
            >
              <TableCell
                component="th"
                scope="row"
              >
                {row.job_title}
              </TableCell>
              <TableCell>{row.job_location}</TableCell>
              <TableCell>{row.company_name}</TableCell>
              <TableCell>{row.contact_person}</TableCell>
              <TableCell>
                <Link
                  href={row.application_url}
                  color="inherit"
                >
                  {row.application_url}
                </Link>
              </TableCell>
              <TableCell>{row.job_type_id}</TableCell>
              <TableCell>{row.job_status_id}</TableCell>
              <TableCell align="right">
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
