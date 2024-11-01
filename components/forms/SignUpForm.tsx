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
// import { formProps, UserTypes } from "../../types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [currentpassword, setCurrentPassword] = useState<string | null>(null);
  // const [currentconfirmPassword, setCurrentConfirmPassword] = useState<
  //   string | null
  // >(null);
  // const handlePasswordError = () => {
  //   if (currentpassword === null || currentconfirmPassword === null) {
  //     return false;
  //   }
  //   if (
  //     currentpassword !== currentconfirmPassword &&
  //     currentpassword.length >= 12
  //   ) {
  //     return true;
  //   }
  // };
  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      setIsLoading(true);
      setError("");

      const signUpResult = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        first_name: formData.get("firstName"),
        last_name: formData.get("lastName"),
        address: formData.get("address"),
        phone: formData.get("phoneNumber"),
        zipcode: formData.get("zipcode"),
        city: formData.get("city"),
        country: formData.get("country"),
        redirect: false,
        mode: "signup",
      });

      if (signUpResult?.error) {
        setError(signUpResult.error);
        return;
      }

      if (signUpResult?.ok) {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      setError(`Something went wrong: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };
  // const formJson = Object.fromEntries(formData.entries());
  // const typedFormData: UserTypes = {
  //   firstName: formJson.firstName as string,
  //   lastName: formJson.lastName as string,
  //   email: formJson.email as string,
  //   password: formJson.password as string,
  //   confirmPassword: formJson.confirmPassword as string,
  //   address: formJson.address as string,
  //   zipcode: formJson.zipcode as string,
  //   phoneNumber: formJson.phoneNumber as string,
  //   country: formJson.country as string,
  //   city: formJson.city as string,
  // };
  // console.log(typedFormData);
  // // En action för att skicka till sign up sidan till exempel skicka error till den sidan ifall en användare redan finns tex
  // onAction("This user already exists", true);
  // event.currentTarget.reset();

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
          fullWidth
        />
        <TextField
          id="lastName-input"
          label="Last name"
          type="text"
          name="lastName"
          required
          disabled={isLoading}
          error={!!error}
          fullWidth
        />
        <TextField
          id="email-input"
          label="Email"
          type="email"
          name="email"
          required
          disabled={isLoading}
          error={!!error}
          fullWidth
        />
        <TextField
          id="password-input"
          label="Password"
          type="password"
          name="password"
          required
          disabled={isLoading}
          error={!!error}
          fullWidth
          // helperText={
          //   currentpassword !== null && currentpassword?.length < 12
          //     ? "Password must be at least 12 characters"
          //     : ""
          // }
          // onChange={(event) => {
          //   setCurrentPassword(event.target.value);
          // }}
        />
        <TextField
          id="confirmPassword-input"
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          // helperText={handlePasswordError() ? "Passwords do not match" : ""}
          // error={handlePasswordError()}
          required
          disabled={isLoading}
          error={!!error}
          fullWidth
          // onChange={(event) => {
          //   setCurrentConfirmPassword(event.target.value);
          // }}
        />
        <TextField
          id="address-input"
          label="Address"
          type="text"
          name="address"
          required
          disabled={isLoading}
          error={!!error}
          fullWidth
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
            fullWidth
          />

          <TextField
            id="city-input"
            label="City"
            type="text"
            name="city"
            required
            disabled={isLoading}
            error={!!error}
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
            disabled={isLoading}
            error={!!error}
            fullWidth
          />

          <TextField
            id="phone-input"
            label="Phone number"
            type="text"
            name="phoneNumber"
            required
            disabled={isLoading}
            error={!!error}
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
