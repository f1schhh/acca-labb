import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SlidingAlert = ({ msg, error }: { msg: string; error: boolean }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (msg) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  return (
    <Alert
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setVisible(false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
      variant="filled"
      severity={error ? "error" : "success"}
      style={{
        position: "fixed",
        top: "10px",
        left: "10px",
        transform: visible ? "translateX(0)" : "translateX(-300%)",
        transition: "transform 0.5s ease, opacity 0.5s ease",
        opacity: visible ? 1 : 0,
        zIndex: 1000,
      }}
    >
      {msg}
    </Alert>
  );
};

export default SlidingAlert;
