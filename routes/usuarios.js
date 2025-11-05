const express = require('express');
const router = express.Router();
const {
  registrarUsuario,
  loginUsuario,
  listarUsuarios,
  listarUsuarioPorId,
  editarUsuario,
  eliminarUsuario
} = require('../controllers/usuariosController');
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');

// Registro y login (públicos)
router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);

// Admin: gestión de usuarios
router.get('/', verificarToken, verificarAdmin, listarUsuarios);
router.get('/:id', verificarToken, verificarAdmin, listarUsuarioPorId);
router.post('/', verificarToken, verificarAdmin, registrarUsuario); 
router.put('/:id', verificarToken, verificarAdmin, editarUsuario);
router.delete('/:id', verificarToken, verificarAdmin, eliminarUsuario);

module.exports = router;
