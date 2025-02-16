"use client";

import { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ROUTES } from "@/constants";
import { useToast } from "@/providers";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

interface AddProfessionalModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddProfessionalModal({
  open,
  onClose,
}: AddProfessionalModalProps) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [qualifications, setQualifications] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api${API_ROUTES.PROFESSIONALS}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, qualifications }),
      });

      if (!response.ok) {
        showToast(response.statusText, "error");
      } else {
        showToast("Profissional registrado com sucesso!", "success");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professionals"] });
      onClose();
    },
  });

  const handleSubmit = () => {
    if (!name || !email || !qualifications) return;
    mutation.mutate();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6">Adicionar Profissional</Typography>

        <TextField
          label="Nome"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Qualificações"
          fullWidth
          margin="normal"
          value={qualifications}
          onChange={(e) => setQualifications(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Adicionando..." : "Adicionar"}
        </Button>
      </Box>
    </Modal>
  );
}
