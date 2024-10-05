import UserRouter from "./userRoutes";
import DataRouter from "./dataRoutes";
import FoodRouter from "./alimento";
import ProfileRouter from "./profileRoutes";
import CadastroRouter from "./cadastroRoutes";
import DashboardRouter from "./dashboardRoutes";
import cors from "cors";
import express from "express";

const router = express.Router();

router.use(cors());
router.use(UserRouter);
router.use(DataRouter);
router.use(DashboardRouter);
router.use(ProfileRouter);
router.use(CadastroRouter);
router.use(FoodRouter);

export default router;
