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
import SlidingAlert from "./SlideInAlert";
import { useAlert } from "@/app/(logged-in)/dashboard/AlertContext";

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
  const { showAlert, alertMsg, error, setShowAlert, setAlertMsg, setError } =
    useAlert();

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setError(false);
      const formData = new FormData(event.currentTarget);
      const formObject = Object.fromEntries(formData.entries());

      if (applicationType === "archive") {
        const response = await fetch("/api/applications", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(application?.id),
        });

        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const msg = await response.json();
        setAlertMsg(msg.data);
      }
      if (applicationType === "edit") {
        const response = await fetch("/api/applications/edit", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: application?.id,
            ...formObject,
          }),
        });

        if (!response.ok) {
          throw new Error("Something went wrong");
        }
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

        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        setAlertMsg("Application Created");
      }

      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
        setAlertMsg("");
      }, 3100);
      onAction();
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
