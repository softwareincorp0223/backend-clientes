import db from "../config/db.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import generarJWT from '../helpers/generarJWT.js';

// Obtener todos los usuarios
export const getUsuarios = (req, res) => {
    const query = 'SELECT * FROM usuarios';
    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
};

export const createUsuario = async (req, res) => {
    const { nombre_usuario, correo_usuario, password_usuario } = req.body;

    // Encriptar la contraseña
    bcrypt.hash(password_usuario, 10, async (err, hash) => { // Agregar async aquí también si usas await dentro
        if (err) throw err;

        const id = uuidv4().slice(0, 10);

        const insertUserQuery = 'INSERT INTO usuarios (usuario_id, nombre_usuario, correo_usuario, password_usuario) VALUES (?, ?, ?, ?)';
        db.query(insertUserQuery, [id, nombre_usuario, correo_usuario, hash], async (err, result) => {
            if (err) throw err;
            
            res.status(201).json({ message: 'Usuario registrado exitosamente.' });
        });
    });
};

export const updateUsuario = async (req, res) => {
    const { nombre_usuario, correo_usuario, password_usuario } = req.body;

    const updateQuery = 'UPDATE usuarios SET nombre_usuario = ?, correo_usuario = ?, password_usuario = ? WHERE usuario_id = ?';
    db.query(updateQuery, [nombre_usuario, correo_usuario, password_usuario, req.params.id], (err, updateResult) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error al editar la cuenta' });
        }

        return res.json({ mensaje: "Usuario actualizado" });
    });
};

export const deleteUsuario = async (req, res) => {
    const { id } = req.params;

    const deleteQuery = 'DELETE FROM usuarios WHERE usuario_id = ?';
    db.query(deleteQuery, [id], (err, result) => {
        if (err) throw err;

        res.json({ mensaje: "Usuario eliminado" });
    });
};

export const loginUsuario = async (req, res) => {

    const password_input = req.body.password;
    const correo_input = req.body.correo;

    // Comprobar si el usuario existe
    const query = 'SELECT * FROM usuarios WHERE correo_usuario = ?';
    db.query(query, [correo_input], async (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error del servidor' });
        }

        if (result.length === 0) {
            return res.status(400).json({ success: false, message: 'Correo no registrado' });
        }

        // Verificar la contraseña ingresada con la almacenada en la base de datos
        const validPassword = await bcrypt.compare(password_input, result[0].password_usuario);

        if (!validPassword) {
            return res.status(400).json({ success: false, message: 'Contraseña incorrecta' });
        }
        
        const { password_usuario, ...perfil } = result[0];

        return res.status(200).json({ token: generarJWT(result[0].usuario_id), perfil });
    });
};
