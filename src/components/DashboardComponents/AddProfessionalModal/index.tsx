"use client";

import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ROUTES } from "@/constants";
import { useToast } from "@/providers";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { professionalSchema } from "@/schemas";
import { AddProfessionalModalProps } from "./types";

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

export default function AddProfessionalModal({
  open,
  onClose,
}: AddProfessionalModalProps) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof professionalSchema>>({
    resolver: zodResolver(professionalSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      qualifications: string[];
    }) => {
      const response = await fetch(`/api${API_ROUTES.PROFESSIONALS}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
    },
    onSuccess: () => {
      showToast("Profissional registrado com sucesso!", "success");
      queryClient.invalidateQueries({ queryKey: ["professionals"] });
      onClose();
      reset();
    },
    onError: (error) => {
      showToast(error.message, "error");
    },
  });

  const onSubmit = (data: {
    name: string;
    email: string;
    qualifications: string;
  }) => {
    const formattedData = {
      ...data,
      qualifications: data.qualifications.split(",").map((q) => q.trim()),
    };
    mutation.mutate(formattedData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6">Adicionar Profissional</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Nome"
            fullWidth
            margin="normal"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Qualificações (separadas por vírgula)"
            fullWidth
            margin="normal"
            {...register("qualifications")}
            error={!!errors.qualifications}
            helperText={errors.qualifications?.message}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Adicionando..." : "Adicionar"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
