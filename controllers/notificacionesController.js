const pool = require("../config/db");

// Obtener notificaciones del usuario
async function obtenerNotificaciones(req, res) {
  const id_usuario = req.usuario.id;
  try {
    const resultado = await pool.query(
      "SELECT * FROM notificaciones WHERE usuario_id = $1 ORDER BY fecha DESC",
      [id_usuario]
    );
    res.json(resultado.rows);
  } catch (err) {
    console.error("Error en obtenerNotificaciones:", err);
    res.status(500).json({ mensaje: "Error al obtener notificaciones" });
  }
}

// Marcar notificación como leída
async function marcarNotificacionLeida(req, res) {
  const id_usuario = req.usuario.id;
  const id = req.params.id;
  try {
    await pool.query(
      "UPDATE notificaciones SET leida = TRUE WHERE id = $1 AND usuario_id = $2",
      [id, id_usuario]
    );
    res.json({ mensaje: "Notificación marcada como leída" });
  } catch (err) {
    console.error("Error en marcarNotificacionLeida:", err);
    res.status(500).json({ mensaje: "Error al actualizar notificación" });
  }
}

// Eliminar notificación
async function eliminarNotificacion(req, res) {
  const id_usuario = req.usuario.id;
  const id = req.params.id;
  try {
    await pool.query(
      "DELETE FROM notificaciones WHERE id = $1 AND usuario_id = $2",
      [id, id_usuario]
    );
    res.json({ mensaje: "Notificación eliminada" });
  } catch (err) {
    console.error("Error en eliminarNotificacion:", err);
    res.status(500).json({ mensaje: "Error al eliminar notificación" });
  }
}

module.exports = {
  obtenerNotificaciones,
  marcarNotificacionLeida,
  eliminarNotificacion,
};
