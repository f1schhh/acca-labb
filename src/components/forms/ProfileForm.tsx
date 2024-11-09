import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { UserTypes } from "../../../types/userTypes";

export default function ProfileForm({ userData }: { userData: UserTypes }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography sx={{ mb: 3 }} variant="h6">
        Profile settings
      </Typography>
      <form>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            id="firstName-input"
            label="First name"
            type="text"
            name="firstName"
            required
            defaultValue={userData.first_name}
          />
          <TextField
            id="lastName-input"
            label="Last name"
            type="text"
            name="lastName"
            required
            defaultValue={userData.last_name}
          />
          <TextField
            id="email-input"
            label="Email"
            type="email"
            name="email"
            required
            defaultValue={userData.email}
          />

          <TextField
            id="address-input"
            label="Address"
            type="text"
            name="address"
            required
            defaultValue={userData.address}
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
              defaultValue={userData.zipcode}
            />

            <TextField
              id="city-input"
              label="City"
              type="text"
              name="city"
              required
              fullWidth
              defaultValue={userData.city}
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
              defaultValue={userData.country}
            />

            <TextField
              id="phone-input"
              label="Phone number"
              type="text"
              name="phoneNumber"
              required
              fullWidth
              defaultValue={userData.phone}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              width: "100%",
            }}
          >
            <Button
              sx={{
                width: "50%",
              }}
              variant="contained"
              type="submit"
            >
              Save
            </Button>
            <Button
              sx={{
                width: "50%",
              }}
              variant="contained"
              type="reset"
            >
              Reset
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
}
