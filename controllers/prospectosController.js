import db from "../config/db.js";
import { v4 as uuidv4 } from 'uuid';

// Obtener todos los prospectos
export const getProspectos = (req, res) => {
    const query = 'SELECT * FROM prospectos';
    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
};

export const createProspecto = async (req, res) => {
    const { nombre_prospecto, correo_prospecto, telefono_prospecto, fuente_prospecto } = req.body;
    
    const id = uuidv4().slice(0, 10);

    const insertUserQuery = 'INSERT INTO prospectos (prospecto_id, nombre_prospecto, correo_prospecto, telefono_prospecto, fuente_prospecto) VALUES (?, ?, ?, ?, ?)';
    db.query(insertUserQuery, [id, nombre_prospecto, correo_prospecto, telefono_prospecto, fuente_prospecto], async (err, result) => {
        if (err) throw err;
        
        res.status(201).json({ type: "success", mensaje: "Prospecto creado" });
    });
};

export const updateProspecto = async (req, res) => {
    const { nombre_prospecto, correo_prospecto, telefono_prospecto, fuente_prospecto } = req.body;

    const updateQuery = 'UPDATE prospectos SET nombre_prospecto = ?, correo_prospecto = ?, telefono_prospecto = ?, fuente_prospecto = ? WHERE prospecto_id = ?';
    db.query(updateQuery, [nombre_prospecto, correo_prospecto, telefono_prospecto, fuente_prospecto, req.params.id], (err, updateResult) => {
        if (err) throw err;

        res.status(201).json({ type: "success", mensaje: "Prospecto actualizado" });
    });
};

export const deleteProspecto = async (req, res) => {
    const { id } = req.params;

    const deleteQuery = 'DELETE FROM prospectos WHERE prospecto_id = ?';
    db.query(deleteQuery, [id], (err, result) => {
        if (err) throw err;

        res.status(201).json({ type: "success", mensaje: "Prospecto eliminado" });
    });
};
