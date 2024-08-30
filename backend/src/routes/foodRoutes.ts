import { Router } from "express";
import { addFood } from "../controllers/foodController";

const router = Router();

router.post("/foods", addFood);

export default router;
