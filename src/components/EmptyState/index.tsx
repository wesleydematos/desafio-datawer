"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import emptyStateImage from "@/assets/images/empty-state.png";

interface EmptyStateProps {
  text: string;
}

export default function EmptyState({ text }: EmptyStateProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h6"
        color="textSecondary"
        sx={{ mb: 2, color: "white" }}
      >
        {text}
      </Typography>
      <Image
        src={emptyStateImage}
        alt="Nenhum dado disponível"
        width={250}
        height={250}
        priority
      />
    </Box>
  );
}
