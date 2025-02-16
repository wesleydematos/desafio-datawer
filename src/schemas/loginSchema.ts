import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Digite um e-mail válido"),
  password: z.string().nonempty("A senha é obrigatória"),
});
