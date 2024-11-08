import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from '@mui/material'
import { JobApplicationTypes } from '../../../types'
import React, { useEffect, useState } from 'react'
import SelectInput from './SelectInput'

interface ApplicationFormProps {
  applicationData?: JobApplicationTypes | null
  onSave?: boolean
}

interface AllJobs {
  id: number
  job_type?: string
  job_status?: string
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  applicationData,
}) => {
  const [jobTypesArr, setJobTypesArr] = useState([])
  const [jobStatusArr, setJobStatussArr] = useState([])
  const fetchAllJobs = async () => {
    try {
      const [jobTypesResponse, jobStatusResponse] = await Promise.all([
        fetch('/api/jobs/types'),
        fetch('/api/jobs/status'),
      ])

      if (!jobTypesResponse.ok || !jobStatusResponse.ok) {
        throw new Error('Failed to fetch job data')
      }

      const jobTypes = await jobTypesResponse.json()
      const jobStatus = await jobStatusResponse.json()

      console.log(jobTypes.data, jobStatus.data)

      setJobTypesArr(jobTypes.data)
      setJobStatussArr(jobStatus.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchAllJobs()
  }, [])

  return (
    <Box
      sx={{
        height: '100%',
      }}>
      <TextField
        required
        margin="dense"
        id="jobTitle"
        name="jobTitle"
        label="Job title"
        type="text"
        fullWidth
        variant="standard"
        defaultValue={applicationData?.job_title || ''}
      />
      <TextField
        required
        margin="dense"
        id="location"
        name="location"
        label="Location"
        type="text"
        fullWidth
        variant="standard"
        defaultValue={applicationData?.job_location || ''}
      />
      <TextField
        required
        margin="dense"
        id="companyName"
        name="companyName"
        label="Company name"
        type="text"
        fullWidth
        variant="standard"
        defaultValue={applicationData?.company_name || ''}
      />
      <TextField
        required
        margin="dense"
        id="contactPerson"
        name="contactPerson"
        label="Contact person"
        type="text"
        fullWidth
        variant="standard"
        defaultValue={applicationData?.contact_person || ''}
      />
      <TextField
        required
        margin="dense"
        id="applicationUrl"
        name="applicationUrl"
        label="Application URL"
        type="text"
        fullWidth
        variant="standard"
        defaultValue={applicationData?.application_url || ''}
      />
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Job status</InputLabel>
          <SelectInput
            label="Job status"
            name="jobStatus"
            required
            defaultValue={applicationData?.job_status_id || 1}>
            {jobStatusArr.map((jobStatus: AllJobs) => (
              <MenuItem key={jobStatus.id} value={jobStatus.id}>
                {jobStatus.job_status}
              </MenuItem>
            ))}
          </SelectInput>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Job type</InputLabel>
          <SelectInput
            label="Job type"
            name="jobType"
            required
            defaultValue={applicationData?.job_status_id || 1}>
            {jobTypesArr.map((jobType: AllJobs) => (
              <MenuItem key={jobType.id} value={jobType.id}>
                {jobType.job_type}
              </MenuItem>
            ))}
          </SelectInput>
        </FormControl>
      </Box>
    </Box>
  )
}

export default ApplicationForm
