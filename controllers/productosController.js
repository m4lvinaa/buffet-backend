const pool = require('../config/db');

// Mostrar todos los productos
function listarProductos(req, res) {
    pool.query('SELECT * FROM productos', (error, resultado) => {
        if (error) {
            return res.status(500).json({ mensaje: 'Error al buscar productos' });
        }
        
        res.json(resultado.rows);
    });
}

// Crear un nuevo producto (solo admin)
function crearProducto(req, res) {
    const { nombre, descripcion, precio, stock } = req.body;

    if (!nombre || !precio || stock == null) {
        return res.status(400).json({ mensaje: 'Faltan datos' });
    }

    pool.query(
        'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES ($1, $2, $3, $4) RETURNING *',
        [nombre, descripcion, precio, stock],
        (error, resultado) => {
            if (error) {
                return res.status(500).json({ mensaje: 'Error al crear producto' });
            }

            res.status(201).json(resultado.rows[0]);
        }
    );
}

// Editar producto por ID (solo admin)
function editarProducto(req, res) {
    const id = req.params.id;
    const { nombre, descripcion, precio, stock } = req.body;

    if (!nombre || !precio || stock == null) {
        return res.status(400).json({ mensaje: 'Faltan datos para editar' });
    }

    pool.query(
        'UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, stock = $4 WHERE id = $5 RETURNING *',
        [nombre, descripcion, precio, stock, id],
        (error, resultado) => {
            if (error) {
                return res.status(500).json({ mensaje: 'Error al editar producto' });
            }

            if (resultado.rows.length === 0) {
                return res.status(404).json({ mensaje: 'Producto no encontrado' });
            }

            res.json(resultado.rows[0]);
        }
    );
}

// Eliminar producto por ID (solo admin)
function eliminarProducto(req, res) {
    const id = req.params.id;

    pool.query(
        'DELETE FROM productos WHERE id = $1 RETURNING *',
        [id],
        (error, resultado) => {
            if (error) {
                return res.status(500).json({ mensaje: 'Error al eliminar producto' });
            }

            if (resultado.rows.length === 0) {
                return res.status(404).json({ mensaje: 'Producto no encontrado' });
            }

            res.json({ mensaje: 'Producto eliminado', producto: resultado.rows[0] });
        }
    );
}

module.exports = {
    listarProductos,
    crearProducto,
    editarProducto,
    eliminarProducto
};