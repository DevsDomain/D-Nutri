import { Request, Response } from "express";
import User from "../models/mongo/User";
import pg from "../databases/postgres";

class CadastroController {
  // Criar um novo usuário
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { nomeUsuario, email, password } = req.body;

                  // Verifica se o e-mail já está em uso
                  const emailCheckQuery = `SELECT * FROM public."User" WHERE email = $1`;
                  const emailCheckValues = [email];
                  const existingUser = await pg.query(emailCheckQuery, emailCheckValues);
            
                  if (existingUser.rows.length > 0) {
                    return res.status(400).json({ message: "E-mail já está em uso!" });
                  }

      const query = `INSERT INTO public."User" 
                      ("nomeUsuario", email, password) 
                      VALUES ($1, $2, $3) 
                      RETURNING *`;

      const values = [nomeUsuario, email, password];
      const userPostgres = await pg.query(query, values);

      if (userPostgres.rows.length === 0) {
        return res.status(202).json({ message: "Erro ao criar usuário!" });
      }

      const idUserPostgres = userPostgres.rows[0].idUsuario;

      return res
        .status(201)
        .json({ message: "Usuário criado com sucesso!", idUserPostgres });
    } catch (error:any) {
      console.error("Erro ao criar usuário:", error.message);
      return res.status(500).json({ message: "Erro ao criar usuário", error });
    }
  }

  // Buscar todos os usuários
  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await pg.query(`SELECT * FROM "User"`);
      return res.status(200).json(users.rows);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar usuários", error });
    }
  }

  // Buscar um usuário por ID
  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const idUsuario = req.params.id;
      const users = await pg.query(
        `SELECT "nomeUsuario", "email", "password" FROM "User" WHERE "idUsuario" = $1`,
        [idUsuario]
      );
      if (users.rows.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      return res.status(200).json(users.rows);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar usuário", error });
    }
  }

  // Atualizar um usuário
  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const idUsuario = req.params.id; // Pega o ID do usuário a ser atualizado
      const { nomeUsuario, email, password } = req.body; // Campos que podem ser atualizados

      const query = `UPDATE public."User" 
                   SET "nomeUsuario" = $1, email = $2, password = $3 
                   WHERE "idUsuario" = $4 
                   RETURNING "nomeUsuario", "email", "password"`;
      const values = [nomeUsuario, email, password, idUsuario];
      const updatedUser = await pg.query(query, values);

      if (updatedUser.rows.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      return res
        .status(200)
        .json({
          message: "Usuário atualizado com sucesso!",
          updatedUser: updatedUser.rows[0],
        });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return res
        .status(500)
        .json({ message: "Erro ao atualizar usuário", error });
    }
  }

  // Excluir um usuário
  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const idUsuario = req.params.id;
      const users = await pg.query(
        `DELETE FROM "User" WHERE "idUsuario" = $1`,
        [idUsuario]
      );
      if (users.rowCount === 0) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }
      return res.status(200).json({ message: `Usuário deletado com sucesso!` });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao deletar usuário", error });
    }
  }
}

export default new CadastroController();
