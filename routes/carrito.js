const express = require('express');
const router = express.Router();
const {
    agregarAlCarrito,
    eliminarDelCarrito,
    verCarrito
} = require('../controllers/carritoController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.post('/', verificarToken, agregarAlCarrito);
router.put('/:id_producto', verificarToken, require('../controllers/carritoController').actualizarCantidad);
router.delete('/:id_producto', verificarToken, eliminarDelCarrito);
router.get('/', verificarToken, verCarrito);

module.exports = router;
