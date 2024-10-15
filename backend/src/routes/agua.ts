import { Router } from "express";
import AguaController from "../controllers/aguaController";

const AguaRouter = Router();

// Rota para criar novo registro de ingestão de água
AguaRouter.post("/agua/:idUser", AguaController.aguaIncremento);

// Rota para buscar histórico de ingestão de água de um usuário
AguaRouter.get("/agua/:idUser", AguaController.getWaterIntake);

// Rota para atualizar registro de ingestão de água
AguaRouter.put("/agua/:idUser", AguaController.updateWater);

// Rota para deletar registro de ingestão de água
AguaRouter.delete("/agua/:idUser", AguaController.deleteWater);

export default AguaRouter;