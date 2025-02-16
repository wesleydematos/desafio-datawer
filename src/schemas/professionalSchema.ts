import { z } from "zod";

export const professionalSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Digite um email válido"),
  qualifications: z
    .string()
    .min(5, "As qualificações devem ter pelo menos 5 caracteres"),
});

export const editProfessionalSchema = professionalSchema.pick({
  qualifications: true,
});
