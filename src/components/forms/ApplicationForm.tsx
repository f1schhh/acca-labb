import { Box, TextField } from "@mui/material";
import { JobApplicationTypes } from "../../../types";

interface ApplicationFormProps {
  applicationData?: JobApplicationTypes;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  applicationData,
}) => {
  return (
    <Box sx={{ height: "100%" }}>
      <form>
        <TextField
          required
          margin="dense"
          id="jobTitle"
          name="jobTitle"
          label="Job title"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={applicationData ? applicationData.job_title : ""}
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
          defaultValue={applicationData ? applicationData.job_location : ""}
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
          defaultValue={applicationData ? applicationData.company_name : ""}
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
          defaultValue={applicationData ? applicationData.contact_person : ""}
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
          defaultValue={applicationData ? applicationData.application_url : ""}
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
          defaultValue={applicationData ? applicationData.job_type : ""}
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
          defaultValue={applicationData ? applicationData.job_status : ""}
        />
      </form>
    </Box>
  );
};

export default ApplicationForm;
