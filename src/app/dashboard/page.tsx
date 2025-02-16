"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { APP_ROUTES } from "@/constants";
import { Header, AddProfessionalModal, ProfessionalsTable } from "@/components";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const isAdm = session?.user.role === "ADMIN";

  if (status === "loading") {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
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
      <Header withBackground>
        <Button
          variant="contained"
          onClick={() => signOut({ callbackUrl: APP_ROUTES.LOGIN })}
        >
          Sair
        </Button>
      </Header>

      <Container sx={{ marginTop: "88px", marginBottom: "20px" }}>
        {isAdm ? (
          <>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              <Typography variant="h5" color="primary">
                PROFISSIONAIS
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
