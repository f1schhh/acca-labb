"use client";
import { Box, Button, TextField } from "@mui/material";
// import { UserTypes } from "../../types";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    // const formJson = Object.fromEntries(formData.entries());
    //   const typedFormData: UserTypes = {
    //     email: formJson.email as string,
    //     password: formJson.password as string,
    // };
    // console.log(typedFormData);
    // event.currentTarget.reset();

    try {
      const formData = new FormData(event.currentTarget);

      const signInResult = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (signInResult?.error) {
        setError(signInResult.error);
        return;
      }

      if (signInResult?.ok) {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      setError(`Something went wrong: ${error}`);
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
