const express = require('express');
const router = express.Router();
const {
  obtenerCategorias,
  obtenerTodasLasCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
} = require('../controllers/categoriasController');
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');

// Rutas públicas
router.get('/', obtenerCategorias); // GET /api/categorias

// Rutas de admin
router.get('/admin/todas', verificarToken, verificarAdmin, obtenerTodasLasCategorias); // GET /api/categorias/admin/todas
router.post('/', verificarToken, verificarAdmin, crearCategoria); // POST /api/categorias
router.put('/:id', verificarToken, verificarAdmin, actualizarCategoria); // PUT /api/categorias/:id
router.delete('/:id', verificarToken, verificarAdmin, eliminarCategoria); // DELETE /api/categorias/:id

module.exports = router;
