"use client";
import { UserTypes } from "../../../types/userTypes";
import { useForm, FormProvider as HookFormProvider } from "react-hook-form";

type FormProviderProps = {
  children: React.ReactNode;
};

export function FormProvider({ children }: FormProviderProps) {
  const methods = useForm<UserTypes>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      zipcode: "",
      phoneNumber: "",
      country: "",
      city: "",
    },
  });
  return <HookFormProvider {...methods}>{children}</HookFormProvider>;
}
