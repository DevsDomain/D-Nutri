// controllers/alimentosController.ts

import { Request, Response } from "express";
import pg from "../databases/postgres";
import moment from "moment";
import User from "../models/mongo/User";
import Data from "../models/mongo/Data";

// Função para lidar com as operações relacionadas a Alimentos
class AlimentosController {
  async buscarAlimentos(req: Request, res: Response): Promise<Response> {

    const alimentos = await pg.query(
      `SELECT * FROM "Alimentos"`
    )
    return res.status(201).json(alimentos.rows)
  }

  async findAlimento(req: Request, res: Response): Promise<Response> {
    try {
      console.log("RECEBIDO")
      const { barcode } = req.params;
      console.log(barcode, "BARCODE BACK");

      const alimentos = await pg.query(
        `SELECT * FROM "Alimentos" WHERE "barcode" = $1`, [barcode]);
      console.log(alimentos.rows)
      if (alimentos.rows.length > 0) {
        return res.status(201).json(alimentos.rows[0]);
      }
      else {
        return res.status(204).json({ message: "Alimento não encontrado" })
      }
    } catch (error: any) {
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


  async addAlimento(req: Request, res: Response): Promise<Response> {
    try {
      const { data } = req.body;
      const {
        idProduto,
        barcode,
        nomeProduto,
        Proteina,
        Caloria,
        Carboidrato,
        gordura,
        sodio,
        acucar,
        idUser,
        date,
        meal,
        quantidade
      } = data

      // Convertendo valores que vêm como strings para números
      const proteinaNum = parseFloat(Proteina);
      const caloriaNum = parseFloat(Caloria);
      const carboidratoNum = parseFloat(Carboidrato);
      const gorduraNum = parseFloat(gordura);
      const sodioNum = parseFloat(sodio);
      const acucarNum = parseFloat(acucar);
      const quantidadeNum = parseFloat(quantidade);

      const formattedDate = date.replace(/['"]+/g, ""); // Remove aspas extras
      const data_atual = moment(formattedDate).format("YYYY-MM-DD");
      const userMG = await User.find({ idUser: idUser });

      if (!userMG) {
        return res
          .status(400)
          .json({ message: "Erro ao buscar usuário no mongo!" });
      }

      let usuarioEncontrado: any | string;

      for (const usersPG of userMG) {
        let buscandoUsuario = await Data.findOne({
          data_atual: data_atual,
          usuario: usersPG?.id,
        });
        if (buscandoUsuario) {
          usuarioEncontrado = buscandoUsuario;
        }
      }

      if (!usuarioEncontrado) {
        return res
          .status(400)
          .json({ message: "Erro ao buscar usuário nessa data!" });
      }

      const userMongo = await User.findById(usuarioEncontrado.usuario);

      if (userMongo) {

        userMongo.macroReal.Caloria += caloriaNum;
        userMongo.macroReal.Carboidrato += carboidratoNum;
        userMongo.macroReal.Proteina += proteinaNum;
        userMongo.macroReal.acucar += acucarNum;
        userMongo.macroReal.gordura += gorduraNum;
        userMongo.macroReal.sodio += sodioNum;
        userMongo.consumoAlimentos.push({ idAlimento: idProduto, quantidade: quantidadeNum, tipoRefeicao: meal })
        userMongo.save();
      }






      return res.status(201).json({
        message: "Alimento recebido com sucesso",
        userMongo: userMongo
      });
    } catch (error: any) {
      console.error("Erro ao adicionar alimento:", error);
      return res.status(500).json({
        message: "Erro ao adicionar alimento",
        error: error.message,
      });
    }
  }
}

export default new AlimentosController();
