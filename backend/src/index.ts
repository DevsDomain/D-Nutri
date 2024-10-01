import express from "express";
import createPostgresTables from "./models/postgres";
import router from "./routes";
import CreateMongoDbCollections from "./models/mongo";
import insertUser from "./controllers/createController";
require("dotenv").config({ path: __dirname + "/../../../.env" });
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

createPostgresTables();
CreateMongoDbCollections();
//insertUser();

app.use(router);
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
