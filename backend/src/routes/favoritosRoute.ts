import { Router } from "express";
import FavoritosController from "../controllers/favoritosController";

const FavoritosRouter = Router();

FavoritosRouter.post("/FavAlimento/:id",FavoritosController.getFavoritos);


export default FavoritosRouter;
