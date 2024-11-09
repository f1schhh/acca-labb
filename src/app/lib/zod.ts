import { object, string } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const changePasswordSchema = object({
  currentPassword: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters"),
  newPassword: string({ required_error: "New password" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  confirmNewPassword: string({ required_error: "Confirm" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match",
  path: ["confirmNewPassword"],
});

export const signUpSchema = object({
  firstName: string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "First name can only contain letters"),

  lastName: string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "Last name can only contain letters"),

  email: string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters"),

  password: string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be less than 32 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*]/,
      "Password must contain at least one special character"
    ),

  confirmPassword: string(),

  address: string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be less than 200 characters"),

  zipcode: string()
    .min(5, "Zip code must be at least 5 characters")
    .max(10, "Zip code must be less than 10 characters")
    .regex(/^[0-9-]*$/, "Zip code can only contain numbers and hyphens"),

  city: string()
    .min(2, "City must be at least 2 characters")
    .max(100, "City must be less than 100 characters"),

  country: string()
    .min(2, "Country must be at least 2 characters")
    .max(100, "Country must be less than 100 characters"),

  phoneNumber: string()
    .min(8, "Phone number must be at least 8 characters")
    .max(15, "Phone number must be less than 15 characters")
    .regex(/^[0-9+\-\s()]*$/, "Invalid phone number format"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
