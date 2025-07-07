import db from "../config/db.js";
import { v4 as uuidv4 } from 'uuid';

// Obtener todos los clientes
export const getClientes = (req, res) => {
  const query = 'SELECT clientes.*, prospectos.nombre_prospecto FROM clientes INNER JOIN prospectos ON clientes.prospecto_sid = prospectos.prospecto_id';
  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

export const createCliente = async (req, res) => {

  try {
    const { prospecto_sid, notas_cliente } = req.body;
    const archivo = req.file;
    console.log(req.file);

    if (!archivo) {
      return res.status(400).json({ type: 'error', mensaje: 'El archivo PDF es obligatorio' });
    }

    const rutaCotizacion = archivo.filename; // o archivo.path si quieres ruta completa
    const cliente_id = uuidv4().slice(0, 10);

    console.log(rutaCotizacion);

    const insertQuery =
      'INSERT INTO clientes (cliente_id, prospecto_sid, cotizacion_cliente, notas_cliente) VALUES (?, ?, ?, ?)';

    db.query(insertQuery, [cliente_id, prospecto_sid, rutaCotizacion, notas_cliente], (err, result) => {
      if (err) throw err;

      res.status(201).json({ type: 'success', mensaje: 'Cliente creado con archivo PDF' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ type: 'error', mensaje: 'Error al registrar cliente' });
  }
};



// export const updateCliente = async (req, res) => {
//   const { prospecto_sid, notas_cliente } = req.body;

//   const updateQuery = 'UPDATE clientes SET prospecto_sid = ?, notas_cliente = ? WHERE cliente_id  = ?';
//   db.query(updateQuery, [prospecto_sid, notas_cliente, req.params.id], (err, updateResult) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ success: false, message: 'Error al confirmar cliente' });
//     }

//     return res.json({ mensaje: "Cliente actualizado" });
//   });
// };

export const updateCliente = async (req, res) => {
    const { prospecto_sid, notas_cliente } = req.body;
    const archivo = req.file;

    const campos = ['prospecto_sid = ?', 'notas_cliente = ?'];
    const valores = [prospecto_sid, notas_cliente];

    if (archivo) {
        campos.push('cotizacion_cliente = ?');
        valores.push( archivo.filename);
    }

    valores.push(req.params.id);

    const updateQuery = `UPDATE clientes SET ${campos.join(', ')} WHERE cliente_id = ?`;

    db.query(updateQuery, valores, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error al actualizar clientes' });
        }

        res.json({ mensaje: 'Cliente actualizado correctamente' });
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