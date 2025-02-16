"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Container, Typography, Button, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { APP_ROUTES } from "@/constants";
import { Header } from "@/components";
import { fadeIn } from "@/variants";
import ProfessionalsImage from "@/assets/images/professionals.jpg";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    if (session) {
      router.push(APP_ROUTES.DASHBOARD);
    }
  }, [session, router]);

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${ProfessionalsImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: theme.palette.action.disabled,
          zIndex: 1,
        },
        "& > *": {
          position: "relative",
          zIndex: 2,
        },
      }}
    >
      <Header>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push(APP_ROUTES.LOGIN)}
        >
          Acessar Login
        </Button>
      </Header>

      <Container
        maxWidth="xl"
        sx={{
          textAlign: "center",
          color: theme.palette.common.white,
          p: 3,
          borderRadius: 2,
        }}
      >
        <motion.div
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.6 }}
          variants={fadeIn("up", 0.4)}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
            }}
          >
            Bem-vindos ao Professional Manager!
          </Typography>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.6 }}
          variants={fadeIn("up", 0.6)}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              fontSize: { xs: "1rem", sm: "1.5rem" },
            }}
          >
            Acesse sua conta e gerencie profissionais de forma eficiente e
            organizada.
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
}
