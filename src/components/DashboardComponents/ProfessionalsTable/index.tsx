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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { IProfessional } from "@/app/api/professionals/route";
import { API_ROUTES } from "@/constants";

export default function ProfessionalsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
              <TableCell sx={{ color: "primary.main" }}>QUALIFICAÇÃO</TableCell>
              <TableCell sx={{ color: "primary.main" }}>AÇÕES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {professionals.map((prof: IProfessional) => (
              <TableRow key={prof.id}>
                <TableCell>{prof.name}</TableCell>
                <TableCell>{prof.email}</TableCell>
                <TableCell>{prof.qualifications}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary">
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
    </>
  );
}
