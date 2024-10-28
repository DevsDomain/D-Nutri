import { Request, Response } from "express";
import User from "../models/mongo/User";
import Data from "../models/mongo/Data";
import pg from "../databases/postgres";
import moment from "moment";

class DashboardController {
  // Busca os dados do usuário com base na data fornecida
  async getUserDataByDate(req: Request, res: Response): Promise<Response> {
    try {
      const { data } = req.body;
      const { userId } = req.params;


      const data_atual = moment(data).format("YYYY-MM-DD");
      const userPG = await User.find({ idUser: userId });

      if (!userPG) {
        return res
          .status(400)
          .json({ message: "Erro ao buscar usuário no mongo!" });
      }

      let usuarioEncontrado: any | string;

      for (const usersPG of userPG) {
        let buscandoUsuario = await Data.findOne({
          data_atual: data_atual,
          usuario: usersPG?.id,
        });

        if (buscandoUsuario) {
          usuarioEncontrado = buscandoUsuario;
        }
      }

      if (!usuarioEncontrado) {
        return res
          .status(400)
          .json({ message: "Erro ao buscar usuário no dashboardController!" });
      }

      const userMongo = await User.findById(usuarioEncontrado.usuario);
      const userPotsgres = await pg.query(
        `select "nomeUsuario",peso,altura,genero,meta,"TMB" FROM "User" WHERE "idUsuario" = ${userId}`,
      );

      return res
        .status(201)
        .json({ userMG: userMongo, userPG: userPotsgres.rows[0] });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({ message: "Erro ao criar usuário", error });
    }
  }
}

export default new DashboardController();
