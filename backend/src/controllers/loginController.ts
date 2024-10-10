import { Request, Response } from "express";
import pg from "../databases/postgres";
import MetricasController from "./MetricasController";

class LoginController {
  // Método de login
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      // Verificar se o email e a senha foram fornecidos
      if (!email || !password) {
        return res.status(400).json({ message: "E-mail e senha são obrigatórios" });
      }

      // Consultar o usuário no banco de dados
      const query = `SELECT * FROM public."User" WHERE email = $1`;
      const values = [email];
      const user = await pg.query(query, values);

      // Verificar se o usuário existe
      if (user.rows.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const foundUser = user.rows[0];

      // Verificar se a senha está correta
      if (password !== foundUser.password) {
        return res.status(401).json({ message: "Senha incorreta" });
      }
      MetricasController.calculateMetricas(foundUser.idUsuario);

      // Se tudo estiver correto, retornar sucesso
      return res.status(200).json({
        message: "Login realizado com sucesso!",
        user: {
          id: foundUser.idUsuario,
          nomeUsuario: foundUser.nomeUsuario,
          email: foundUser.email,
        },
      });
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      return res.status(500).json({ message: "Erro ao realizar login", error });
    }
  }
}

export default new LoginController();