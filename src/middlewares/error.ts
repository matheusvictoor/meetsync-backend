import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('--> '+ err.stack);

  if(err.isFailure) {
    return res.status(err.status || 400).json({ error: err.error });
  }

  res.status(500).json({ error: 'Erro interno do servidor' });
}