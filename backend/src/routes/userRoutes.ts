import express from "express";
import UserController from "../controllers/userController";

const router = express.Router();

// Rotas para User
router.post("/users", UserController.createUser);
router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

// Rotas para Data (dados diários)
router.post("/users/:userId/data", UserController.createDailyData);
router.get("/users/:userId/data", UserController.getDailyData);

export default router;
