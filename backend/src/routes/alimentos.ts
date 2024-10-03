import express from 'express';
import { addAlimento, getAlimentos, getAlimentoById, updateAlimento, deleteAlimento } from '../controllers/alimentosController';

const router = express.Router();

// Rota para adicionar um novo alimento
router.post('/alimentos', addAlimento);

// Rota para buscar todos os alimentos
router.get('/alimentos', getAlimentos);

// Rota para buscar um alimento por ID
router.get('/alimentos/:id', getAlimentoById);

// Rota para atualizar um alimento por ID
router.put('/alimentos/:id', updateAlimento);

// Rota para deletar um alimento por ID
router.delete('/alimentos/:id', deleteAlimento);

export default router;
