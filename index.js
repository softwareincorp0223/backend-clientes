//CODIGO LOCAL
import express from "express";
import bodyParser from "body-parser";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import prospectosRoutes from "./routes/prospectosRoutes.js";
import clientesRoutes from "./routes/clientesRoutes.js";
import dotenv from 'dotenv';
import cors from "cors";
import path from 'path';

// Cargar variables de entorno desde .env
dotenv.config();

const app = express();

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());

app.use('/uploads', express.static(path.resolve('uploads')));

const dominiosPermitidos = [process.env.BACKEND_URL, process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    // Permitir solicitudes sin origen, como las hechas desde herramientas como Postman o localhost
    if (!origin || dominiosPermitidos.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

app.use(cors(corsOptions));

// Rutas de usaurio
app.use('/api', usuarioRoutes);

// Rutas de prospectos
app.use('/api', prospectosRoutes);

// Rutas de cliente
app.use('/api', clientesRoutes);

const port = 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});