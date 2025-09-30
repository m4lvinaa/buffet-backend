const express = require('express');
const router = express.Router();
const {
  listarProductos,
  crearProducto,
  editarProducto,
  eliminarProducto
} = require('../controllers/productosController');
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');

// Ver productos (cualquiera puede ver)
router.get('/', listarProductos);

// Crear producto (solo admin con token)
router.post('/', verificarToken, verificarAdmin, crearProducto);

// Editar producto por ID (solo admin con token)
router.put('/:id', verificarToken, verificarAdmin, editarProducto);

// Eliminar producto por ID (solo admin con token)
router.delete('/:id', verificarToken, verificarAdmin, eliminarProducto);

module.exports = router;