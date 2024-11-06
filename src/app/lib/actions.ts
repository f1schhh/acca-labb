"use server";

import { signIn, signOut } from "../../../auth";
import bcrypt from "bcryptjs";

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
    const password = formData.get("password") as string;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: formData.get("firstName"),
        last_name: formData.get("lastName"),
        email: formData.get("email"),
        password: hashedPassword,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Signup failed");
    }

    // After successful signup, sign in the user
    const signInResult = await signIn("credentials", {
      email: formData.get("email") as string,
      password: password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (!signInResult?.ok) {
      throw new Error("Failed to sign in after signup");
    }

    return signInResult;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/signin" });
}
