import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ApplicationTypes } from "../../../types/applicationTypes";

const rows: ApplicationTypes[] = [
  {
    jobTitle: "Developer",
    jobLocation: "Gothenburg",
    companyName: "IKEA",
    contactPerson: "Ingvar Kamprad",
    applicationUrl: "IKEA.se",
    jobType: "Job",
    jobStatus: "Pending",
  },
  {
    jobTitle: "Developer",
    jobLocation: "Gothenburg",
    companyName: "IKEA",
    contactPerson: "Ingvar Kamprad",
    applicationUrl: "IKEA.se",
    jobType: "Job",
    jobStatus: "Pending",
  },
  {
    jobTitle: "Developer",
    jobLocation: "Gothenburg",
    companyName: "IKEA",
    contactPerson: "Ingvar Kamprad",
    applicationUrl: "IKEA.se",
    jobType: "Job",
    jobStatus: "Pending",
  },
  {
    jobTitle: "Developer",
    jobLocation: "Gothenburg",
    companyName: "IKEA",
    contactPerson: "Ingvar Kamprad",
    applicationUrl: "IKEA.se",
    jobType: "Job",
    jobStatus: "Pending",
  },
  {
    jobTitle: "Developer",
    jobLocation: "Gothenburg",
    companyName: "IKEA",
    contactPerson: "Ingvar Kamprad",
    applicationUrl: "IKEA.se",
    jobType: "Job",
    jobStatus: "Pending",
  },
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.jobTitle}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.jobTitle}
              </TableCell>
              <TableCell align="right">{row.jobLocation}</TableCell>
              <TableCell align="right">{row.companyName}</TableCell>
              <TableCell align="right">{row.contactPerson}</TableCell>
              <TableCell align="right">{row.applicationUrl}</TableCell>
              <TableCell align="right">{row.jobType}</TableCell>
              <TableCell align="right">{row.jobStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// const headCells: readonly ApplicationTypes[] = [
//   {
//     jobTitle: 'Developer',
//     jobLocation: 'Gothenburg',
//     companyName: 'IKEA',
//     contactPerson: 'Ingvar Kamprad',
//     applicationUrl: 'IKEA.se',
//     jobType: 'Job',
//     jobStatus: 'Pending',
//   },
// ]
