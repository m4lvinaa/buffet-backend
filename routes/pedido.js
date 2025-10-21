const express = require('express');
const router = express.Router();
const {generarPedido} = require('../controllers/pedidoController');
const verificarToken = require('../middlewares/verificarToken');

router.post('/pedido', verificarToken, generarPedido);

module.exports = router;