import express from "express";
import DataController from "../controllers/dataController";

const DataRouter = express.Router();

// Rotas para dados diários
//router.post("/data/:userId/", DataController.createData);
DataRouter.post("/data/:userId", DataController.createData);
DataRouter.delete("/data/:userId", DataController.deleteData);

export default DataRouter;
