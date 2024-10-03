import mongoose from "mongoose";
require('dotenv').config({ path: __dirname + '/../../../../.env' });
const password = process.env.MG_PASS

const uri = `mongodb+srv://devsdomain88:${password}@api3visiona.ix0g9fk.mongodb.net/dbNutri`
//const uriLocal = "mongodb://localhost:27017/dnutri"
const uriLocal = "mongodb://127.0.0.1:27017/dnutri"

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
