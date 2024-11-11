import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { JobApplicationTypes } from "../../../types";
import React, { useEffect, useState } from "react";
import SelectInput from "./SelectInput";
import AutocompleteInput from "./AutocompleteInput";

interface ApplicationFormProps {
  applicationData?: JobApplicationTypes | null;
  onSave?: boolean;
}

interface AllJobs {
  id: number;
  job_type?: string;
  job_status?: string;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  applicationData,
}) => {
  const [jobTypesArr, setJobTypesArr] = useState([]);
  const [jobStatusArr, setJobStatussArr] = useState([]);
  const [jobSavedArr, setJobSavedArr] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllJobs = async () => {
    try {
      setLoading(true);
      const [jobTypesResponse, jobStatusResponse, jobSavedResponse] =
        await Promise.all([
          fetch("/api/jobs/types"),
          fetch("/api/jobs/status"),
          fetch("/api/jobs/saved"),
        ]);

      if (!jobTypesResponse.ok || !jobStatusResponse.ok) {
        throw new Error("Failed to fetch job data");
      }

      const jobTypes = await jobTypesResponse.json();
      const jobStatus = await jobStatusResponse.json();
      const jobSaved = await jobSavedResponse.json();

      setJobTypesArr(jobTypes.data);
      setJobStatussArr(jobStatus.data);
      setJobSavedArr(jobSaved.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      {!loading && (
        <>
          <AutocompleteInput
            options={jobSavedArr || []}
            loading={loading}
            defaultValue={
              applicationData?.job_title
                ? { job_title: applicationData.job_title.toString() }
                : { job_title: "" }
            }
            renderInput={(params) => (
              <TextField
                {...params}
                required
                margin="dense"
                name="jobTitle"
                label="Job title"
              />
            )}
          />
          <TextField
            required
            margin="dense"
            id="location"
            name="location"
            label="Location"
            type="text"
            fullWidth
            defaultValue={applicationData?.job_location || ""}
          />
          <TextField
            required
            margin="dense"
            id="companyName"
            name="companyName"
            label="Company name"
            type="text"
            fullWidth
            defaultValue={applicationData?.company_name || ""}
          />
          <TextField
            required
            margin="dense"
            id="contactPerson"
            name="contactPerson"
            label="Contact person"
            type="text"
            fullWidth
            defaultValue={applicationData?.contact_person || ""}
          />
          <TextField
            required
            margin="dense"
            id="applicationUrl"
            name="applicationUrl"
            label="Application URL"
            type="text"
            fullWidth
            defaultValue={applicationData?.application_url || ""}
          />
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Job status</InputLabel>
              <SelectInput
                label="Job status"
                name="jobStatus"
                required
                defaultValue={applicationData?.job_status_id || 1}
              >
                {jobStatusArr.map((jobStatus: AllJobs) => (
                  <MenuItem
                    key={jobStatus.id}
                    value={jobStatus.id}
                  >
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
                defaultValue={applicationData?.job_type_id || 1}
              >
                {jobTypesArr.map((jobType: AllJobs) => (
                  <MenuItem
                    key={jobType.id}
                    value={jobType.id}
                  >
                    {jobType.job_type}
                  </MenuItem>
                ))}
              </SelectInput>
            </FormControl>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ApplicationForm;
