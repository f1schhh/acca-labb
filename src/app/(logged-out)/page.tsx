import { Container } from "@mui/material";
import SignIn from "./signin/page";

export default async function Home() {
  return (
    <Container maxWidth="sm">
      <SignIn />
    </Container>
  );
}
