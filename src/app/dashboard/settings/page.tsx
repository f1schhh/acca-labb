"use client";
import { Box } from "@mui/material";

import SettingsForm from "../../../../components/forms/SettingsForm";

export default function Settings() {
  return (
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
      <SettingsForm
        onAction={(message, error) => console.log(message, error)}
      />
    </Box>
  );
}
