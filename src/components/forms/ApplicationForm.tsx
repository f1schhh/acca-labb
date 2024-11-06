import { Box, TextField } from "@mui/material";
import { JobApplicationTypes } from "../../../types";
import React from "react";

interface ApplicationFormProps {
  applicationData?: JobApplicationTypes | null;
  onSave?: boolean;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  applicationData,
}) => {
  return (
    <Box sx={{ height: "100%" }}>
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
      <TextField
        required
        margin="dense"
        id="jobType"
        name="jobType"
        label="Job type"
        type="text"
        fullWidth
        variant="standard"
        defaultValue={applicationData?.job_type || ""}
      />
      <TextField
        required
        margin="dense"
        id="jobStatus"
        name="jobStatus"
        label="Job status"
        type="text"
        fullWidth
        variant="standard"
        defaultValue={applicationData?.job_status || ""}
      />
    </Box>
  );
};

export default ApplicationForm;
