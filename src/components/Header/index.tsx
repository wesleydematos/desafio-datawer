import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { HeaderProps } from "./types";
import Image from "next/image";
import logo from "@/assets/images/logo.png";

export default function Header({ children, withBackground }: HeaderProps) {
  return (
    <AppBar
      position="fixed"
      sx={{
        background: withBackground ? "#211d33" : "transparent",
        boxShadow: "none",
        paddingX: 3,
        paddingY: 1.5,
        height: "88px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Image src={logo} alt="Logo" width={50} height={50} priority />
          <Typography
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
            }}
          >
            Professional Manager
          </Typography>
        </Box>

        <Box>{children}</Box>
      </Toolbar>
    </AppBar>
  );
}
