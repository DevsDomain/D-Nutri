import { Router } from "express";
import AguaController from "../controllers/aguaController";

const AguaRouter = Router();

AguaRouter.put("/agua/:idUser", AguaController.updateIngestaoAgua);

export default AguaRouter;
