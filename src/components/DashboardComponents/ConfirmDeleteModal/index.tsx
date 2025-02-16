"use client";

import { Modal, Box, Typography, Button } from "@mui/material";
import { ConfirmDeleteModalProps } from "./types";

export default function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  isLoading = false,
  professionalName,
}: ConfirmDeleteModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          Tem certeza que deseja excluir {professionalName}?
        </Typography>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Excluindo..." : "Excluir"}
          </Button>
          <Button variant="contained" onClick={onClose}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
