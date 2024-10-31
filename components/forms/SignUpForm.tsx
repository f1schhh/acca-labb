"use client";
import {
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  Link,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { formProps, UserTypes } from "../../lib/datatypes";

export default function SignUpForm({ onAction }: formProps) {
  const [currentpassword, setCurrentPassword] = useState<string | null>(null);
  const [currentconfirmPassword, setCurrentConfirmPassword] = useState<
    string | null
  >(null);
  const handlePasswordError = () => {
    if (currentpassword === null || currentconfirmPassword === null) {
      return false;
    }
    if (
      currentpassword !== currentconfirmPassword &&
      currentpassword.length >= 12
    ) {
      return true;
    }
  };
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const typedFormData: UserTypes = {
      firstName: formJson.firstName as string,
      lastName: formJson.lastName as string,
      email: formJson.email as string,
      password: formJson.password as string,
      confirmPassword: formJson.confirmPassword as string,
      address: formJson.address as string,
      zipcode: formJson.zipcode as string,
      phoneNumber: formJson.phoneNumber as string,
      country: formJson.country as string,
      city: formJson.city as string,
    };
    console.log(typedFormData);
    // En action för att skicka till sign up sidan till exempel skicka error till den sidan ifall en användare redan finns tex
    onAction("This user already exists", true);
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          id="firstName-input"
          label="First name"
          type="text"
          name="firstName"
          required
        />
        <TextField
          id="lastName-input"
          label="Last name"
          type="text"
          name="lastName"
          required
        />
        <TextField
          id="email-input"
          label="Email"
          type="email"
          name="email"
          required
        />
        <TextField
          id="password-input"
          label="Password"
          type="password"
          name="password"
          required
          helperText={
            currentpassword !== null && currentpassword?.length < 12
              ? "Password must be at least 12 characters"
              : ""
          }
          error={currentpassword !== null && currentpassword?.length < 12}
          onChange={(event) => {
            setCurrentPassword(event.target.value);
          }}
        />
        <TextField
          id="confirmPassword-input"
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          helperText={handlePasswordError() ? "Passwords do not match" : ""}
          error={handlePasswordError()}
          required
          onChange={(event) => {
            setCurrentConfirmPassword(event.target.value);
          }}
        />
        <TextField
          id="address-input"
          label="Address"
          type="text"
          name="address"
          required
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <TextField
            id="zipcode-input"
            label="Zip code"
            type="text"
            name="zipcode"
            required
            fullWidth
          />

          <TextField
            id="city-input"
            label="City"
            type="text"
            name="city"
            required
            fullWidth
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <TextField
            id="country-input"
            label="Country"
            type="text"
            name="country"
            required
            fullWidth
          />

          <TextField
            id="phone-input"
            label="Phone number"
            type="text"
            name="phoneNumber"
            required
            fullWidth
          />
        </Box>
        <FormControlLabel
          required
          control={<Checkbox />}
          label={
            <span>
              I agree to the <Link href="#">Your Link</Link>
            </span>
          }
        />
        <Button
          type="submit"
          variant="outlined"
        >
          Sign up
        </Button>
      </Box>
    </form>
  );
}
