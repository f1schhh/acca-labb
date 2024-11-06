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
import { JobApplicationTypes } from "../../../types";
import { useState } from "react";
import SlidingAlert from "./SlideInAlert";

interface ApplicationDialogProps {
  open: boolean;
  onClose: () => void;
  onAction: () => void;
  application?: JobApplicationTypes | null;
  title: string;
  archive?: boolean;
}

const ApplicationDialog: React.FC<ApplicationDialogProps> = ({
  open,
  onClose,
  onAction,
  application,
  title,
  archive,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (archive) {
        console.log("ARCHIVE");
        onClose();
        onAction();
        return;
      }
      const formData = new FormData(event.currentTarget);
      console.log(formData);

      setShowAlert(true);
      setAlertMsg("Application Saved");

      setTimeout(() => {
        setShowAlert(false);
        setAlertMsg("");
      }, 3100);
      onAction();
      onClose();
    } catch (error) {
      setError(true);
      setShowAlert(true);
      setAlertMsg(`Something went wrong: ${error}`);

      setTimeout(() => {
        setShowAlert(false);
        setAlertMsg("");
        setError(false);
      }, 7000);
    } finally {
      setAlertMsg("Application Saved");
      setError(false);
      setShowAlert(true);
    }
  };

  return (
    <>
      {showAlert && (
        <SlidingAlert
          msg={alertMsg}
          error={error}
        />
      )}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
      >
        <form onSubmit={handleOnSubmit}>
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
              type="submit"
              color="primary"
            >
              {archive ? "Archive" : "Save"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ApplicationDialog;
