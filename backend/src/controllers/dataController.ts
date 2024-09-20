import { Request, Response } from "express";
import pg from '../databases/postgres'
import Data from "../models/mongo/Data";
import User from "../models/mongo/User";
import moment from 'moment';

class DataController {
  // Criar novos dados diários para um usuário
  async createData(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const {data} = req.body

      const data_atual = moment(data).format("YYYY-MM-DD");

      // VERIFICA SE O USUÁRIO EXISTE
      const userMongo = await User.findOne({ idUser: userId });
      if (!userMongo) {
        return res.status(500).json({ message: "Usuário não encontrado!" });
      }

      // VERIFICA SE JÁ EXISTE ESSA DATA PARA ESSE USUÁRIO!
      const existingData = await Data.findOne({ usuario: userMongo.id, data_atual });
      if (existingData) {
        return res.status(400).json({ message: "Já existe um registro para hoje." });
      }

      const novaData = await new Data({ usuario: userMongo.id, data_atual: data_atual }).save();
      

      return res.status(200).json(novaData);

    } catch (error) {
      return res.status(500).json({ message: "Usuário não encontrado!", error });
    }
  }



  // Buscar dados diários por ID
  async getDataById(req: Request, res: Response): Promise<Response> {
    try {
      const { dataId } = req.params;
      const data = await Data.findById(dataId);

      if (!data) {
        return res.status(404).json({ message: "Dados não encontrados" });
      }

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar dados", error });
    }
  }

  // Atualizar dados diários
  async updateData(req: Request, res: Response): Promise<Response> {
    try {
      const { dataId } = req.params;
      const data = await Data.findByIdAndUpdate(dataId, req.body, {
        new: true,
      });

      if (!data) {
        return res.status(404).json({ message: "Dados não encontrados" });
      }

      return res
        .status(200)
        .json({ message: "Dados atualizados com sucesso", data });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao atualizar dados", error });
    }
  }

  // Excluir dados diários
  async deleteData(req: Request, res: Response): Promise<Response> {
    try {
      const { dataId } = req.params;
      const data = await Data.findByIdAndDelete(dataId);

      if (!data) {
        return res.status(404).json({ message: "Dados não encontrados" });
      }

      return res.status(200).json({ message: "Dados excluídos com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao excluir dados", error });
    }
  }
}

export default new DataController();
