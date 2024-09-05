import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
const user = process.env.MG_USER
const password = process.env.MG_PASS 
const db = process.env.MG_DB   
const myHost = process.env.HOST
const connectToDatabase = async () => {
  try {
    await mongoose.connect(`mongodb://${user}:${password}@${myHost}:27017/${db}`);
    console.log("Conectado ao MongoDB");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB", error);
    process.exit(1); // Sair do processo em caso de falha na conexão
  } 
};

export default connectToDatabase;

