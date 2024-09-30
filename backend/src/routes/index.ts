import express from "express";
import UserRouter from "./userRoutes";
import DataRouter from "./dataRoutes";
import DashboardRouter from "./dashboardRoutes";
import ProfileRouter from "./profileRoutes";


const router = express.Router();
router.use(UserRouter);
router.use(DataRouter);
router.use(DashboardRouter);
router.use(ProfileRouter);

export default router;