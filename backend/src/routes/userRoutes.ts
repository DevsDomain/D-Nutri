import express from "express";
import UserController from "../controllers/userController";

const router = express.Router();

// Rotas para User
router.post("/users", UserController.createUser);
router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);
router.delete("/users/:id", UserController.deleteUser);

export default router;
