"use server";

import { auth, signIn, signOut } from "../../../auth";
import { signUpSchema, changePasswordSchema } from "./zod";
export async function loginWithCredentials(formData: FormData) {
  try {
    console.log("Attempting login with:", formData.get("email"));

    const response = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (response?.error) {
      throw new Error(response.error);
    }

    return response;
  } catch (error) {
    console.log("Error:", error);
    return { error: true, message: "login credentials are incorrect" };
  }
}

export async function signUpAction(formData: FormData) {
  try {
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

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.errors[0].message,
      };
    }

    const { ...userData } = validatedFields.data;

    const dbData = {
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      password: userData.password,
      address: userData.address,
      phone: userData.phoneNumber,
      zipcode: userData.zipcode,
      city: userData.city,
      country: userData.country,
    };

    console.log("dbData", dbData);
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dbData),
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message || "Failed to create account" };
    }

    console.log("trying to sign in", response);
    // After successful signup, sign in the user
    const signInResult = await signIn("credentials", {
      email: dbData.email,
      password: dbData.password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (signInResult?.error) {
      throw new Error("Failed to sign in after signup");
    }

    return signInResult;
  } catch (error) {
    console.error("Signup error:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to create account",
    };
  }
}

export async function changePasswordAction(formData: FormData) {
  const session = await auth();
  if (!session) {
    return { error: "You must be logged in to change your password" };
  }

  try {
    const validatedFields = changePasswordSchema.safeParse({
      currentPassword: formData.get("password"),
      newPassword: formData.get("password"),
      confirmNewPassword: formData.get("confirmPassword"),
    });

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.errors[0].message,
      };
    }

    const userId = session?.user?.id;
    const { confirmNewPassword } = validatedFields.data;

    const dbData = {
      id: userId,
      password: confirmNewPassword,
      status: "password",
    };

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/users`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dbData),
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message || "Failed to create account" };
    }
  } catch (error) {
    console.error("Signup error:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to create account",
    };
  } finally {
    await signOutAction();
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/signin" });
}
