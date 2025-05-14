import express from "express";
import { 
    createProspecto,
    deleteProspecto,
    getProspectos,
    updateProspecto
} from '../controllers/prospectosController.js'; 

const router = express.Router();

// Ruta para registrar 
router.post('/register-prospecto', createProspecto);
// Ruta para eliminar
router.delete('/prospecto-delete/:id', deleteProspecto);
// Ruta para editar
router.put('/prospecto-update/:id', updateProspecto);
// Ruta para obtener
router.get('/prospectos', getProspectos);

// Exporta el router por defecto
export default router;
