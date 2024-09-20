import express from "express";
import UserRouter from "./userRoutes";
import DataRouter from "./dataRoutes";


const router = express.Router();
router.use(UserRouter);
router.use(DataRouter);

export default router;