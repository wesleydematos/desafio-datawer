import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { HeaderProps } from "./types";
import Image from "next/image";
import logo from "@/assets/images/logo.png";

export default function Header({ children }: HeaderProps) {
  return (
    <AppBar
      position="fixed"
      sx={{
        background: "transparent",
        boxShadow: "none",
        paddingX: 3,
        paddingY: 1.5,
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
            sx={{ color: "white", fontWeight: "bold", fontSize: "1.5rem" }}
          >
            Professional Manager
          </Typography>
        </Box>

        <Box>{children}</Box>
      </Toolbar>
    </AppBar>
  );
}
