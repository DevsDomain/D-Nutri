import { Request, Response } from "express";
import pg from '../databases/postgres'
import Data from "../models/mongo/Data";
import User from "../models/mongo/User";
import moment from 'moment';

class DataController {

  public dayOfTheWeek = (day: number): string => {
    switch (day) {
      case 0:
        return "Dom";
      case 1:
        return "Seg";
      case 2:
        return "Ter";
      case 3:
        return "Qua";
      case 4:
        return "Qui";
      case 5:
        return "Sex";
      case 6:
        return "Sab";
      default:
        return "";
    }
  }

  public formatDate = (date: Date): string => {
    let resData = moment.utc(date).format("DD-MM")
    let day = moment.utc(date).day();
    let week = this.dayOfTheWeek(day);
    const responseFormated = `${week}\n${resData}`
    return responseFormated;
  }

  // Criar novos dados diários para um usuário
  createData = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userId } = req.params;
      const { data } = req.body
      const data_atual = moment(data).format("YYYY-MM-DD")
      console.log("RECEBIDO!",data_atual,userId)

      // VERIFICA SE O USUÁRIO EXISTE NA TABELA POSTGRESQL
      const users = await pg.query(`SELECT * FROM "User" WHERE "idUsuario" = $1`, [userId]);
      if (users.rows.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const userData = await new User({
        idUser: userId,
        consumoAlimentos: [],
        macroIdeal: {
          Proteina: 300,
          Caloria: 300,
          Carboidrato: 300,
          gordura: 300,
          sodio: 300,
          acucar: 300,
        },
        macroReal: {
          Proteina: 0,
          Caloria: 0,
          Carboidrato: 0,
          gordura: 0,
          sodio: 0,
          acucar: 0,
        },
        metrica: {
          ImcAtual: 0,
          TmbAtual: 0,
          ImcIdeal: 0,
          TmbIdeal: 0,
        },
        ingestaoAgua: {
          ingestaoIdeal: 3000,
          ingestaoAtual: 0,
        },
      }).save();

      // INSERINDO NOVA DATA
      const novaData = await new Data({ usuario: userData.id, data_atual: data_atual }).save();
      // formatando retorno
      let responseFormated = this.formatDate(novaData.data_atual);
      const response = { data: responseFormated, user: userData }


      console.log("RESPONSE",response)
      return res.status(200).json(response);

    } catch (error: any) {
      return res.status(500).json({ message: "Erro interno", error: error.message || error });
    }
  }
  // Carrega histórico dos dados por usuário
  async getDataById(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const user = await User.findOne({ idUser: userId });
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      const data = await Data.find({ usuario: user.id });

      if (!data) {
        return res.status(404).json({ message: "Dados não encontrados" });
      }

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar dados", error });
    }
  }

  // Atualizar dados diários
  async updateData(req: Request, res: Response): Promise<Response> {
    try {
      const { dataId } = req.params;
      const data = await Data.findByIdAndUpdate(dataId, req.body, {
        new: true,
      });

      if (!data) {
        return res.status(404).json({ message: "Dados não encontrados" });
      }

      return res
        .status(200)
        .json({ message: "Dados atualizados com sucesso", data });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao atualizar dados", error });
    }
  }

  // Excluir dados diários
  async deleteData(req: Request, res: Response): Promise<Response> {
    try {
      const { dataId } = req.params;
      const data = await Data.findByIdAndDelete(dataId);

      if (!data) {
        return res.status(404).json({ message: "Dados não encontrados" });
      }

      return res.status(200).json({ message: "Dados excluídos com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao excluir dados", error });
    }
  }




}

export default new DataController();
