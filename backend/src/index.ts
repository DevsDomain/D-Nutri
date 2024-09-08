import express from "express";
import createPostgresTables from "./models/postgres";
import dotenv from "dotenv";
import router from "./routes/userRoutes";
import CreateMongoDbCollections from "./models/mongo";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

createPostgresTables();
CreateMongoDbCollections();
//insertUser();

app.use(router)
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
