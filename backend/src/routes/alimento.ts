// routes/alimentos.ts

import { Router } from "express";
import AlimentoController from "../controllers/alimentosController";

const FoodRouter = Router();

FoodRouter.post("/alimentos", AlimentoController.createAlimento);
FoodRouter.get("/alimentos/:id/:quantity", AlimentoController.buscarAlimentos);
FoodRouter.get(
  "/searchAlimentoByName/:id/:nomeProduto",
  AlimentoController.searchAlimentoByName
);
FoodRouter.get("/findAlimento/:barcode", AlimentoController.findAlimento);
FoodRouter.post("/addAlimento/", AlimentoController.addAlimento);
FoodRouter.post("/consumidos", AlimentoController.alimentosConsumidos);
FoodRouter.get("/favoritos/:id", AlimentoController.favoritosAlimentos);
FoodRouter.post("/addFavorito", AlimentoController.adicionarRemoverFavorito);
FoodRouter.delete(
  "/deleteConsumido",
  AlimentoController.deleteAlimentoConsumido
);

export default FoodRouter;
