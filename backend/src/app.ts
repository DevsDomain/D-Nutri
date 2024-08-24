import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes"; // Importar rotas


// Configurar variáveis de ambiente
dotenv.config();


const app = express();

// Middlewares globais
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Definir rotas
app.use("/api/users", userRoutes);

// Middleware para erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
