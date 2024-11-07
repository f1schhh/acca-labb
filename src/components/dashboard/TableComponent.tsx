import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { ApplicationTypes } from '../../../types/applicationTypes'
import { JobApplicationTypes } from '../../../types'

interface TableComponentProps {
  applications: JobApplicationTypes[]
}

const TableComponent: React.FC<TableComponentProps> = ({ applications }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
          {applications.map((row) => (
            <TableRow
              key={row.job_title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.job_title}
              </TableCell>
              <TableCell align="right">{row.job_location}</TableCell>
              <TableCell align="right">{row.company_name}</TableCell>
              <TableCell align="right">{row.contact_person}</TableCell>
              <TableCell align="right">{row.application_url}</TableCell>
              <TableCell align="right">{row.job_type}</TableCell>
              <TableCell align="right">{row.job_status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableComponent

// export interface JobApplicationTypes {
//   id?: number;
//   job_title?: number;
//   job_location?: string;
//   company_name?: string;
//   contact_person?: string;
//   application_url?: string;
//   job_type_id?: number | null;
//   job_status_id?: number | null;
//   job_type?: string;
//   job_status?: string;
//   created_date?: Date;
//   last_updated_date?: Date | null;
//   user_id?: number;
// }

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
