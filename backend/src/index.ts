import express from "express";
import connectToDatabase from "./models/connection";
import userRoutes from "./routes/userRoutes";
import foodRoutes from "./routes/foodRoutes";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", foodRoutes);

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
