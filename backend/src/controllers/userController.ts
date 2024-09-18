import { Request, Response } from "express";
import User from "../models/mongo/User"; 
import Data from "../models/mongo/Data";
import pg from '../databases/postgres'

class UserController {
  // Criar um novo usuário
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { nomeUsuario, email, password, peso, altura, genero, meta, TMB } = req.body;
      console.log(nomeUsuario, email, password, peso, altura, genero, meta, TMB);

      const query = `INSERT INTO public."User" 
                      ("nomeUsuario", email, password, peso, altura, genero, meta, "TMB") 
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
                      RETURNING *`;

      const values = [nomeUsuario, email, password, peso, altura, genero, meta, TMB];
      const userPostgres = await pg.query(query, values);

      if (userPostgres.rows.length === 0) {
        return res.status(202).json({ message: "Erro ao criar usuário!" });
      }

      return res.status(201).json({ message: "Usuário criado com sucesso!", user: userPostgres.rows[0] });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
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
    const idUsuario  = req.params.id
      const users = await pg.query(`SELECT * FROM "User" WHERE "idUsuario" = $1`,[idUsuario]);
      if (users.rows.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      return res.status(200).json(users.rows);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar usuário", error });
    }
  }


  // Excluir um usuário
  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const idUsuario  = req.params.id
        const users = await pg.query(`DELETE FROM "User" WHERE "idUsuario" = $1`,[idUsuario]);
        if (users.rowCount === 0) {
          return res.status(404).json({ message: "Usuário não encontrado!"});
        }
        return res.status(200).json({message:`Usuario deletado com sucesso! ${users.rows}`});
      } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar usuário", error });
      }
    }


}

export default new UserController();
