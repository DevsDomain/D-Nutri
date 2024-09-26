import express from "express";
import createPostgresTables from "./models/postgres";
import CreateMongoDbCollections from "./models/mongo";
import { routes } from "./routes";
require("dotenv").config({ path: __dirname + "/../../../.env" });
const app = express();
const PORT = parseInt(process.env.PORT || "3002", 10);

app.use(express.json());

createPostgresTables();
CreateMongoDbCollections();
//insertUser();

app.use(routes);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
