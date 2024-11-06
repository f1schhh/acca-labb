"use client";
import { Box, Container, Divider } from "@mui/material";
import NavBar from "../../../components/dashboard/NavBar";
import SideBar from "../../../components/dashboard/SideBar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Container
      disableGutters
      sx={{
        width: "100%",
      }}
      maxWidth="xl"
    >
      <NavBar />
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
          <SideBar currentpath={pathname} />
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
  );
}
