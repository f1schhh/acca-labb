"use client";

import { Button } from "@mui/material";
import { signOutAction } from "@/app/lib/actions";

export default function LogoutButton() {
  return <Button onClick={async () => await signOutAction()}>Sign Out</Button>;
}
