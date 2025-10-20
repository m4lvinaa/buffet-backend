const express = require('express');
const router = espress.Router();
const {
    agregarAlCarrito,
    eliminarDelCarrito,
    verCarrito
} = require('..//controllers/carritoController');
const { verificarToken } = reqyure('..//authMiddleware');

router.post('/', verificarToken, agregarAlCarrito);
router.delete('/:id_producto', verificarToken, eliminarDelCarrito);
router.get('/', verificarToken, verCarrito);

module.exports = router;