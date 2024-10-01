import express from "express";
import dashboardController from "../controllers/dashboardController";

const DashboardRouter = express.Router();

// Rotas para dados diários
//DashboardRouter.get("/data/:userId/", DataController.getDataById);
DashboardRouter.post(
  "/dashboard/:userId",
  dashboardController.getUserDataByDate
);
//DashboardRouter.delete("/data/:userId", DataController.deleteData);

export default DashboardRouter;
