import { Container } from "@mui/material";
import NavBar from "../../../components/dashboard/NavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container
      disableGutters
      sx={{
        width: "100%",
      }}
      maxWidth="xl"
    >
      <NavBar />
      {children}
    </Container>
  );
}
