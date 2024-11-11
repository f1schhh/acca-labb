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
  applicationType: "archive" | "edit" | "create";
}

const ApplicationDialog: React.FC<ApplicationDialogProps> = ({
  open,
  onClose,
  onAction,
  application,
  title,
  applicationType,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const formObject = Object.fromEntries(formData.entries());

      if (applicationType === "archive") {
        console.log("ARCHIVE");
        setAlertMsg("Application Archived");
      }
      if (applicationType === "edit") {
        console.log(formData);
        console.log("EDIT");
        setAlertMsg("Application Saved");
      }
      if (applicationType === "create") {
        const response = await fetch("/api/applications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formObject),
        });

        const data = await response.json();
        console.log(data);
        console.log("CREATE");
        setAlertMsg("Application Created");
      }

      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
        setAlertMsg("");
      }, 3100);
      console.log("onAction är på väg att köras"); // Kontroll innan onAction körs
      onAction(); // Detta borde nu köra `getUserApplications` i Dashboard
    } catch (error) {
      setError(true);
      setShowAlert(true);
      setAlertMsg(`Something went wrong: ${error}`);

      setTimeout(() => {
        setShowAlert(false);
        setAlertMsg("");
        setError(false);
      }, 7000);
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
            {applicationType === "archive" ? (
              <Typography variant="body1">
                Are you sure you want to archive this application?
              </Typography>
            ) : applicationType === "edit" ? (
              <ApplicationForm applicationData={application} />
            ) : (
              <ApplicationForm />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              type="submit"
              color="primary"
            >
              {applicationType}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ApplicationDialog;
