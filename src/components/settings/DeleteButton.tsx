import { deleteAccountAction } from "@/app/lib/actions";
import { Button } from "@mui/material";

export default function DeleteButton() {
  return (
    <Button variant="contained" onClick={deleteAccountAction} type="button">
      Delete account
    </Button>
  );
}
