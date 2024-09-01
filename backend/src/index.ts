import express from "express";
import createPostgresTables from "./models/postgres";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;


app.use(express.json());
createPostgresTables()

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
