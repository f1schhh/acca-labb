"use client";
import { Box, Button, TextField } from "@mui/material";
// import { UserTypes } from "../../types";
import { useState } from "react";
import { loginWithCredentials } from "@/app/lib/actions";
import { signInSchema } from "@/app/lib/zod";
import { useRouter } from "next/navigation";
export default function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData(event.currentTarget);

      const validatedFields = signInSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
      });

      console.log("2. Validation result:", validatedFields);

      if (!validatedFields.success) {
        setError(validatedFields.error.errors[0].message);
        return;
      }

      console.log("2. About to call loginWithCredentials");

      const response = await loginWithCredentials(formData);

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
        }}
      >
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
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </Box>
    </form>
  );
}
