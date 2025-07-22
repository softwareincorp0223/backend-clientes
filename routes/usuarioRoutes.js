import express from "express";
import { 
    createUsuario,
    deleteUsuario,
    getUsuarios,
    updateUsuario,
    loginUsuario
} from '../controllers/usuariosController.js'; 
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// Ruta para registrar 
router.post('/register-usuario', checkAuth,  createUsuario);
// Ruta para eliminar
router.delete('/usuario-delete/:id', checkAuth, deleteUsuario);
// Ruta para editar
router.put('/usuario-update/:id', checkAuth, updateUsuario);
// Ruta para obtener
router.get('/usuarios', checkAuth, getUsuarios);
// Ruta para obtener
router.post('/login', loginUsuario);

// Exporta el router por defecto
export default router;
