import { Request, Response } from "express";
import Data from "../models/mongo/Data"; // Importando o modelo Data
import User from "../models/mongo/User"; // Importando o modelo User
import pg from '../databases/postgres';
import moment from 'moment';

class AguaController {
  // Criar ou atualizar o registro de ingestão de água ou bebida para um usuário
  async createWater(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params; // ID do usuário deve ser passado nos parâmetros da rota
      const { date, quantity } = req.body; // quantity e date são enviados no corpo da requisição

      // Formata a data recebida
      const formattedDate = moment(date).format("YYYY-MM-DD");
      console.log("RECEBIDO!", formattedDate, userId);

      // Verifica se o usuário existe no PostgreSQL
      const users = await pg.query(`SELECT * FROM "User" WHERE "idUsuario" = $1`, [userId]);
      if (users.rows.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      // Verifica se já existe um registro para o usuário na coleção Data
      let userData = await Data.findOne({ usuario: userId, data_atual: formattedDate });

      if (!userData) {
        // Se não existir, cria um novo registro
        userData = new Data({
          usuario: userId,
          data_atual: formattedDate,
          agua: {
            ingestaoIdeal: 2000, // Valor padrão de ingestão ideal de água
            ingestaoAtual: quantity,
          },
        });
      } else {
        // Se existir, atualiza a ingestão atual de água
        userData.agua.ingestaoAtual += quantity;
      }

      // Salva o documento atualizado ou criado no MongoDB
      await userData.save();

      return res.status(201).json({
        message: "Ingestão de água atualizada com sucesso",
        data: userData,
      });
    } catch (error: any) {
      console.error("Erro ao registrar ingestão de água:", error.message);
      return res.status(500).json({
        message: "Erro ao registrar ingestão de água",
        error: error.message,
      });
    }
  }

  // Método para buscar a ingestão de água de um usuário por data
  async getWaterIntake(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params; // userId e data recebidos nos parâmetros da rota

      // Formata a data recebida
      const { date } = req.body;
      const formattedDate = moment(date).format("YYYY-MM-DD");

      // Verifica se o usuário existe no PostgreSQL
      const users = await pg.query(`SELECT * FROM "User" WHERE "idUsuario" = $1`, [userId]);
      if (users.rows.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      console.log(date, userId)

      // Busca o registro de ingestão de água no MongoDB
      const userData = await Data.findOne({ usuario: userId, data_atual: formattedDate });

      if (!userData) {
        return res.status(404).json({ message: "Registro de ingestão de água não encontrado" });
      }

      return res.status(200).json({
        message: "Ingestão de água encontrada",
        data: userData.agua,
      });
    } catch (error: any) {
      console.error("Erro ao buscar ingestão de água:", error.message);
      return res.status(500).json({
        message: "Erro ao buscar ingestão de água",
        error: error.message,
      });
    }
  }

  // Atualizar registro de ingestão de bebida (água ou outra)
  async updateWater(req: Request, res: Response): Promise<Response> {
    try {
      const { dataId } = req.params; // ID do registro de ingestão de bebida
      const { quantity } = req.body; // Nova quantidade de ingestão

      // Busca o registro de ingestão no MongoDB
      const userData = await Data.findById(dataId);

      if (!userData) {
        return res.status(404).json({ message: "Registro de ingestão não encontrado" });
      }

      // Atualiza a quantidade de ingestão
      userData.agua.ingestaoAtual = quantity;

      // Salva o documento atualizado
      await userData.save();

      return res.status(200).json({
        message: "Ingestão de bebida atualizada com sucesso",
        data: userData.agua,
      });
    } catch (error: any) {
      console.error("Erro ao atualizar ingestão de bebida:", error.message);
      return res.status(500).json({
        message: "Erro ao atualizar ingestão de bebida",
        error: error.message,
      });
    }
  }

  // Deletar registro de ingestão de bebida (água ou outra)
  async deleteWater(req: Request, res: Response): Promise<Response> {
    try {
      const { dataId } = req.params; // ID do registro de ingestão de bebida

      // Verifica se o registro existe no MongoDB
      const userData = await Data.findByIdAndDelete(dataId);

      if (!userData) {
        return res.status(404).json({ message: "Registro de ingestão não encontrado" });
      }

      return res.status(200).json({
        message: "Registro de ingestão de bebida deletado com sucesso",
      });
    } catch (error: any) {
      console.error("Erro ao deletar ingestão de bebida:", error.message);
      return res.status(500).json({
        message: "Erro ao deletar ingestão de bebida",
        error: error.message,
      });
    }
  }

  async aguaIncremento(req: Request, res: Response): Promise<Response> {
    try {

      const { date, quantify } = req.body;
      const { idUser } = req.params;
      let quantidade = parseInt(quantify)
      console.log(date);
      console.log(idUser);
      const userMG = await User.find({ idUser: idUser });

      if (!userMG) {
        return res
          .status(400)
          .json({ message: "Erro ao buscar usuário no mongo!" });
      }

      let usuarioEncontrado: any | string;

      for (const usersPG of userMG) {
        let buscandoUsuario = await Data.findOne({
          data_atual: date,
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
        userMongo.ingestaoAgua.ingestaoAtual+=quantidade;
        userMongo.save();
        return res.status(202).json(userMongo.ingestaoAgua);
      }
    } catch (error: any) {
      console.error("ERRO AO BUSCAR ALIMENTOS CONSUMIDOS:", error.message)
      return res.status(404).json({ "ERRO": error.message });

    }
    return res.status(404).json("ERRO");

  }
}



export default new AguaController();