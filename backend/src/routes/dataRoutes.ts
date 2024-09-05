import express from "express";
import DataController from "../controllers/dataController";

const router = express.Router();

// Rotas para dados diários
router.post("/users/:userId/data", DataController.createData);
router.get("/users/:userId/data", DataController.getAllData);
router.get("/users/:userId/data/:dataId", DataController.getDataById);
router.put("/users/:userId/data/:dataId", DataController.updateData);
router.delete("/users/:userId/data/:dataId", DataController.deleteData);

export default router;
