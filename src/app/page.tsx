"use client";
import { Container, Typography, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bem-vindo ao Professional Manager
      </Typography>
      <Typography variant="body1">
        Acesse sua conta para gerenciar profissionais.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/auth/login")}
      >
        Acessar Login
      </Button>
    </Container>
  );
}
