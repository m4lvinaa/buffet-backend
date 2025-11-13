const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: [
    'https://buffet-ecommerce-2t4sk4d1pj-brisa-valerio5s-projects.vercel.app',
    'https://buffet-ecommerce-qer1l7tgd-julietas-projects-bb92a50b.vercel.app',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

// Middleware CORS
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 

app.use(express.json());

// Rutas...
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/carrito', require('./routes/carrito'));
app.use('/api/pedidos', require('./routes/pedido'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/categorias', require('./routes/categorias'));
app.use('/api', require('./routes/upload'));
app.use('/api/notificaciones', require('./routes/notificaciones'));

app.get('/', (req, res) => {
  res.send('Servidor del buffet universitario funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
