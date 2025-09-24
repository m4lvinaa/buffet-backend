const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Importar rutas
const testRoutes = require('./routes/test');
const usuariosRoutes = require('./routes/usuarios');

// Usar rutas
app.use('/', testRoutes); // Ruta de prueba
app.use('/api/usuarios', usuariosRoutes); // Registro y login

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Servidor del buffet universitario funcionando');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});