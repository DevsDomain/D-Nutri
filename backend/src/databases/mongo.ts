import mongoose from "mongoose";
require('dotenv').config({ path: __dirname + '/../../../../.env' });
const user = process.env.MG_USER
const password = process.env.MG_PASS
const db = process.env.MG_DB
const myHost = process.env.HOST


const uri = `mongodb://${user}:${password}@${myHost}/${db}`;
const uriLocal = "mongodb://localhost:27017/dnutri"

export default function connectToDatabase() {
  mongoose.connection.on("connected", () => console.log("Mongo conectado com sucesso!"));
  mongoose.connection.on("disconnected", () => console.log("Mongo Desconectado com sucesso!"));


  mongoose.connect(uriLocal, {
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 10,
    serverApi: { version: '1', strict: true, deprecationErrors: true }
  })
    .catch((e) => {
      console.error("Connection Failed", e.message)
    })

  process.on("SIGINT", async () => {
    try {
      console.log("Connection closed");
      await mongoose.connection.close();
      process.exit(0);
    }
    catch (error) {
      console.error("Problems to close the connection", error);
      process.exit(1);
    }
  })
}
