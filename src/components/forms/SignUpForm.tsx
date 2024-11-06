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
import { useRouter } from "next/navigation";
import { signUpAction } from "@/app/lib/actions";
import { signUpSchema } from "@/app/lib/zod";
// import { formProps, UserTypes } from "../../types";

export default function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData(event.currentTarget);

      const validatedFields = signUpSchema.safeParse({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
        address: formData.get("address"),
        zipcode: formData.get("zipcode"),
        city: formData.get("city"),
        country: formData.get("country"),
        phoneNumber: formData.get("phoneNumber"),
      });

      console.log("2. Validation result:", validatedFields);

      if (!validatedFields.success) {
        setError(validatedFields.error.errors[0].message);
        return;
      }

      const response = await signUpAction(formData);

      if (response?.error) {
        setError(response.message);
      } else {
        console.log("Login successful");
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("Error:", error);
      setError("Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <TextField
          id="firstName-input"
          label="First name"
          type="text"
          name="firstName"
          required
          disabled={isLoading}
          error={!!error}
        />
        <TextField
          id="lastName-input"
          label="Last name"
          type="text"
          name="lastName"
          required
          disabled={isLoading}
          error={!!error}
        />
        <TextField
          id="email-input"
          label="Email"
          type="email"
          name="email"
          required
          disabled={isLoading}
          error={!!error}
        />
        <TextField
          id="password-input"
          label="Password"
          type="password"
          name="password"
          required
          disabled={isLoading}
          error={!!error}
        />
        <TextField
          id="confirmPassword-input"
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          required
          disabled={isLoading}
          error={!!error}
        />
        <TextField
          id="address-input"
          label="Address"
          type="text"
          name="address"
          required
          disabled={isLoading}
          error={!!error}
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
            disabled={isLoading}
            error={!!error}
          />

          <TextField
            id="city-input"
            label="City"
            type="text"
            name="city"
            required
            disabled={isLoading}
            error={!!error}
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
            disabled={isLoading}
            error={!!error}
          />

          <TextField
            id="phone-input"
            label="Phone number"
            type="text"
            name="phoneNumber"
            required
            disabled={isLoading}
            error={!!error}
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
        {error && (
          <Box color="error.main" sx={{ mt: 1 }}>
            {error}
          </Box>
        )}
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          size="large"
          sx={{
            mt: 2,
            py: 1.5,
            borderRadius: 1.5,
            textTransform: "none",
            fontSize: "1rem",
          }}
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </Button>
      </Box>
    </form>
  );
}
