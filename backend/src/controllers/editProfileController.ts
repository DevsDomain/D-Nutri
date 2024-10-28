import { Request, Response } from "express";
import pg from "../databases/postgres";
import MetricasController from "./MetricasController";

class EditProfileController {
  // Atualizar um usuário
  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const idUsuario = req.params.id;
      const { nomeUsuario, altura, genero, peso, meta } = req.body;
      console.log(req.body);

      // Query de atualização no PostgreSQL
      const query = `
        UPDATE "User"
        SET "nomeUsuario" = $1, altura = $2, genero = $3, peso = $4, meta = $5
        WHERE "idUsuario" = $6
        RETURNING *;
      `;

      const values = [nomeUsuario, altura, genero, peso, meta, idUsuario];
      const updatedUser = await pg.query(query, values);

      if (updatedUser.rows.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.status(200).json({
        message: "Usuário atualizado com sucesso!",
        user: updatedUser.rows[0],
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao atualizar usuário", error });
    }
  }

  // Atualizar a senha de um usuário
  async updateUserPassword(req: Request, res: Response): Promise<Response> {
    try {
      const idUsuario = parseInt(req.params.id, 10); // Converte o ID para número
      const { password } = req.body;

      if (!password) {
        return res.status(400).json({ message: "Senha é obrigatória" });
      }

      // Query de atualização da senha no PostgreSQL
      const query = `
        UPDATE "User"
        SET "password" = $1
        WHERE "idUsuario" = $2
        RETURNING *;
      `;

      const values = [password, idUsuario];
      const updatedUser = await pg.query(query, values);

      if (updatedUser.rows.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      try {
        //MetricasController.calculateMetricas(idUsuario); // Pode chamar as métricas se necessário
      } catch (error: any) {
        console.log("Erro ao calcular métricas do usuário");
      }

      return res.status(200).json({
        message: "Senha atualizada com sucesso!",
        user: updatedUser.rows[0],
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao atualizar senha", error });
    }
  }
}

export default new EditProfileController();
