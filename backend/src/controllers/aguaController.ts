import { Request, Response } from "express";
import User from "../models/mongo/User";
import Data from "../models/mongo/Data";
import pg from "../databases/postgres";
import moment from "moment";

const updateIngestaoAgua = async (req: Request, res: Response) => {
  const { idUser } = req.params;
  const { quantidadeAgua, data } = req.body;

  try {
    const data_atual = moment(data).format("YYYY-MM-DD");
    const userPG = await User.find({ idUser });

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
    const userPostgres = await pg.query(
      `SELECT "idUsuario" FROM "User" WHERE "idUsuario" = $1`,
      [userMongo?.idUser]
    );

    if (userPostgres.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Usuário não encontrado no PostgreSQL!" });
    }

    // Atualização da ingestão de água
    const user = await User.findOneAndUpdate(
      { idUser },
      { $set: { "ingestaoAgua.ingestaoAtual": quantidadeAgua } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao atualizar ingestão de água", error });
  }
};

export default { updateIngestaoAgua };
