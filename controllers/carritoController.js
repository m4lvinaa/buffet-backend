const pool = require('../config/db');

// Agregar producto al carrito
function agregarAlCarrito(req, res) {
    const { id_producto, cantidad } = req.body;
    const id_usuario = req.usuario.id;

    if (!id_producto || !cantidad || cantidad <= 0) {
        return res.status(400).json({ mensaje: 'Datos inválidos para agregar al carrito' });
    }

    // Verificar stock y existencia del producto
    pool.query('SELECT precio, stock FROM productos WHERE id = $1', [id_producto], (error, resultado) => {
        if (error) {
            return res.status(500).json({ mensaje: 'Error al buscar producto' });
        }

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        const { precio, stock } = resultado.rows[0];

        // Verificar si ya está en el carrito
        pool.query(
            'SELECT cantidad FROM carrito WHERE id_usuario = $1 AND id_producto = $2',
            [id_usuario, id_producto],
            (error, existe) => {
                if (error) {
                    return res.status(500).json({ mensaje: 'Error al verificar carrito' });
                }

                const nuevaCantidad = existe.rows.length > 0
                    ? existe.rows[0].cantidad + cantidad
                    : cantidad;

                if (nuevaCantidad > stock) {
                    return res.status(400).json({ mensaje: 'Stock insuficiente para la cantidad solicitada' });
                }

                const nuevoSubtotal = nuevaCantidad * precio;

                if (existe.rows.length > 0) {
                    // Actualizar cantidad y subtotal
                    pool.query(
                        'UPDATE carrito SET cantidad = $1, subtotal = $2 WHERE id_usuario = $3 AND id_producto = $4',
                        [nuevaCantidad, nuevoSubtotal, id_usuario, id_producto],
                        (error) => {
                            if (error) {
                                return res.status(500).json({ mensaje: 'Error al actualizar carrito' });
                            }

                            res.json({ mensaje: 'Cantidad actualizada en el carrito' });
                        }
                    );
                } else {
                    // Insertar nuevo producto en el carrito
                    pool.query(
                        'INSERT INTO carrito (id_usuario, id_producto, cantidad, subtotal) VALUES ($1, $2, $3, $4)',
                        [id_usuario, id_producto, cantidad, nuevoSubtotal],
                        (error) => {
                            if (error) {
                                return res.status(500).json({ mensaje: 'Error al agregar al carrito' });
                            }

                            res.status(201).json({ mensaje: 'Producto agregado al carrito' });
                        }
                    );
                }
            }
        );
    });
}

// Eliminar producto del carrito
function eliminarDelCarrito(req, res) {
    const id_usuario = req.usuario.id;
    const id_producto = req.params.id_producto;

    pool.query(
        'DELETE FROM carrito WHERE id_usuario = $1 AND id_producto = $2 RETURNING *',
        [id_usuario, id_producto],
        (error, resultado) => {
            if (error) {
                return res.status(500).json({ mensaje: 'Error al eliminar del carrito' });
            }

            if (resultado.rows.length === 0) {
                return res.status(404).json({ mensaje: 'Producto no estaba en el carrito' });
            }

            res.json({ mensaje: 'Producto eliminado del carrito' });
        }
    );
}

// Ver carrito del usuario
function verCarrito(req, res) {
    const id_usuario = req.usuario.id;

    pool.query(
        `SELECT c.id_producto, p.nombre, c.cantidad, p.precio, c.subtotal
         FROM carrito c
         JOIN productos p ON c.id_producto = p.id
         WHERE c.id_usuario = $1`,
        [id_usuario],
        (error, resultado) => {
            if (error) {
                return res.status(500).json({ mensaje: 'Error al obtener el carrito' });
            }

            res.json(resultado.rows);
        }
    );
}

module.exports = {
    agregarAlCarrito,
    eliminarDelCarrito,
    verCarrito
};