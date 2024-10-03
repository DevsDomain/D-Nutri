import express from 'express';
import { addFavorito, removeFavorito, getFavoritos } from '../../../backend/src/controllers/favoritosCntroller';

const router = express.Router();

// Rota para adicionar um favorito
router.post('/favoritos', addFavorito);

// Rota para remover um favorito
router.delete('/favoritos', removeFavorito);

// Rota para obter todos os favoritos de um usuário
router.get('/favoritos/:idUsuario', getFavoritos);

export default router;
