import express from "express";
import CadastroController from "../controllers/cadastroController";

const CadastroRouter = express.Router();

// Rotas para CadastroUser
CadastroRouter.post("/cadastros", CadastroController.createUser);
CadastroRouter.get("/cadastros", CadastroController.getAllUsers);
CadastroRouter.get("/cadastros/:id", CadastroController.getUserById);
CadastroRouter.put("/cadastros/:id", CadastroController.updateUser);
CadastroRouter.delete("/cadastros/:id", CadastroController.deleteUser);

export default CadastroRouter;
