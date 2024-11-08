import { Box, TextField } from "@mui/material";

export default function SettingsForm() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        id="firstName-input"
        label="First name"
        type="text"
        name="firstName"
        required
        // defaultValue={data.firstName}
      />
      <TextField
        id="lastName-input"
        label="Last name"
        type="text"
        name="lastName"
        required
        // defaultValue={data.lastName}
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
      />
      <TextField
        id="confirmPassword-input"
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        required
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
    </Box>
  );
}
