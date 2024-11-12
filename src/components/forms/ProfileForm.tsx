import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { UserTypes } from "../../../types/userTypes";
import { useState } from "react";
import { updateProfileSchema } from "@/app/lib/zod";
import { updateProfileAction } from "@/app/lib/actions";

export default function ProfileForm({ userData }: { userData: UserTypes }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [updatedValues, setUpdatedValues] =
    useState<Partial<UserTypes>>(userData);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const currentUserData = { ...userData };

      const parsedData = updateProfileSchema.safeParse({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        address: formData.get("address"),
        zipcode: formData.get("zipcode"),
        city: formData.get("city"),
        country: formData.get("country"),
        phoneNumber: formData.get("phoneNumber"),
      });

      if (parsedData.success) {
        Object.assign(currentUserData, parsedData.data);
      } else {
        setError(parsedData.error.errors[0].message);
        return;
      }

      const response = await updateProfileAction(formData, currentUserData);

      if (response.error) {
        setError(response.error);
        console.log(error);
      } else {
        setUpdatedValues(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography sx={{ mb: 3 }} variant="h6">
        Profile settings
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              id="firstName-input"
              label="First name"
              type="text"
              name="firstName"
              required
              defaultValue={updatedValues.first_name}
            />
            <TextField
              id="lastName-input"
              label="Last name"
              type="text"
              name="lastName"
              required
              defaultValue={updatedValues.last_name}
            />
            <TextField
              id="email-input"
              label="Email"
              type="email"
              name="email"
              required
              defaultValue={updatedValues.email}
            />

            <TextField
              id="address-input"
              label="Address"
              type="text"
              name="address"
              required
              defaultValue={updatedValues.address}
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
                defaultValue={updatedValues.zipcode}
              />

              <TextField
                id="city-input"
                label="City"
                type="text"
                name="city"
                required
                fullWidth
                defaultValue={updatedValues.city}
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
                defaultValue={updatedValues.country}
              />

              <TextField
                id="phone-input"
                label="Phone number"
                type="text"
                name="phoneNumber"
                required
                fullWidth
                defaultValue={updatedValues.phone}
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
      )}
    </Paper>
  );
}
