import { deleteAccountAction } from "@/app/lib/actions";
import { Button } from "@mui/material";

export default function DeleteButton() {
  const handleSubmit = async () => {
    deleteAccountAction();
  };
  return (
    <Button onClick={handleSubmit} type="button">
      Delete account
    </Button>
  );
}
