// controllers/alimentosController.ts

import { Request, Response } from "express";
import pg from "../databases/postgres";
import moment from "moment";
import User from "../models/mongo/User";
import Data from "../models/mongo/Data";

// Função para lidar com as operações relacionadas a Alimentos
class AlimentosController {
  async buscarAlimentos(req: Request, res: Response): Promise<Response> {
    const { id, quantity } = req.params; // Capturando o idUsuario dinamicamente

    const alimentos = await pg.query(`
    SELECT DISTINCT A."nomeProduto", A."idProduto" ,A.barcode,A."Proteina",A."Caloria", A."Carboidrato", A.gordura, A.sodio, A.acucar,
     CASE 
        WHEN f."isFavorito" IS NOT NULL THEN true 
        ELSE false 
    END AS "isFavorito"
        FROM "Favoritos" f
        right JOIN "Alimentos" A ON f."idProduto" = A."idProduto"
        WHERE A."nomeProduto" is not null and (f."idUsuario" = ${id} or F."idUsuario" is null)
        LIMIT ${quantity}`);
    return res.status(201).json(alimentos.rows);
  }

  async findAlimento(req: Request, res: Response): Promise<Response> {
    try {
      console.log("RECEBIDO");
      const { barcode } = req.params;
      console.log(barcode, "BARCODE BACK");

      const alimentos = await pg.query(
        `SELECT * FROM "Alimentos" WHERE "barcode" = $1`,
        [barcode]
      );
      console.log(alimentos.rows);
      if (alimentos.rows.length > 0) {
        return res.status(201).json(alimentos.rows[0]);
      } else {
        return res.status(204).json({ message: "Alimento não encontrado" });
      }
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }

  async searchAlimentoByName(req: Request, res: Response): Promise<Response> {
    try {
      const { id, nomeProduto } = req.params;

      const alimentos = await pg.query(
        ` SELECT DISTINCT A."nomeProduto", A."idProduto" ,A.barcode,A."Proteina",A."Caloria", A."Carboidrato", A.gordura, A.sodio, A.acucar,
     CASE 
        WHEN f."isFavorito" IS NOT NULL THEN true 
        ELSE false 
    END AS "isFavorito"
        FROM "Favoritos" f
        right JOIN "Alimentos" A ON f."idProduto" = A."idProduto"
        WHERE A."nomeProduto" LIKE '%${nomeProduto}%' and (f."idUsuario" = ${id} or F."idUsuario" is null)`
      );
      if (alimentos.rows.length > 0) {
        return res.status(201).json(alimentos.rows);
      } else {
        return res.status(204).json({ message: "Alimento não encontrado" });
      }
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }

  // Inserir alimento na tabela "Alimentos"
  async createAlimento(req: Request, res: Response): Promise<Response> {
    const { data } = req.body;

    const {
      barcode,
      nomeProduto,
      imageSrc,
      Proteina,
      Caloria,
      Carboidrato,
      gordura,
      sodio,
      acucar,
    } = data;

    try {
      const result = await pg.query(
        `
        INSERT INTO "Alimentos" (barcode, "nomeProduto", "imageSrc", "Proteina", "Caloria", "Carboidrato", "gordura", "sodio", "acucar")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;
      `,
        [
          barcode,
          nomeProduto,
          imageSrc,
          Proteina,
          Caloria,
          Carboidrato,
          gordura,
          sodio,
          acucar,
        ]
      );

      return res.status(201).json({
        message: "Alimento inserido com sucesso",
        alimento: result.rows[0],
      });
    } catch (error: any) {
      console.error("Erro ao inserir alimento:", error);
      return res.status(500).json({
        message: "Erro ao inserir alimento",
        error: error.message,
      });
    }
  }

  // Listar todos os alimentos
  async getAllAlimentos(req: Request, res: Response): Promise<Response> {
    try {
      const result =
        await pg.query(`SELECT distinct "nomeProduto","idProduto", barcode, "imageSrc", "Proteina", "Caloria", "Carboidrato", gordura, sodio, acucar
FROM public."Alimentos" where "nomeProduto" is not null order by "nomeProduto" ;

"`);
      return res.status(200).json({
        message: "Lista de alimentos",
        alimentos: result.rows,
      });
    } catch (error: any) {
      console.error("Erro ao listar alimentos:", error);
      return res.status(500).json({
        message: "Erro ao listar alimentos",
        error: error.message,
      });
    }
  }

  // Obter um alimento pelo ID
  async getAlimentoById(req: Request, res: Response): Promise<Response> {
    const { idProduto } = req.params;

    try {
      const result = await pg.query(
        `SELECT * FROM "Alimentos" WHERE "idProduto" = $1`,
        [idProduto]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Alimento não encontrado" });
      }

      return res.status(200).json({
        message: "Alimento encontrado",
        alimento: result.rows[0],
      });
    } catch (error: any) {
      console.error("Erro ao obter alimento:", error);
      return res.status(500).json({
        message: "Erro ao obter alimento",
        error: error.message,
      });
    }
  }

  // Atualizar um alimento pelo ID
  async updateAlimento(req: Request, res: Response): Promise<Response> {
    const { idProduto } = req.params;
    const {
      barcode,
      nomeProduto,
      imageSrc,
      Proteina,
      Caloria,
      Carboidrato,
      gordura,
      sodio,
      acucar,
    } = req.body;

    try {
      const result = await pg.query(
        `
        UPDATE "Alimentos"
        SET barcode = $1, "nomeProduto" = $2, "imageSrc" = $3, "Proteina" = $4, "Caloria" = $5, "Carboidrato" = $6, "gordura" = $7, "sodio" = $8, "acucar" = $9
        WHERE "idProduto" = $10
        RETURNING *;
      `,
        [
          barcode,
          nomeProduto,
          imageSrc,
          Proteina,
          Caloria,
          Carboidrato,
          gordura,
          sodio,
          acucar,
          idProduto,
        ]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Alimento não encontrado" });
      }

      return res.status(200).json({
        message: "Alimento atualizado com sucesso",
        alimento: result.rows[0],
      });
    } catch (error: any) {
      console.error("Erro ao atualizar alimento:", error);
      return res.status(500).json({
        message: "Erro ao atualizar alimento",
        error: error.message,
      });
    }
  }

  // Excluir um alimento pelo ID
  async deleteAlimento(req: Request, res: Response): Promise<Response> {
    const { idProduto } = req.params;

    try {
      const result = await pg.query(
        `DELETE FROM "Alimentos" WHERE "idProduto" = $1 RETURNING *;`,
        [idProduto]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Alimento não encontrado" });
      }

      return res.status(200).json({
        message: "Alimento excluído com sucesso",
        alimento: result.rows[0],
      });
    } catch (error: any) {
      console.error("Erro ao excluir alimento:", error);
      return res.status(500).json({
        message: "Erro ao excluir alimento",
        error: error.message,
      });
    }
  }

  async addAlimento(req: Request, res: Response): Promise<Response> {
    try {
      const { data } = req.body;
      const {
        idProduto,
        barcode,
        nomeProduto,
        Proteina,
        Caloria,
        Carboidrato,
        gordura,
        sodio,
        acucar,
        idUser,
        date,
        meal,
        quantidade,
      } = data;

      // Convertendo valores que vêm como strings para números
      const proteinaNum = parseFloat(Proteina);
      const caloriaNum = parseFloat(Caloria);
      const carboidratoNum = parseFloat(Carboidrato);
      const gorduraNum = parseFloat(gordura);
      const sodioNum = parseFloat(sodio);
      const acucarNum = parseFloat(acucar);
      const quantidadeNum = parseFloat(quantidade);

      const formattedDate = date.replace(/['"]+/g, ""); // Remove aspas extras
      const data_atual = moment(formattedDate).format("YYYY-MM-DD");
      const userMG = await User.find({ idUser: idUser });

      if (!userMG) {
        return res
          .status(400)
          .json({ message: "Erro ao buscar usuário no mongo!" });
      }

      let usuarioEncontrado: any | string;

      for (const usersPG of userMG) {
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
          .json({ message: "Erro ao buscar usuário nessa data!" });
      }

      const userMongo = await User.findById(usuarioEncontrado.usuario);

      if (userMongo) {
        userMongo.macroReal.Caloria += caloriaNum;
        userMongo.macroReal.Carboidrato += carboidratoNum;
        userMongo.macroReal.Proteina += proteinaNum;
        userMongo.macroReal.acucar += acucarNum;
        userMongo.macroReal.gordura += gorduraNum;
        userMongo.macroReal.sodio += sodioNum;
        userMongo.consumoAlimentos.push({
          idAlimento: idProduto,
          quantidade: quantidadeNum,
          tipoRefeicao: meal,
        });
        userMongo.save();
      }

      return res.status(201).json({
        message: "Alimento recebido com sucesso",
        userMongo: userMongo,
      });
    } catch (error: any) {
      console.error("Erro ao adicionar alimento:", error);
      return res.status(500).json({
        message: "Erro ao adicionar alimento",
        error: error.message,
      });
    }
  }

  async alimentosConsumidos(req: Request, res: Response): Promise<Response> {
    try {
      console.log(req.body, "BODY");
      const { idUser, date } = req.body;

      const userMG = await User.find({ idUser: idUser });

      if (!userMG) {
        return res
          .status(400)
          .json({ message: "Erro ao buscar usuário no mongo!" });
      }

      let usuarioEncontrado: any | string;

      for (const usersPG of userMG) {
        let buscandoUsuario = await Data.findOne({
          data_atual: date,
          usuario: usersPG?.id,
        });
        if (buscandoUsuario) {
          usuarioEncontrado = buscandoUsuario;
        }
      }

      if (!usuarioEncontrado) {
        return res
          .status(400)
          .json({ message: "Erro ao buscar usuário nessa data!" });
      }

      const userMongo = await User.findById(usuarioEncontrado.usuario);
      const alimentosConsumidosArray: any[] = [];
      if (userMongo) {
        const alimentosConsumidos = userMongo.consumoAlimentos;
        for (const alimentos of alimentosConsumidos) {
          const result = await pg.query(
            `SELECT "idProduto", "nomeProduto", "Proteina", "Caloria", "Carboidrato", gordura, sodio, acucar, 
            $2 as tipoRefeicao, $3 as quantidade FROM public."Alimentos" where "idProduto" = $1`,
            [alimentos.idAlimento, alimentos.tipoRefeicao, alimentos.quantidade]
          );
          if (result.rows[0]) {
            alimentosConsumidosArray.push(result.rows[0]);
          }
        }

        return res.status(202).json(alimentosConsumidosArray);
      }
    } catch (error: any) {
      console.error("ERRO AO BUSCAR ALIMENTOS CONSUMIDOS:", error.message);
      return res.status(404).json({ ERRO: error.message });
    }
    return res.status(404).json("ERRO");
  }

  // Buscar alimentos favoritos
  async favoritosAlimentos(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params; // Capturando o idUsuario dinamicamente

      const query = `
        SELECT DISTINCT A."nomeProduto", f."isFavorito"
        FROM "Favoritos" f
        INNER JOIN "Alimentos" A ON f."idProduto" = A."idProduto"
        WHERE f."idUsuario" = $1 AND f."isFavorito" = true
      `;

      const values = [id]; // Passando os parâmetros de forma segura
      const alimentosFavoritos = await pg.query(query, values);
      console.log(alimentosFavoritos);

      if (alimentosFavoritos.rows.length === 0) {
        return res
          .status(404)
          .json({ message: "Nenhum alimento favorito encontrado." });
      }

      return res.status(200).json(alimentosFavoritos.rows);
    } catch (error: any) {
      console.error("Erro ao buscar alimentos favoritos:", error.message);
      return res.status(500).json({
        message: "Erro ao buscar alimentos favoritos",
        error: error.message,
      });
    }
  }

  // Add e Remove Favoritos
  async adicionarRemoverFavorito(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { idProduto, idUsuario, isFavorito } = req.body;

      // Verifica se o favorito já existe no banco de dados
      const checkFavoriteQuery = `
      SELECT * FROM public."Favoritos"
      WHERE "idProduto" = $1 AND "idUsuario" = $2
    `;
      const checkValues = [idProduto, idUsuario];
      const result = await pg.query(checkFavoriteQuery, checkValues);

      if (result.rows.length > 0) {
        // Se o item já está nos favoritos e o usuário deseja remover (isFavorito = false)
        if (!isFavorito) {
          const deleteQuery = `
          DELETE FROM public."Favoritos"
          WHERE "idProduto" = $1 AND "idUsuario" = $2
        `;
          await pg.query(deleteQuery, checkValues);
          return res
            .status(200)
            .json({ message: "Favorito removido com sucesso!" });
        } else {
          // Se o item já está favoritado e o usuário não alterou o estado, não faz nada
          return res
            .status(200)
            .json({ message: "Este item já está nos favoritos." });
        }
      } else {
        // Se o item não está nos favoritos e o usuário deseja adicioná-lo (isFavorito = true)
        if (isFavorito) {
          const insertQuery = `
          INSERT INTO public."Favoritos" ("idProduto", "idUsuario", "isFavorito")
          VALUES ($1, $2, $3)
        `;
          const insertValues = [idProduto, idUsuario, isFavorito];
          await pg.query(insertQuery, insertValues);
          return res
            .status(201)
            .json({ message: "Favorito adicionado com sucesso!" });
        } else {
          // Se o item não está favoritado e o usuário deseja removê-lo, mas ele já não existe, não faz nada
          return res
            .status(200)
            .json({ message: "O item não estava nos favoritos." });
        }
      }
    } catch (error: any) {
      console.error("Erro ao atualizar favoritos:", error.message);
      return res.status(500).json({
        message: "Erro ao atualizar favoritos",
        error: error.message,
      });
    }
  }

  // Excluir um alimento consumido pelo ID do produto e pelo ID do usuário
  async deleteAlimentoConsumido(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { idUser, idProduto } = req.body;

    try {
      // Busca o usuário no MongoDB
      const userMongo = await User.findOne({ idUser: idUser });

      if (!userMongo) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      // Filtra o alimento consumido que possui o idProduto informado
      const alimentoIndex = userMongo.consumoAlimentos.findIndex(
        (alimento) => alimento.idAlimento === idProduto
      );

      if (alimentoIndex === -1) {
        return res
          .status(404)
          .json({ message: "Alimento não encontrado nos consumidos." });
      }

      // Remove o alimento consumido da lista
      const [alimentoRemovido] = userMongo.consumoAlimentos.splice(
        alimentoIndex,
        1
      );

      // Busca o alimento específico no banco de dados Postgres
      const result = await pg.query(
        `SELECT "Proteina", "Caloria", "Carboidrato", gordura, sodio, acucar 
         FROM public."Alimentos" WHERE "idProduto" = $1`,
        [idProduto]
      );

      if (!result.rows[0]) {
        return res
          .status(404)
          .json({ message: "Alimento não encontrado no banco de dados." });
      }

      const alimentoDB = result.rows[0];

      // Calcula os macros a serem subtraídos com base na quantidade removida
      userMongo.macroReal.Caloria -=
        alimentoDB.Caloria * alimentoRemovido.quantidade;
      userMongo.macroReal.Carboidrato -=
        alimentoDB.Carboidrato * alimentoRemovido.quantidade;
      userMongo.macroReal.Proteina -=
        alimentoDB.Proteina * alimentoRemovido.quantidade;
      userMongo.macroReal.acucar -=
        alimentoDB.acucar * alimentoRemovido.quantidade;
      userMongo.macroReal.gordura -=
        alimentoDB.gordura * alimentoRemovido.quantidade;
      userMongo.macroReal.sodio -=
        alimentoDB.sodio * alimentoRemovido.quantidade;

      // Salva a atualização no MongoDB
      await userMongo.save();

      return res.status(200).json({
        message: "Alimento consumido excluído com sucesso.",
        alimentoRemovido: alimentoRemovido,
      });
    } catch (error: any) {
      console.error("Erro ao excluir alimento consumido:", error);
      return res.status(500).json({
        message: "Erro ao excluir alimento consumido.",
        error: error.message,
      });
    }
  }
}

export default new AlimentosController();
