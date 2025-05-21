import express from "express";
import { 
    createCliente,
    getClientes,
    updateCliente,
    deleteCliente
} from '../controllers/clientesController.js'; 

const router = express.Router();

// Ruta para registrar 
router.post('/register-cliente', createCliente);

// Ruta para Obtener datos 
router.get('/clientes', getClientes);

// Ruta para actualizar 
router.put('/cliente-update/:id', updateCliente);

// Ruta para eliminar 
router.delete('/cliente-delete/:id', deleteCliente);

// Exporta el router por defecto
export default router;
