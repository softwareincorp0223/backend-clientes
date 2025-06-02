import express from "express";
import { 
    createCliente,
    getClientes,
    updateCliente,
    deleteCliente
} from '../controllers/clientesController.js';
import checkAuth from "../middleware/authMiddleware.js";


const router = express.Router();

// Ruta para registrar 
router.post('/register-cliente', checkAuth, createCliente);

// Ruta para Obtener datos 
router.get('/clientes', checkAuth, getClientes);

// Ruta para actualizar 
router.put('/cliente-update/:id', checkAuth, updateCliente);

// Ruta para eliminar 
router.delete('/cliente-delete/:id', checkAuth, deleteCliente);

// Exporta el router por defecto
export default router;
