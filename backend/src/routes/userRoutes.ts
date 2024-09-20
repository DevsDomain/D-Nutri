import express from "express";
import UserController from "../controllers/userController";

const UserRouter = express.Router();

// Rotas para User
UserRouter.post("/users", UserController.createUser);
UserRouter.get("/users", UserController.getAllUsers);
UserRouter.get("/users/:id", UserController.getUserById);
UserRouter.delete("/users/:id", UserController.deleteUser);

export default UserRouter;
