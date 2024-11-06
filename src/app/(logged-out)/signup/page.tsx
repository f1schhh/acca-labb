"use client";
import { Alert, Container, Link, Paper, Typography } from "@mui/material";
import SignUpForm from "../../../components/forms/SignUpForm";
import { useState } from "react";
import siteConfig from "../../../../config/siteConfig";

export default function SignUp() {
  const [responseMsg, setResponseMsg] = useState<string>("");
  const [error, setError] = useState(false);

  const setErrorState = (message?: string, error?: boolean) => {
    setResponseMsg(message || "");
    setError(error || false);
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        minHeight: "100vh",
        py: { xs: 4, sm: 6 },
        px: { xs: 2, sm: 3 },
        overflow: "auto",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
          mb: 2,
        }}
      >
        Sign up at {siteConfig.siteName}
      </Typography>
      {error && (
        <Alert
          variant="filled"
          severity="error"
          sx={{ width: "100%", mb: 2 }}
          onClose={() => {
            setErrorState("", false);
          }}
        >
          {responseMsg}
        </Alert>
      )}
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2,
          mb: 2,
        }}
      >
        <SignUpForm />
      </Paper>
      <Paper
        sx={{
          width: "100%",
          p: { xs: 2, sm: 3 },
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body1">
          Do you have an account?{" "}
          <Link
            href="/"
            color="inherit"
            underline="hover"
            sx={{ fontWeight: 500 }}
          >
            👉Sign in HERE👈
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
