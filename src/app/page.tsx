import { Container, Link, Paper, Typography } from "@mui/material";
import SignInForm from "../../components/forms/SignInForm";

export default function Home() {
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
      <Typography variant="h3">Sign in at ACCA</Typography>
      <Paper sx={{ width: "100%", padding: 2 }}>
        <SignInForm />
      </Paper>
      <Paper sx={{ width: "100%", padding: 2 }}>
        <Typography variant="body1">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            color="inherit"
            underline="hover"
          >
            👉SIGN UP NOW HERE👈
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
