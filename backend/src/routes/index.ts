import UserRouter from "./userRoutes";
import DataRouter from "./dataRoutes";
import FoodRouter from "./alimento";
import ProfileRouter from "./profileRoutes";
import CadastroRouter from "./cadastroRoutes";
import DashboardRouter from "./dashboardRoutes";
import cors from "cors";
import express from "express";
import LoginRouter from "./loginRoutes";
import FavoritosRouter from "./favoritosRoute";

const router = express.Router();

router.use(cors());
router.use(UserRouter);
router.use(DataRouter);
router.use(DashboardRouter);
router.use(ProfileRouter);
router.use(CadastroRouter);
router.use(LoginRouter);
router.use(FoodRouter);
router.use(FavoritosRouter);

export default router;
