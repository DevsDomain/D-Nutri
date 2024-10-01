import express from "express";
import UserRouter from "./userRoutes";
import DataRouter from "./dataRoutes";
import DashboardRouter from "./dashboardRoutes";
import ProfileRouter from "./profileRoutes";
import CadastroRouter from "./cadastroRoutes";



const router = express.Router();
router.use(UserRouter);
router.use(DataRouter);
router.use(DashboardRouter);
router.use(ProfileRouter);
router.use(CadastroRouter);


export default router;