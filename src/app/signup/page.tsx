"use client";
import { Alert, Container, Link, Paper, Typography } from "@mui/material";
import SignUpForm from "../../../components/forms/SignUpForm";
import { useState } from "react";
import siteConfig from "../../../config/siteConfig";

export default function SignUp() {
  const [responseMsg, setResponseMsg] = useState<string>("");
  const [error, setError] = useState(false);

  const setErrorState = (message?: string, error?: boolean) => {
    setResponseMsg(message || "");
    setError(error || false);
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        height: "100vh",
      }}
    >
      <Typography variant="h3">Sign up at {siteConfig.siteName}</Typography>
      {error && (
        <Alert
          variant="filled"
          severity="error"
          sx={{ width: "100%" }}
          onClose={() => {
            setErrorState("", false);
          }}
        >
          {responseMsg}
        </Alert>
      )}
      <Paper sx={{ width: "100%", padding: 2 }}>
        <SignUpForm onAction={setErrorState} />
      </Paper>
      <Paper sx={{ width: "100%", padding: 2 }}>
        <Typography variant="body1">
          Do you have an account?{" "}
          <Link
            href="/"
            color="inherit"
            underline="hover"
          >
            👉Sign in HERE👈
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
