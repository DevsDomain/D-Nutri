import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Dnutri");
    console.log("MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB", error);
    process.exit(1); // Sair do processo em caso de falha na conexão
  }
};

export default connectToDatabase;