const pool = require('../config/db');
const QRCode = require('qrcode'); // Librería para generar QR

// Generar pedido desde el carrito con QR
function generarPedido(req, res) {
    const id_usuario = req.usuario.id;
    const numero_pedido = 'PED-' + Date.now(); // Identificador único

    pool.query('SELECT * FROM carrito WHERE id_usuario = $1', [id_usuario], (error, carrito) => {
        if (error) return res.status(500).json({ mensaje: 'Error al obtener el carrito' });
        if (carrito.rows.length === 0) return res.status(400).json({ mensaje: 'El carrito está vacío' });

        // Insertar pedido con estado inicial 'Pendiente'
        pool.query(
            'INSERT INTO pedidos (usuario_id, estado, numero_pedido) VALUES ($1, $2, $3) RETURNING id',
            [id_usuario, 'Pendiente', numero_pedido],
            (error, pedido) => {
                if (error) return res.status(500).json({ mensaje: 'Error al crear el pedido' });

                const id_pedido = pedido.rows[0].id;

                // Insertar detalle por cada producto del carrito
                const inserts = carrito.rows.map(item => {
                    return pool.query(
                        'INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, subtotal) VALUES ($1, $2, $3, $4)',
                        [id_pedido, item.id_producto, item.cantidad, item.subtotal]
                    );
                });

                Promise.all(inserts)
                    .then(() => {
                        // Generar QR con contenido rastreable
                        const qrContenido = `https://buffet.com/pedido/${numero_pedido}`;
                        QRCode.toDataURL(qrContenido, (err, qrImagen) => {
                            if (err) return res.status(500).json({ mensaje: 'Error al generar el código QR' });

                            // Asociar QR al pedido
                            pool.query('UPDATE pedidos SET qr = $1 WHERE id = $2', [qrImagen, id_pedido], (error) => {
                                if (error) return res.status(500).json({ mensaje: 'Error al guardar el QR en el pedido' });

                                // Vaciar carrito
                                pool.query('DELETE FROM carrito WHERE id_usuario = $1', [id_usuario]);
                                res.status(201).json({
                                    mensaje: 'Pedido generado con QR',
                                    numero_pedido,
                                    qr: qrImagen
                                });
                            });
                        });
                    })
                    .catch(() => res.status(500).json({ mensaje: 'Error al guardar el detalle del pedido' }));
            }
        );
    });
}

module.exports = {
    generarPedido
};