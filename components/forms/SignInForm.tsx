"use client";
import { Box, Button, TextField } from "@mui/material";
import { UserTypes } from "../../lib/datatypes";

export default function SignInForm() {
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const typedFormData: UserTypes = {
      email: formJson.email as string,
      password: formJson.password as string,
    };
    console.log(typedFormData);
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
        />
        <Button
          type="submit"
          variant="outlined"
        >
          Login
        </Button>
      </Box>
    </form>
  );
}
