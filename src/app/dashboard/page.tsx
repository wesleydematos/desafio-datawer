"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Container, Typography, Button, Box } from "@mui/material";
import { APP_ROUTES } from "@/constants";
import { Header, AddProfessionalModal, ProfessionalsTable } from "@/components";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const isAdm = session?.user.role === "ADMIN";

  if (status === "loading") {
    return <Typography color="white">Carregando...</Typography>;
  }

  if (!session) {
    router.push(APP_ROUTES.LOGIN);
    return null;
  }

  return (
    <Box
      component="main"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "background",
      }}
    >
      <Header>
        <Button
          variant="contained"
          onClick={() => signOut({ callbackUrl: APP_ROUTES.LOGIN })}
        >
          Sair
        </Button>
      </Header>

      <Container sx={{ marginTop: "88px" }}>
        {isAdm ? (
          <>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              <Typography variant="h5" color="white">
                Lista de Profissionais
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setOpenModal(true)}
              >
                Adicionar
              </Button>
            </Box>

            <ProfessionalsTable />

            <AddProfessionalModal
              open={openModal}
              onClose={() => setOpenModal(false)}
            />
          </>
        ) : (
          <Typography variant="h4" color="white">
            Dashboard
          </Typography>
        )}
      </Container>
    </Box>
  );
}
