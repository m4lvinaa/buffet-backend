const express = require('express');
const router = express.Router();
const {
  generarPedido,
  verMisPedidos,
  verDetallePedido,
  verTodosLosPedidos,
  verDetallePedidoAdmin,
  actualizarEstadoPedido,
  obtenerEstadoPedido,
  eliminarPedido,
  obtenerProductosDelPedido,
  obtenerQRDelPedido,
  verificarEntregaPorQR,
  crearPedidoAdmin,
  editarPedidoAdmin,
  cancelarPedidoAdmin
} = require('../controllers/pedidoController');
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');

// Rutas específicas (deben venir antes de rutas dinámicas)
// Usuario
router.post('/', verificarToken, generarPedido); // POST /api/pedidos
router.get('/mis-pedidos', verificarToken, verMisPedidos); // GET /api/pedidos/mis-pedidos
router.get('/detalle/:id', verificarToken, verDetallePedido); // GET /api/pedidos/detalle/:id
router.get('/pedido/estado', verificarToken, obtenerEstadoPedido); // GET /api/pedidos/pedido/estado

// Admin - Rutas específicas
router.put('/pedido/:id_pedido/estado', verificarToken, verificarAdmin, actualizarEstadoPedido); // PUT /api/pedidos/pedido/:id_pedido/estado
router.put('/verificar-entrega', verificarToken, verificarAdmin, verificarEntregaPorQR); // PUT /api/pedidos/verificar-entrega

// NUEVAS rutas para CRUD admin
router.post('/admin', verificarToken, verificarAdmin, crearPedidoAdmin); // POST /api/pedidos/admin
router.put('/admin/:id', verificarToken, verificarAdmin, editarPedidoAdmin); // PUT /api/pedidos/admin/:id

// Rutas dinámicas (deben venir después de rutas específicas)
router.get('/:id/productos', verificarToken, obtenerProductosDelPedido);
router.get('/:id/qr', verificarToken, obtenerQRDelPedido);
router.get('/', verificarToken, verificarAdmin, verTodosLosPedidos); // GET /api/pedidos
router.get('/:id', verificarToken, verificarAdmin, verDetallePedidoAdmin); // GET /api/pedidos/:id
router.delete('/:id', verificarToken, verificarAdmin, eliminarPedido); // DELETE /api/pedidos/:id
router.put("/:id/cancelar", verificarToken, verificarAdmin, cancelarPedidoAdmin);

module.exports = router;