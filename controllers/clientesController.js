import db from "../config/db.js";
import { v4 as uuidv4 } from 'uuid';

// Obtener todos los clientes
export const getClientes = (req, res) => {
    const query = 'SELECT * FROM clientes';
    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
};

export const createCliente = async (req, res) => {
    const { cliente_id , prospecto_sid, cotizacion_cliente, notas_cliente, fecha_conversion_cliente } = req.body;

    const id = uuidv4().slice(0, 10);

    const insertUserQuery = 'INSERT INTO clientes (cliente_id, prospecto_sid, cotizacion_cliente, notas_cliente, fecha_conversion_cliente) VALUES (?, ?, ?, ?, ?)';
    db.query(insertUserQuery, [id, prospecto_sid, cotizacion_cliente, notas_cliente, fecha_conversion_cliente], async (err, result) => {
        if (err) throw err;
        
        res.status(201).json({ type: "success", mensaje: "Cliente creado" });

    });
};

export const updateCliente = async (req, res) => {
    const { prospecto_sid, cotizacion_cliente, notas_cliente, fecha_conversion_cliente } = req.body;

    const updateQuery = 'UPDATE clientes SET prospecto_sid = ?, cotizacion_cliente = ?, notas_cliente = ?, fecha_conversion_cliente = ? WHERE cliente_id  = ?';
    db.query(updateQuery, [prospecto_sid, cotizacion_cliente, notas_cliente, fecha_conversion_cliente, req.params.id], (err, updateResult) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error al confirmar la cuenta' });
        }

        return res.json({ mensaje: "Cliente actualizado" });
    });
};

export const deleteCliente = async (req, res) => {
    const { id } = req.params;

    const deleteQuery = 'DELETE FROM clientes WHERE cliente_id = ?';
    db.query(deleteQuery, [id], (err, result) => {
        if (err) throw err;

        res.json({ mensaje: "Cliente eliminado" });
    });
};