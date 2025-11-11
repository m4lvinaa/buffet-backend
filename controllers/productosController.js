const pool = require("../config/db");

// Mostrar todos los productos activos
function listarProductos(req, res) {
  pool.query("SELECT * FROM productos WHERE activo = true", (error, resultado) => {
    if (error) {
      return res.status(500).json({ mensaje: "Error al buscar productos" });
    }
    res.json(resultado.rows);
  });
}

// Mostrar producto por ID (incluye inactivos para historial)
function listarProductoPorId(req, res) {
  const id = req.params.id;

  pool.query("SELECT * FROM productos WHERE id = $1", [id], (error, resultado) => {
    if (error) {
      return res.status(500).json({ mensaje: "Error al obtener el producto" });
    }

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json(resultado.rows[0]);
  });
}

// Crear producto
function crearProducto(req, res) {
  const { nombre, descripcion, precio, stock, categoria } = req.body;

  if (!nombre || !precio || stock == null) {
    return res.status(400).json({ mensaje: "Faltan datos" });
  }

  pool.query(
    "INSERT INTO productos (nombre, descripcion, precio, stock, categoria, activo) VALUES ($1, $2, $3, $4, $5, true) RETURNING *",
    [nombre, descripcion, precio, stock, categoria],
    (error, resultado) => {
      if (error) {
        return res.status(500).json({ mensaje: "Error al crear producto" });
      }
      res.status(201).json(resultado.rows[0]);
    }
  );
}

// Editar producto
function editarProducto(req, res) {
  const id = req.params.id;
  const { nombre, descripcion, precio, stock, categoria } = req.body;

  if (!nombre || !precio || stock == null) {
    return res.status(400).json({ mensaje: "Faltan datos para editar" });
  }

  pool.query(
    "UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, stock = $4, categoria = $5 WHERE id = $6 RETURNING *",
    [nombre, descripcion, precio, stock, categoria, id],
    (error, resultado) => {
      if (error) {
        return res.status(500).json({ mensaje: "Error al editar producto" });
      }

      if (resultado.rows.length === 0) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
      }

      res.json(resultado.rows[0]);
    }
  );
}

// Marcar producto como inactivo (eliminar lógico)
function eliminarProducto(req, res) {
  const id = req.params.id;

  if (!id || isNaN(id)) {
    return res.status(400).json({ mensaje: "ID inválido" });
  }

  pool.query(
    "UPDATE productos SET activo = false WHERE id = $1 RETURNING *",
    [id],
    (error, resultado) => {
      if (error) {
        console.error("Error al marcar producto como inactivo:", error);
        return res.status(500).json({ mensaje: "Error interno al eliminar producto" });
      }

      if (resultado.rows.length === 0) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
      }

      res.json({ mensaje: "Producto marcado como inactivo", producto: resultado.rows[0] });
    }
  );
}

module.exports = {
  listarProductos,
  listarProductoPorId,
  crearProducto,
  editarProducto,
  eliminarProducto,
};
