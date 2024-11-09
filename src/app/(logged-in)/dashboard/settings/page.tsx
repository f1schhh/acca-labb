import { Button, Container } from "@mui/material";
import SettingsForm from "../../../../components/forms/SettingsForm";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import { getUserById } from "@/app/api/users/route";

export default async function Settings() {
  const session = await auth();

  if (!session?.user) {
    return redirect("/signin");
  }

  const userId = session?.user?.id;

  const userData = await getUserById(userId as string);

  return (
    <Container maxWidth="lg">
      {userData && <SettingsForm userData={userData} />}
      <Button type="button">Delete account</Button>
    </Container>
  );
}
