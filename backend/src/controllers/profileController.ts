import { Request, Response } from "express";
import pg from "../databases/postgres";
import MetricasController from "./MetricasController";

class ProfileController {
  // Atualizar a senha de um usuário
  async updateUserPassword(req: Request, res: Response): Promise<Response> {
    try {
      const idUsuario = req.params.id;
      const { password } = req.body;

      if (!password) {
        return res.status(400).json({ message: "Senha é obrigatória" });
      }

      // Query de atualização no PostgreSQL
      const query = `
        UPDATE "User"
        SET "password" = $1
        WHERE "idUsuario" = $2
        RETURNING *;
      `;

      const values = [password, idUsuario];
      const updatedUser = await pg.query(query, values);

      MetricasController.calculateMetricas(idUsuario);


      if (updatedUser.rows.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.status(200).json({
        message: "Senha atualizada com sucesso!",
        user: updatedUser.rows[0],
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao atualizar usuário[pfl-Ctrl]", error });
    }
  }
}

export default new ProfileController();
