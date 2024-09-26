import cors from "cors";
import { Router } from "express";
import UserRouter from "./userRoutes";
import DataRouter from "./dataRoutes";
import FoodRouter from "./alimento";

export const routes = Router();

routes.use(
  cors({
    origin: "http://192.168.0.130:8081", // Permitir requisições do frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
    credentials: true, // Permitir envio de cookies e headers de autenticação
  })
);
routes.use(UserRouter);
routes.use(DataRouter);
routes.use(FoodRouter);
