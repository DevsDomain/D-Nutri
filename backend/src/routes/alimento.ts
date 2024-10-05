// routes/alimentos.ts

import { Router } from "express";
import AlimentoController from "../controllers/alimentosController";

const FoodRouter = Router();

FoodRouter.post("/alimentos", AlimentoController.createAlimento);

export default FoodRouter;
