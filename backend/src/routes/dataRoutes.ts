import express from "express";
import DataController from "../controllers/dataController";

const DataRouter = express.Router();

// Rotas para dados diários
DataRouter.post("/users/:userId/data", DataController.createData);
DataRouter.get("/users/:userId/data", DataController.getAllData);
DataRouter.get("/users/:userId/data/:dataId", DataController.getDataById);
DataRouter.put("/users/:userId/data/:dataId", DataController.updateData);
DataRouter.delete("/users/:userId/data/:dataId", DataController.deleteData);

export default DataRouter;
