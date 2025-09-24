const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Importar rutas
const testRoutes = require('./routes/test');
app.use('/', testRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Servidor del buffet universitario funcionando');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});