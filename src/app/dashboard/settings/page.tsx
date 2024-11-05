"use client";
import { Box, Typography } from "@mui/material";

import SettingsForm from "../../../../components/forms/SettingsForm";
import { useFormContext } from "react-hook-form";

import { UserTypes } from "../../../../types";
import { useRef } from "react";

// interface SettingsProps {
//   id?: number;
// }

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  zipcode: string;
  phoneNumber: string;
  country: string;
  city: string;
  password: string;
  confirmPassword: string;
}

export default function Settings() {
  const { formState, reset } = useFormContext<UserData>();

  const defaultValues = useRef<Partial<UserData>>({
    ...formState.defaultValues,
  });

  const data = {
    firstName: "John",
    lastName: "Doe",
    email: "jdoe@me.com",
    address: "123 Main St",
    zipcode: "12345",
    phoneNumber: "1234567890",
    country: "USA",
    city: "New York",
    password: "password",
    confirmPassword: "password",
  };
  const userData: UserTypes = {
    ...defaultValues.current,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
    address: data.address,
    zipcode: data.zipcode,
    phoneNumber: data.phoneNumber,
    country: data.country,
    city: data.city,
  };
  reset(userData);

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
