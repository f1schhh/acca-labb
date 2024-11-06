import { Container } from "@mui/material";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return <Container>{children}</Container>;
}
