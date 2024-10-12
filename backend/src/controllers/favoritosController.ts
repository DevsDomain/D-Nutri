import { Request, Response } from "express";
import User from "../models/mongo/User";
import pg from "../databases/postgres";

class FavoritosController {
  // Buscar todos os usuários
  async getFavoritos(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
      const users =
        await pg.query(`select A."nomeProduto",f."isFavorito", A."idProduto" from "Favoritos" f
        inner join "Alimentos" A
        on f."idProduto" = A."idProduto" 
        where f."idUsuario"  = ${id}
        and f."isFavorito" = true;`);
      return res.status(200).json(users.rows);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar usuários", error });
    }
  }
}

export default new FavoritosController();