import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { JobApplicationTypes } from "../../../types";
import React from "react";
import SelectInput from "./SelectInput";

interface ApplicationFormProps {
  applicationData?: JobApplicationTypes | null;
  onSave?: boolean;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  applicationData,
}) => {
  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <TextField
        required
        margin="dense"
        id="jobTitle"
        name="jobTitle"
        label="Job title"
        type="text"
        fullWidth
        variant="standard"
        defaultValue={applicationData?.job_title || ""}
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
        variant="standard"
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
        variant="standard"
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
        variant="standard"
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
            <MenuItem value={1}>Pending</MenuItem>
            <MenuItem value={2}>Accepted</MenuItem>
            <MenuItem value={3}>Rejected</MenuItem>
          </SelectInput>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Job type</InputLabel>
          <SelectInput
            label="Job type"
            name="jobType"
            required
            defaultValue={applicationData?.job_status_id || 1}
          >
            <MenuItem value={1}>Job</MenuItem>
            <MenuItem value={2}>Internship</MenuItem>
            <MenuItem value={3}>Contract</MenuItem>
            <MenuItem value={4}>Freelance</MenuItem>
            <MenuItem value={5}>Other</MenuItem>
          </SelectInput>
        </FormControl>
      </Box>
    </Box>
  );
};

export default ApplicationForm;
