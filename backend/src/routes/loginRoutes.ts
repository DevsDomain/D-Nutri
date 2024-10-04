import express from "express";
import LoginController from "../controllers/loginController";

const LoginRouter = express.Router();

// Rota de login
LoginRouter.post("/login", LoginController.login);

export default LoginRouter;