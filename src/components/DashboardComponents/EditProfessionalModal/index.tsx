"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Chip,
} from "@mui/material";
import { EditProfessionalModalProps } from "./types";

export default function EditProfessionalModal({
  open,
  onClose,
  onSave,
  isLoading = false,
  professionalName,
  currentQualifications = [],
}: EditProfessionalModalProps) {
  const [qualifications, setQualifications] = useState<string[]>(
    currentQualifications
  );
  const [newQualification, setNewQualification] = useState("");

  useEffect(() => {
    setQualifications(currentQualifications);
  }, [currentQualifications]);

  const handleAddQualification = () => {
    if (
      newQualification.trim() &&
      !qualifications.includes(newQualification.trim())
    ) {
      setQualifications([...qualifications, newQualification.trim()]);
      setNewQualification("");
    }
  };

  const handleRemoveQualification = (qualificationToRemove: string) => {
    setQualifications(
      qualifications.filter((q) => q !== qualificationToRemove)
    );
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
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
          Editar qualificações de {professionalName}
        </Typography>

        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            label="Nova qualificação"
            variant="outlined"
            value={newQualification}
            onChange={(e) => setNewQualification(e.target.value)}
          />
          <Button variant="contained" onClick={handleAddQualification}>
            Adicionar
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
          {qualifications.map((qualification) => (
            <Chip
              key={qualification}
              label={qualification}
              onDelete={() => handleRemoveQualification(qualification)}
              color="primary"
            />
          ))}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSave(qualifications)}
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
