"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

interface EditProfessionalModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (updatedQualification: string) => void;
  isLoading?: boolean;
  professionalName?: string;
  currentQualification?: string;
}

export default function EditProfessionalModal({
  open,
  onClose,
  onSave,
  isLoading = false,
  professionalName,
  currentQualification = "",
}: EditProfessionalModalProps) {
  const [qualification, setQualification] = useState(currentQualification);

  useEffect(() => {
    setQualification(currentQualification);
  }, [currentQualification]);

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
        <Typography variant="h6" mb={2} sx={{ textAlign: "start" }}>
          Editar qualificação de {professionalName}
        </Typography>

        <TextField
          fullWidth
          label="Qualificação"
          variant="outlined"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSave(qualification)}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Salvar"}
          </Button>
          <Button variant="contained" color="error" onClick={onClose}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
