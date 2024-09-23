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
      const data_atual = moment(data).format("YYYY-MM-DD");

      // VERIFICA SE O USUÁRIO EXISTE
      const userMongo = await User.findOne({ idUser: userId });
      if (!userMongo) {
        return res.status(500).json({ message: "Usuário não encontrado!" });
      }

      // VERIFICA SE JÁ EXISTE ESSA DATA PARA ESSE USUÁRIO!
      const existingData = await Data.findOne({ usuario: userMongo.id, data_atual });
      if (existingData) {
        let responseFormated = this.formatDate(existingData.data_atual);
        return res.status(200).json(responseFormated);
      }

      // INSERINDO NOVA DATA
      const novaData = await new Data({ usuario: userMongo.id, data_atual: data_atual }).save();
      // formatando retorno
      let responseFormated = this.formatDate(novaData.data_atual);



      return res.status(200).json(responseFormated);

    } catch (error: any) {
      return res.status(500).json({ message: "Erro interno", error: error.message || error });
    }
  }
  // Buscar dados diários por ID
  async getDataById(req: Request, res: Response): Promise<Response> {
    try {
      const { dataId } = req.params;
      const data = await Data.findById(dataId);

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
