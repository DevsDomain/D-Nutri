import { Request, Response } from "express";
import Data from "../models/mongo/Data"; // Certifique-se de que o caminho para o modelo Data está correto
import User from "../models/mongo/User"; // Certifique-se de que o caminho para o modelo User está correto

class DataController {
  // Criar novos dados diários para um usuário
  async createData(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;

      // Verifica se o usuário existe
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      // Cria os dados diários
      const data = new Data({
        ...req.body,
        usuario: userId,
      });

      await data.save();
      return res
        .status(201)
        .json({ message: "Dados criados com sucesso", data });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar dados", error });
    }
  }

  // Buscar todos os dados diários de um usuário
  async getAllData(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const data = await Data.find({ usuario: userId });

      if (!data.length) {
        return res
          .status(404)
          .json({ message: "Dados não encontrados para este usuário" });
      }

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar dados", error });
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
