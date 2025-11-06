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
  verificarEntregaPorQR
} = require('../controllers/pedidoController');
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');

// Usuario
router.post('/', verificarToken, generarPedido); // POST /api/pedidos
router.get('/mis-pedidos', verificarToken, verMisPedidos); // GET /api/pedidos/mis-pedidos
router.get('/detalle/:id', verificarToken, verDetallePedido); // GET /api/pedidos/detalle/:id
router.get('/pedido/estado', verificarToken, obtenerEstadoPedido); // GET /api/pedidos/pedido/estado
router.get('/:id/productos', verificarToken, obtenerProductosDelPedido);
router.get('/:id/qr', verificarToken, obtenerQRDelPedido);


// Admin
router.get('/', verificarToken, verificarAdmin, verTodosLosPedidos); // GET /api/pedidos
router.get('/:id', verificarToken, verificarAdmin, verDetallePedidoAdmin); // GET /api/pedidos/:id
router.delete('/:id', verificarToken, verificarAdmin, eliminarPedido); // DELETE /api/pedidos/:id
router.put('/pedido/:id_pedido/estado', verificarToken, verificarAdmin, actualizarEstadoPedido); // PUT /api/pedidos/pedido/:id_pedido/estado
router.put('/verificar-entrega', verificarToken, verificarAdmin, verificarEntregaPorQR);


module.exports = router;
