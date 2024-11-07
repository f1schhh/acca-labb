"use client";
import { Box, Button, Typography } from "@mui/material";
import SettingsForm from "../../../../components/forms/SettingsForm";
import { UserTypes } from "../../../../../types/userTypes";
import { useEffect, useState } from "react";

// interface SettingsProps {
//   id: number;
// }

export default function Settings() {
  const [userData, setUserData] = useState<UserTypes>();

  async function getUsers() {
    const res = await fetch(`/api/users/`);
    const data: UserTypes = await res.json();
    setUserData(data);
    console.log(data);
  }

  //TODO: Fix the endpoint with id.

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      \Testar att använda datan \
      {userData && (
        <Typography variant="h3">{userData.data[0].first_name}</Typography>
      )}
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
        <form>
          <SettingsForm />
          <Button type="submit" variant="outlined">
            Spara
          </Button>
        </form>
      </Box>
    </>
  );
}
