import express from "express";
import UserRouter from "./userRoutes";
import DataRouter from "./dataRoutes";
import DashboardRouter from "./dashboardRoutes";
import cors from 'cors'


const router = express.Router();

router.use(cors)
router.use(UserRouter);
router.use(DataRouter);
router.use(DashboardRouter);

export default router;