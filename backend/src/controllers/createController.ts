import mongoose from "mongoose";
import User from "../models/mongo/User"

// Function to insert a new user
export default async function insertUser() {
  try {
    const newUser = new User({
      idUser:1,
      consumoAlimentos: [
        { idAlimento: 1, quantidade: 100, tipoRefeicao: "Café da manhã" },
        { idAlimento: 2, quantidade: 200, tipoRefeicao: "Almoço" },
      ],
      macroIdeal: {
        Proteina: 150,
        Caloria: 2000,
        Carboidrato: 250,
        gordura: 70,
        sodio: 2300,
        acucar: 50,
        dia: new Date(),
      },
      macroReal: {
        Proteina: 120,
        Caloria: 1800,
        Carboidrato: 220,
        gordura: 60,
        sodio: 2000,
        acucar: 45,
        dia: new Date(),
      },
      metrica: {
        ImcAtual: 22,
        TmbAtual: 1500,
        ImcIdeal: 21,
        TmbIdeal: 1450,
      },
      ingestaoAgua: {
        ingestaoIdeal: 3000,
        ingestaoAtual: 2500,
      },
      created_at: new Date(),
    });

    const savedUser = await newUser.save();
    console.log("User inserted:", savedUser);
  } catch (error) {
    console.error("Error inserting user:", error);
  } finally {
    mongoose.connection.close();
  }
}
