import UserRouter from "./userRoutes";
import DataRouter from "./dataRoutes";
import FoodRouter from "./alimento";
import ProfileRouter from "./profileRoutes";
import editProfileController from "./editProfileRoutes";
import CadastroRouter from "./cadastroRoutes";
import DashboardRouter from "./dashboardRoutes";
import cors from "cors";
import express from "express";
import LoginRouter from "./loginRoutes";
import AguaRouter from "./agua";
import ProcessImage from "./processImage";

const router = express.Router();

router.use(cors());
router.use(UserRouter);
router.use(DataRouter);
router.use(DashboardRouter);
router.use(ProfileRouter);
router.use(editProfileController);
router.use(CadastroRouter);
router.use(LoginRouter);
router.use(FoodRouter);
router.use(AguaRouter);
router.use(ProcessImage);

export default router;
