const pool = require("../config/db");

// Obtener todas las categorías
function obtenerCategorias(req, res) {
  pool.query(
    "SELECT id, nombre, descripcion, activo FROM categorias WHERE activo = true ORDER BY nombre ASC",
    (error, resultado) => {
      if (error) {
        console.error("Error al obtener categorías:", error);
        return res.status(500).json({ mensaje: "Error al obtener categorías" });
      }
      res.status(200).json(resultado.rows);
    }
  );
}

// Obtener todas las categorías incluyendo inactivas (solo admin)
function obtenerTodasLasCategorias(req, res) {
  pool.query(
    "SELECT id, nombre, descripcion, activo, fecha_creacion FROM categorias ORDER BY nombre ASC",
    (error, resultado) => {
      if (error) {
        console.error("Error al obtener categorías:", error);
        return res.status(500).json({ mensaje: "Error al obtener categorías" });
      }
      res.status(200).json(resultado.rows);
    }
  );
}

// Crear nueva categoría
function crearCategoria(req, res) {
  const { nombre, descripcion } = req.body;

  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({ mensaje: "El nombre de la categoría es requerido" });
  }

  pool.query(
    "INSERT INTO categorias (nombre, descripcion, activo) VALUES ($1, $2, true) RETURNING id, nombre, descripcion, activo",
    [nombre.trim(), descripcion || ""],
    (error, resultado) => {
      if (error) {
        if (error.code === "23505") {
          return res.status(400).json({ mensaje: "La categoría ya existe" });
        }
        console.error("Error al crear categoría:", error);
        return res.status(500).json({ mensaje: "Error al crear la categoría" });
      }
      res.status(201).json(resultado.rows[0]);
    }
  );
}

// Actualizar categoría
function actualizarCategoria(req, res) {
  const { id } = req.params;
  const { nombre, descripcion, activo } = req.body;

  pool.query(
    "UPDATE categorias SET nombre = $1, descripcion = $2, activo = $3 WHERE id = $4 RETURNING id, nombre, descripcion, activo",
    [nombre, descripcion, activo, id],
    (error, resultado) => {
      if (error) {
        console.error("Error al actualizar categoría:", error);
        return res.status(500).json({ mensaje: "Error al actualizar la categoría" });
      }
      if (resultado.rows.length === 0) {
        return res.status(404).json({ mensaje: "Categoría no encontrada" });
      }
      res.status(200).json(resultado.rows[0]);
    }
  );
}

// Eliminar categoría (solo desactivar)
function eliminarCategoria(req, res) {
  const { id } = req.params;

  pool.query(
    "UPDATE categorias SET activo = false WHERE id = $1 RETURNING id, nombre",
    [id],
    (error, resultado) => {
      if (error) {
        console.error("Error al eliminar categoría:", error);
        return res.status(500).json({ mensaje: "Error al eliminar la categoría" });
      }
      if (resultado.rows.length === 0) {
        return res.status(404).json({ mensaje: "Categoría no encontrada" });
      }
      res.status(200).json({ mensaje: "Categoría eliminada correctamente" });
    }
  );
}

module.exports = {
  obtenerCategorias,
  obtenerTodasLasCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
};
