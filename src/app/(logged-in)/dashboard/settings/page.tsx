import { Box, Typography } from "@mui/material";

import SettingsForm from "../../../../components/forms/SettingsForm";

// interface SettingsProps {
//   id?: number;
// }

export default function Settings() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          height: "100vh",
        }}
      >
        <Typography variant="h5">Settings</Typography>
        <SettingsForm />
      </Box>
    </>
  );
}
