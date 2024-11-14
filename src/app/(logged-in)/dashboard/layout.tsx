import { Box, Container, Divider } from "@mui/material";
import NavBar from "../../../components/dashboard/NavBar";
import SideBar from "../../../components/dashboard/SideBar";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { ApplicationsProvider } from "./ApplicationsContext";
import { AlertProvider } from "./AlertContext";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  const name = session?.user?.name;

  return (
    <ApplicationsProvider>
      <AlertProvider>
        <Container
          disableGutters
          sx={{
            width: "100%",
          }}
          maxWidth="xl"
        >
          <NavBar username={name ?? ""} />
          <Container
            disableGutters
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "column",
                md: "row",
                lg: "row",
                xl: "row",
              },
              marginTop: 3,
              gap: 3,
            }}
            maxWidth="xl"
          >
            <Box sx={{ width: { xs: "100%", sm: "100%", md: "20%" } }}>
              <SideBar />
            </Box>
            <Divider
              orientation="vertical"
              variant="inset"
              flexItem
              sx={{
                marginLeft: 0,
                marginRight: 0,
                display: {
                  xs: "none",
                  sm: "none",
                  md: "block",
                  lg: "block",
                  xl: "block",
                },
              }}
            />
            {children}
          </Container>
        </Container>
      </AlertProvider>
    </ApplicationsProvider>
  );
}
