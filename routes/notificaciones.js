const express = require("express");
const router = express.Router();
const {
  obtenerNotificaciones,
  marcarNotificacionLeida,
  eliminarNotificacion,
} = require("../controllers/notificacionesController");
const { verificarToken } = require("../middlewares/authMiddleware");

// Obtener todas las notificaciones del usuario
router.get("/", verificarToken, obtenerNotificaciones);

// Marcar una notificación como leída
router.put("/:id", verificarToken, marcarNotificacionLeida);

// Eliminar una notificación
router.delete("/:id", verificarToken, eliminarNotificacion);

module.exports = router;
