"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Container, Typography, Button } from "@mui/material";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Typography>Carregando...</Typography>;
  }

  if (!session) {
    router.push("/auth/login");
    return null;
  }

  return (
    <Container>
      <Typography variant="h4">Dashboard</Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => signOut({ callbackUrl: "/auth/login" })}
      >
        Sair
      </Button>
    </Container>
  );
}
