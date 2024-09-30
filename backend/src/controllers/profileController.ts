import { Request, Response } from "express";
import pg from '../databases/postgres'

class ProfileController {
  // Atualizar um usuário
  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const idUsuario = req.params.id;
      const { nomeUsuario, email, peso, altura, genero, meta, TMB } = req.body;

      const query = `UPDATE "User" 
                     SET "nomeUsuario" = $1, email = $2, peso = $3, altura = $4, genero = $5, meta = $6, "TMB" = $7
                     WHERE "idUsuario" = $8
                     RETURNING *`;

      const values = [nomeUsuario, email, peso, altura, genero, meta, TMB, idUsuario];
      const updatedUser = await pg.query(query, values);

      if (updatedUser.rows.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.status(200).json({ message: "Usuário atualizado com sucesso!", user: updatedUser.rows[0] });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar usuário", error });
    }
  }
}

export default new ProfileController();
