import express from "express";
import createPostgresTables from "./models/postgres";
import dotenv from "dotenv";
import CreateMongoDbCollections from "./models/mongo";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;


app.use(express.json());
createPostgresTables();
CreateMongoDbCollections();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
