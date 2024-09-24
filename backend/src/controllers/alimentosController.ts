// controllers/alimentosController.ts

import { Request, Response } from "express";
import pg from "../databases/postgres";

// Função para inserir alimento na tabela "Alimentos"
export const createAlimento = async (req: Request, res: Response) => {
  const {
    barcode,
    nomeProduto,
    imageSrc,
    Proteina,
    Caloria,
    Carboidrato,
    gordura,
    sodio,
    acucar,
  } = req.body;

  try {
    const result = await pg.query(
      `
      INSERT INTO "Alimentos" (barcode, "nomeProduto", "imageSrc", "Proteina", "Caloria", "Carboidrato", "gordura", "sodio", "acucar")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;
    `,
      [
        barcode,
        nomeProduto,
        imageSrc,
        Proteina,
        Caloria,
        Carboidrato,
        gordura,
        sodio,
        acucar,
      ]
    );

    return res.status(201).json({
      message: "Alimento inserido com sucesso",
      alimento: result.rows[0],
    });
  } catch (error) {
    console.error("Erro ao inserir alimento:", error);
    return res.status(500).json({
      message: "Erro ao inserir alimento",
      error: error.message,
    });
  }
};
