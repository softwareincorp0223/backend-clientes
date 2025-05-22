import express from "express";
import { 
    createUsuario,
    deleteUsuario,
    getUsuarios,
    updateUsuario,
    loginUsuario
} from '../controllers/usuariosController.js'; 

const router = express.Router();

// Ruta para registrar 
router.post('/register-usuario', createUsuario);
// Ruta para eliminar
router.delete('/usuario-delete/:id', deleteUsuario);
// Ruta para editar
router.put('/usuario-update/:id', updateUsuario);
// Ruta para obtener
router.get('/usuarios', getUsuarios);
// Ruta para obtener
router.post('/login', loginUsuario);

// Exporta el router por defecto
export default router;
