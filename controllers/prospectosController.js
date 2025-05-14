import db from "../config/db.js";

// Obtener todos los prospectos
export const getProspectos = (req, res) => {
    const query = 'SELECT * FROM prospectos';
    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
};

export const createProspecto = async (req, res) => {
    const { prospecto_id, nombre_prospecto, correo_prospecto, telefono_prospecto, fuente_prospecto } = req.body;

    const insertUserQuery = 'INSERT INTO prospectos (prospecto_id, nombre_prospecto, correo_prospecto, telefono_prospecto, fuente_prospecto) VALUES (?, ?, ?, ?, ?)';
    db.query(insertUserQuery, [prospecto_id, nombre_prospecto, correo_prospecto, telefono_prospecto, fuente_prospecto], async (err, result) => {
        if (err) throw err;
        
        res.status(201).json({ mensaje: "Prospecto creado" });
    });
};

export const updateProspecto = async (req, res) => {
    const { nombre_prospecto, correo_prospecto, telefono_prospecto, fuente_prospecto } = req.body;

    const updateQuery = 'UPDATE prospectos SET nombre_prospecto = ?, correo_prospecto = ?, telefono_prospecto = ?, fuente_prospecto = ? WHERE prospecto_id = ?';
    db.query(updateQuery, [nombre_prospecto, correo_prospecto, telefono_prospecto, fuente_prospecto, req.params.id], (err, updateResult) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error al confirmar la cuenta' });
        }

        return res.json({ mensaje: "Prospecto actualizado" });
    });
};

export const deleteProspecto = async (req, res) => {
    const { id } = req.params;

    const deleteQuery = 'DELETE FROM prospectos WHERE prospecto_id = ?';
    db.query(deleteQuery, [id], (err, result) => {
        if (err) throw err;

        res.json({ mensaje: "Prospecto eliminado" });
    });
};
