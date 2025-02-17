"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  CircularProgress,
  IconButton,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IProfessional } from "@/app/api/professionals/route";
import { API_ROUTES } from "@/constants";
import { useToast } from "@/providers";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import EditProfessionalModal from "../EditProfessionalModal";

export default function ProfessionalsTable() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedProfessional, setSelectedProfessional] =
    useState<IProfessional | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const fetchProfessionals = async () => {
    const response = await fetch(
      `/api/${API_ROUTES.PROFESSIONALS}?page=${page + 1}&limit=${rowsPerPage}`
    );
    if (!response.ok) throw new Error("Erro ao carregar profissionais");
    return response.json();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["professionals", page, rowsPerPage],
    queryFn: fetchProfessionals,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/${API_ROUTES.PROFESSIONALS}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir profissional.");
      }
    },
    onSuccess: () => {
      showToast("Profissional removido com sucesso!", "success");
      queryClient.invalidateQueries({ queryKey: ["professionals"] });
      setDeleteModalOpen(false);
    },
    onError: () => {
      showToast("Erro ao excluir profissional.", "error");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      qualifications,
    }: {
      id: string;
      qualifications: string[];
    }) => {
      const response = await fetch(`/api/${API_ROUTES.PROFESSIONALS}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qualifications }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar qualificação.");
      }
    },
    onSuccess: () => {
      showToast("Qualificação atualizada com sucesso!", "success");
      queryClient.invalidateQueries({ queryKey: ["professionals"] });
      setEditModalOpen(false);
    },
    onError: () => {
      showToast("Erro ao atualizar qualificação.", "error");
    },
  });

  const professionals = data?.professionals || [];
  const totalProfessionals = data?.total || 0;

  return (
    <>
      {isError && (
        <Typography color="error">Erro ao carregar profissionais</Typography>
      )}

      <TableContainer component={Paper}>
        {isLoading && <CircularProgress />}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "primary.main" }}>NOME</TableCell>
              <TableCell sx={{ color: "primary.main" }}>EMAIL</TableCell>
              <TableCell sx={{ color: "primary.main" }}>
                QUALIFICAÇÕES
              </TableCell>
              <TableCell sx={{ color: "primary.main" }}>AÇÕES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {professionals.map((professional: IProfessional) => (
              <TableRow key={professional.id}>
                <TableCell>{professional.name}</TableCell>
                <TableCell>{professional.email}</TableCell>
                <TableCell>
                  {Array.isArray(professional.qualifications) ? (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {professional.qualifications.map(
                        (qualification, index) => (
                          <Chip
                            key={index}
                            label={qualification}
                            color="primary"
                          />
                        )
                      )}
                    </Box>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setSelectedProfessional(professional);
                      setEditModalOpen(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      setSelectedProfessional(professional);
                      setDeleteModalOpen(true);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          bgcolor: "background.paper",
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
        }}
      >
        <TablePagination
          component="div"
          count={totalProfessionals}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Box>

      <ConfirmDeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() =>
          selectedProfessional && deleteMutation.mutate(selectedProfessional.id)
        }
        isLoading={deleteMutation.isPending}
        professionalName={selectedProfessional?.name}
      />

      <EditProfessionalModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={(updatedQualifications) =>
          selectedProfessional &&
          updateMutation.mutate({
            id: selectedProfessional.id,
            qualifications: updatedQualifications,
          })
        }
        isLoading={updateMutation.isPending}
        professionalName={selectedProfessional?.name}
        currentQualifications={selectedProfessional?.qualifications || []}
      />
    </>
  );
}
