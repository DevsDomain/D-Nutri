import cors from "cors";
import { Router } from "express";
import UserRouter from "./userRoutes";
import DataRouter from "./dataRoutes";
import FoodRouter from "./alimento";
require("dotenv").config();

export const routes = Router();

routes.use(
  cors({
    origin: process.env.APP_FRONT_URL || "*", // Permitir requisições do frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
    credentials: true, // Permitir envio de cookies e headers de autenticação
  })
);
routes.use(UserRouter);
routes.use(DataRouter);
routes.use(FoodRouter);
