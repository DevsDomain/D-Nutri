// routes/alimentos.ts

import { Router } from "express";
import AlimentoController from "../controllers/alimentosController";

const FoodRouter = Router();

FoodRouter.post("/alimentos", AlimentoController.createAlimento);
FoodRouter.get("/alimentos",AlimentoController.buscarAlimentos);
FoodRouter.get("/findAlimento/:barcode",AlimentoController.findAlimento);
FoodRouter.post("/addAlimento/",AlimentoController.addAlimento);
FoodRouter.post("/consumidos",AlimentoController.alimentosConsumidos);
FoodRouter.post("/favoritos/:id",AlimentoController.favoritosAlimentos);
FoodRouter.post("/addFavorito",AlimentoController.adicionarRemoverFavorito);




export default FoodRouter;
