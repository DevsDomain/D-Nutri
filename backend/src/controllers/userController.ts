import { Request, Response } from "express";

// Função para obter usuários
export const getUsers = (req: Request, res: Response) => {
  res.json({ message: "Lista de usuários" });
};

// Função para criar um novo usuário
export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  res.status(201).json({ message: "Usuário criado", user: { name, email } });
};
