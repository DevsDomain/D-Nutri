// controllers/alimentosController.ts

import { Request, Response } from "express";
import pg from "../databases/postgres";

// Função para lidar com as operações relacionadas a Alimentos
class AlimentosController {
  async buscarAlimentos(req: Request, res: Response): Promise<Response> {

    const alimentos = await pg.query(
      `SELECT * FROM "Alimentos"`
    )
    return res.status(201).json(alimentos.rows)
  }

  async findAlimento(req: Request, res: Response): Promise<Response> {
    try{
    console.log("RECEBIDO")
    const {barcode}  = req.params;
    console.log(barcode,"BARCODE BACK");

    const alimentos = await pg.query(
      `SELECT * FROM "Alimentos" WHERE "barcode" = $1`, [barcode]);
    console.log(alimentos.rows)
    return res.status(201).json(alimentos.rows[0]);
    }catch(error:any){
      return res.status(500).json(error.message)
    }
  }

  // Inserir alimento na tabela "Alimentos"
  async createAlimento(req: Request, res: Response): Promise<Response> {
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
    } catch (error: any) {
      console.error("Erro ao inserir alimento:", error);
      return res.status(500).json({
        message: "Erro ao inserir alimento",
        error: error.message,
      });
    }
  }

  // Listar todos os alimentos
  async getAllAlimentos(req: Request, res: Response): Promise<Response> {
    try {
      const result = await pg.query(`SELECT * FROM "Alimentos"`);
      return res.status(200).json({
        message: "Lista de alimentos",
        alimentos: result.rows,
      });
    } catch (error: any) {
      console.error("Erro ao listar alimentos:", error);
      return res.status(500).json({
        message: "Erro ao listar alimentos",
        error: error.message,
      });
    }
  }

  // Obter um alimento pelo ID
  async getAlimentoById(req: Request, res: Response): Promise<Response> {
    const { idProduto } = req.params;

    try {
      const result = await pg.query(
        `SELECT * FROM "Alimentos" WHERE "idProduto" = $1`,
        [idProduto]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Alimento não encontrado" });
      }

      return res.status(200).json({
        message: "Alimento encontrado",
        alimento: result.rows[0],
      });
    } catch (error: any) {
      console.error("Erro ao obter alimento:", error);
      return res.status(500).json({
        message: "Erro ao obter alimento",
        error: error.message,
      });
    }
  }

  // Atualizar um alimento pelo ID
  async updateAlimento(req: Request, res: Response): Promise<Response> {
    const { idProduto } = req.params;
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
        UPDATE "Alimentos"
        SET barcode = $1, "nomeProduto" = $2, "imageSrc" = $3, "Proteina" = $4, "Caloria" = $5, "Carboidrato" = $6, "gordura" = $7, "sodio" = $8, "acucar" = $9
        WHERE "idProduto" = $10
        RETURNING *;
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
          idProduto,
        ]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Alimento não encontrado" });
      }

      return res.status(200).json({
        message: "Alimento atualizado com sucesso",
        alimento: result.rows[0],
      });
    } catch (error: any) {
      console.error("Erro ao atualizar alimento:", error);
      return res.status(500).json({
        message: "Erro ao atualizar alimento",
        error: error.message,
      });
    }
  }

  // Excluir um alimento pelo ID
  async deleteAlimento(req: Request, res: Response): Promise<Response> {
    const { idProduto } = req.params;

    try {
      const result = await pg.query(
        `DELETE FROM "Alimentos" WHERE "idProduto" = $1 RETURNING *;`,
        [idProduto]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Alimento não encontrado" });
      }

      return res.status(200).json({
        message: "Alimento excluído com sucesso",
        alimento: result.rows[0],
      });
    } catch (error: any) {
      console.error("Erro ao excluir alimento:", error);
      return res.status(500).json({
        message: "Erro ao excluir alimento",
        error: error.message,
      });
    }
  }
}

export default new AlimentosController();
