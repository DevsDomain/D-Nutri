import { Request, Response } from "express";
import User from "../models/mongo/User"; // Certifique-se de que o caminho para o modelo User está correto
import Data from "../models/mongo/Data"; // Certifique-se de que o caminho para o modelo Data está correto

class UserController {
  // Criar um novo usuário
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = new User(req.body);
      await user.save();
      return res
        .status(201)
        .json({ message: "Usuário criado com sucesso", user });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar usuário", error });
    }
  }

  // Buscar todos os usuários
  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar usuários", error });
    }
  }

  // Buscar um usuário por ID
  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar usuário", error });
    }
  }

  // Atualizar um usuário
  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      return res
        .status(200)
        .json({ message: "Usuário atualizado com sucesso", user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao atualizar usuário", error });
    }
  }

  // Excluir um usuário
  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      return res.status(200).json({ message: "Usuário excluído com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao excluir usuário", error });
    }
  }

  // Criar dados diários para um usuário
  async createDailyData(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const data = new Data({
        ...req.body,
        usuario: userId,
      });

      await data.save();
      return res
        .status(201)
        .json({ message: "Dados diários criados com sucesso", data });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao criar dados diários", error });
    }
  }

  // Buscar dados diários de um usuário
  async getDailyData(req: Request, res: Response): Promise<Response> {
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
      return res
        .status(500)
        .json({ message: "Erro ao buscar dados diários", error });
    }
  }
}

export default new UserController();
