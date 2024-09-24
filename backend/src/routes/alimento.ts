// routes/alimentos.ts

import { Router } from "express";
import { createAlimento } from "../controllers/alimentosController";

const router = Router();

router.post("/alimentos", createAlimento);

export default router;
