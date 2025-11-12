const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Importar rutas
const usuariosRoutes = require('./routes/usuarios');
const productosRoutes = require('./routes/productos');
const carritoRoutes = require('./routes/carrito');
const pedidoRoutes = require('./routes/pedido');
const dashboardRoutes = require('./routes/dashboard');
const uploadRoutes = require('./routes/upload');
const categoriasRoutes = require('./routes/categorias');

// Usar rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/carrito', carritoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api', uploadRoutes); 

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Servidor del buffet universitario funcionando');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
