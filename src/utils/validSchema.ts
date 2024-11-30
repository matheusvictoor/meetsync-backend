import z from "zod";

export const userSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('Email inválido').optional(),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres').optional()
});

const isValidDate = (endingAt: string) => {
  const date = new Date(endingAt);
  
  if (isNaN(date.getTime())) {
    return false; 
  }

  const now = new Date();
  return date >= now;
};

export const roomSchema = z.object({
  endingAt: z.string().refine((endingAt) => isValidDate(endingAt), {
    message: "A data de término deve estar no formato correto e não pode ser uma data passada."
  }),
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string().optional(), 
  times: z.array(z.object({
    date: z.string().datetime(),
    start: z.string().datetime(),
    end: z.string().datetime()
  })).nonempty('É necessário informar pelo menos um horário.'),
});

export const voteSchema = z.object({
  userName: z.string(),
  email: z.string().email({ message: 'Insira um endereço de e-mail válido.'}).optional(),
  times: z.array(z.string().uuid()).nonempty('É necessário informar pelo menos um horário.')
});