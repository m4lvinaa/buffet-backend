const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario } = require('../controllers/usuariosController');

// Ruta para registrar usuario
router.post('/registro', registrarUsuario);

// Ruta para iniciar sesion
router.post('/login', loginUsuario);

module.exports = router;