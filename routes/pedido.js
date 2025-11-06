const express = require('express');
const router = express.Router();
const {
    generarPedido,
    actualizarEstadoPedido,
    obtenerEstadoPedido
} = require('../controllers/pedidoController');
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');

// Generar pedido con QR
router.post('/pedido', verificarToken, generarPedido);

// Actualizar estado del pedido (solo admin)
router.put('/pedido/:id_pedido/estado', verificarToken, verificarAdmin, actualizarEstadoPedido);

// Consultar estado actual de los pedidos (usuario)
router.get('/pedido/estado', verificarToken, obtenerEstadoPedido);

module.exports = router;