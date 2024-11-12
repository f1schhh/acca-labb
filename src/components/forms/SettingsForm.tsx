"use client";
import { Box, Button } from "@mui/material";
import { UserTypes } from "../../../types/userTypes";
import ProfileForm from "./ProfileForm";
import PasswordForm from "./PasswordForm";
import { useState } from "react";
import DeleteButton from "../settings/DeleteButton";

export default function SettingsForm({ userData }: { userData: UserTypes }) {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const togglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "2fr 1fr",
        },
        gap: 3,
        mb: 4,
      }}
    >
      <ProfileForm userData={userData} />
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <Button onClick={togglePasswordForm} sx={{ mb: 3 }} variant="contained">
          Change password
        </Button>
        {showPasswordForm && <PasswordForm userData={userData} />}
      </Box>
      <DeleteButton />
    </Box>
  );
}
