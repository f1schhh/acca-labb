import {
  Box,
  Button,
  Paper,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { changePasswordSchema } from "@/app/lib/zod";
import { changePasswordAction } from "@/app/lib/actions";

export default function PasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData(event.currentTarget);
      const validatedFields = changePasswordSchema.safeParse({
        currentPassword: formData.get("password"),
        newPassword: formData.get("newPassword"),
        confirmNewPassword: formData.get("confirmNewPassword"),
      });

      console.log("2. Validation result:", validatedFields);

      if (!validatedFields.success) {
        setError(validatedFields.error.errors[0].message);
        return;
      }

      const response = await changePasswordAction(formData);

      if (response?.error) {
        setError(error);
      }
    } catch (error) {
      console.log("Error:", error);
      setError("Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
            <TextField
              id="password-input"
              label="Current Password"
              type="password"
              name="password"
              required
            />
            <TextField
              id="newPassword-input"
              label="New Password"
              type="password"
              name="newPassword"
              required
            />
            <TextField
              id="confirmNewPassword-input"
              label="Confirm new Password"
              type="password"
              name="confirmNewPassword"
              required
            />
            {error && <Alert severity="error">{error}</Alert>}
          </Box>
          <Button
            sx={{
              width: "100%",
            }}
            variant="contained"
            type="submit"
          >
            Save changed password
          </Button>
        </form>
      )}
    </Paper>
  );
}
