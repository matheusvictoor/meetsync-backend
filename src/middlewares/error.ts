import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "erro de validação",
      detalhes: err.errors.map(e => ({
        campo: e.path.join('.'),
        mensagem: e.message
      }))
    });
  }

  if(err.status) {
    return res.status(err.status || 400).json({ error: err.error || 'Erro desconhecido' });
  }
  res.status(500).json({ error: 'Erro interno do servidor' });
}