import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ApplicationForm from "../forms/ApplicationForm";
import { JobApplicationTypes } from "../../types";

interface ApplicationDialogProps {
  open: boolean;
  onClose: () => void;
  application: JobApplicationTypes | null;
  title: string;
  archive?: boolean;
}

const ApplicationDialog: React.FC<ApplicationDialogProps> = ({
  open,
  onClose,
  application,
  title,
  archive,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return application ? (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {archive ? (
          <Typography variant="body1">
            Are you sure you want to archive this application?
          </Typography>
        ) : (
          <ApplicationForm applicationData={application} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onClose}
          color="primary"
        >
          {archive ? "Archive" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;
};

export default ApplicationDialog;
