// index.js
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Habilita CORS para todos los orígenes
app.use(cors());

// Si quieres permitir solo un origen específico:
// app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

// Ruta POST
app.post('/api/usuarios', (req, res) => {
  const { nombre, edad } = req.body;

  if (!nombre || !edad) {
    return res.status(400).json({ mensaje: 'Faltan datos' });
  }

  res.status(201).json({
    mensaje: 'Usuario creado correctamente',
    usuario: { nombre, edad }
  });
});

// Ruta GET
app.get('/api/usuarios-get', (req, res) => {

  res.status(201).json({
    mensaje: 'Usuario creado correctamente'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
