import { Box, Container, Divider, Typography } from "@mui/material";
import SideBar from "../../../components/dashboard/SideBar";

export default function Dashboard() {
  return (
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
      <Box sx={{ width: "80%", padding: 2 }}>
        <Typography variant="h5">Summary</Typography>
      </Box>
    </Container>
  );
}
