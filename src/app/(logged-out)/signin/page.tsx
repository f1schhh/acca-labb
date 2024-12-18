import { Container, Link, Paper, Typography } from "@mui/material";
import SignInForm from "../../../components/forms/SignInForm";
import siteConfig from "../../../../config/siteConfig";

export default async function Home() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        height: "100vh",
        padding: { xs: 2, sm: 3 },
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{ textAlign: "center", fontSize: { xs: "2rem", sm: "3rem" } }}
      >
        Sign in at {siteConfig.siteName}
      </Typography>

      <Paper
        elevation={3}
        sx={{ width: "100%", padding: { xs: 2, sm: 4 }, borderRadius: 2 }}
      >
        <SignInForm />
      </Paper>
      <Paper
        sx={{
          width: "100%",
          padding: { xs: 2, sm: 3 },
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body1">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            color="inherit"
            underline="hover"
            sx={{ fontWeight: 500 }}
          >
            👉SIGN UP NOW HERE👈
          </Link>
        </Typography>
        <Typography variant="body1">
          Forgot your password?{" "}
          <Link
            href="/forgot-password"
            color="inherit"
            underline="hover"
            sx={{ fontWeight: 400 }}
          >
            RESET PASSWORD HERE
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
