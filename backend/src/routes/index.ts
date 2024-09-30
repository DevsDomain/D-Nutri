import express from "express";
import UserRouter from "./userRoutes";
import DataRouter from "./dataRoutes";
import DashboardRouter from "./dashboardRoutes";


const router = express.Router();
router.use(UserRouter);
router.use(DataRouter);
router.use(DashboardRouter);

export default router;