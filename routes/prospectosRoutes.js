import express from "express";
import { 
    createProspecto,
    deleteProspecto,
    getProspectos,
    updateProspecto
} from '../controllers/prospectosController.js'; 
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// Ruta para registrar 
router.post('/register-prospecto', checkAuth, createProspecto);
// Ruta para eliminar
router.delete('/prospecto-delete/:id', checkAuth, deleteProspecto);
// Ruta para editar
router.put('/prospecto-update/:id', checkAuth, updateProspecto);
// Ruta para obtener
router.get('/prospectos', checkAuth, getProspectos);

// Exporta el router por defecto
export default router;
