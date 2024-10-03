import express from "express";
import createPostgresTables from "./models/postgres";
import CreateMongoDbCollections from "./models/mongo";
import insertUser from "./controllers/createController";
import alimentosRoutes from "./routes/alimentos"; // Caminho corrigido para ficar mais claro e organizado
import router from "./routes/alimentos";

require("dotenv").config({ path: __dirname + "/../../../.env" });

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware para parsear JSON
app.use(express.json());

// Rotas de alimentos
app.use('/api/alimentos', alimentosRoutes);

// Inicializar tabelas no Postgres e coleções no MongoDB
createPostgresTables();
CreateMongoDbCollections();

// Rotas principais
app.use(router);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
