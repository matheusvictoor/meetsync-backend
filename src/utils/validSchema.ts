import z from "zod";

export const userSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('Email inválido').optional(),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres').optional()
});

export const roomSchema = z.object({
  endingAt: z.string().datetime(),
  times: z.array(z.object({
    date: z.string().datetime(),
    start: z.string().datetime(),
    end: z.string().datetime()
  }))
});

export const voteSchema = z.object({
  userName: z.string(),
  times: z.array(z.string().uuid())
});