import express from "express";
import DataController from "../controllers/dataController";

const DataRouter = express.Router();

// Rotas para dados diários
DataRouter.get("/data/:userId/", DataController.getDataById);
DataRouter.post("/data/:userId", DataController.createData);
DataRouter.delete("/data/:userId", DataController.deleteData);

export default DataRouter;
