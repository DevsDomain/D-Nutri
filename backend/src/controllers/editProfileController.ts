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

      try {
        MetricasController.calculateMetricas(idUsuario);
      } catch (error: any) {
        console.log("Erro ao calcular métricas do usuário")
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
}

export default new EditProfileController();
