const pool = require("../config/db");
const QRCode = require("qrcode");

// Generar pedido desde el carrito con QR
function generarPedido(req, res) {
  const id_usuario = req.usuario.id;
  const numero_pedido = "PED-" + Date.now();

  pool.query(
    "SELECT * FROM carrito WHERE id_usuario = $1",
    [id_usuario],
    (error, carrito) => {
      if (error)
        return res.status(500).json({ mensaje: "Error al obtener el carrito" });
      if (carrito.rows.length === 0)
        return res.status(400).json({ mensaje: "El carrito está vacío" });

      pool.query(
        "INSERT INTO pedidos (usuario_id, estado, numero_pedido) VALUES ($1, $2, $3) RETURNING id",
        [id_usuario, "Pendiente", numero_pedido],
        (error, pedido) => {
          if (error)
            return res
              .status(500)
              .json({ mensaje: "Error al crear el pedido" });

          const id_pedido = pedido.rows[0].id;

          const inserts = carrito.rows.map((item) =>
            Promise.all([
              pool.query(
                "INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, subtotal) VALUES ($1, $2, $3, $4)",
                [id_pedido, item.id_producto, item.cantidad, item.subtotal]
              ),
              pool.query(
                "UPDATE productos SET stock = stock - $1 WHERE id = $2",
                [item.cantidad, item.id_producto]
              )
            ])
          );

          Promise.all(inserts)
            .then(() => {
              const qrContenido = `https://buffet.com/pedido/${numero_pedido}`;
              QRCode.toDataURL(qrContenido, (err, qrImagen) => {
                if (err)
                  return res
                    .status(500)
                    .json({ mensaje: "Error al generar el código QR" });

                pool.query(
                  "UPDATE pedidos SET qr = $1 WHERE id = $2",
                  [qrImagen, id_pedido],
                  (error) => {
                    if (error)
                      return res.status(500).json({
                        mensaje: "Error al guardar el QR en el pedido",
                      });

                    pool.query("DELETE FROM carrito WHERE id_usuario = $1", [
                      id_usuario,
                    ]);
                    res.status(201).json({
                      mensaje: "Pedido generado con QR",
                      numero_pedido,
                      qr: qrImagen,
                    });
                  }
                );
              });
            })
            .catch(() =>
              res
                .status(500)
                .json({ mensaje: "Error al guardar el detalle del pedido" })
            );
        }
      );
    }
  );
}

// Obtener estado actual de los pedidos del usuario
function obtenerEstadoPedido(req, res) {
  const id_usuario = req.usuario.id;

  pool.query(
    "SELECT id, numero_pedido, estado FROM pedidos WHERE usuario_id = $1",
    [id_usuario],
    (error, resultado) => {
      if (error)
        return res.status(500).json({ mensaje: "Error al obtener pedidos" });
      res.status(200).json({ pedidos: resultado.rows });
    }
  );
}

// Actualizar estado del pedido (solo admin)
function actualizarEstadoPedido(req, res) {
  const { id_pedido } = req.params;
  const { nuevo_estado } = req.body;

  const estadosValidos = ["Pendiente", "Confirmado", "Enviado", "Entregado"];
  if (!estadosValidos.includes(nuevo_estado)) {
    return res.status(400).json({ mensaje: "Estado inválido" });
  }

  pool.query(
    "UPDATE pedidos SET estado = $1 WHERE id = $2",
    [nuevo_estado, id_pedido],
    (error) => {
      if (error)
        return res
          .status(500)
          .json({ mensaje: "Error al actualizar el estado del pedido" });
      res.status(200).json({ mensaje: "Estado actualizado correctamente" });
    }
  );
}

// Placeholder para funciones adicionales
function verMisPedidos(req, res) {
  const id_usuario = req.usuario.id;

  pool.query(
    `SELECT id, numero_pedido, estado, fecha,
            (SELECT SUM(subtotal) FROM detalle_pedido WHERE pedido_id = pedidos.id) AS total
     FROM pedidos
     WHERE usuario_id = $1
     ORDER BY fecha DESC`,
    [id_usuario],
    (error, resultado) => {
      if (error) {
        console.error("Error en verMisPedidos:", error);
        return res.status(500).json({ mensaje: "Error al obtener pedidos" });
      }
      res.status(200).json(resultado.rows);
    }
  );
}

function verDetallePedido(req, res) {
  const id_usuario = req.usuario.id;
  const id = req.params.id;

  pool.query(
    `SELECT id, numero_pedido, estado, fecha,
            (SELECT SUM(subtotal) FROM detalle_pedido WHERE pedido_id = pedidos.id) AS total,
            qr
     FROM pedidos
     WHERE id = $1 AND usuario_id = $2`,
    [id, id_usuario],
    (error, resultado) => {
      if (error) {
        console.error("Error en verDetallePedido:", error);
        return res
          .status(500)
          .json({ mensaje: "Error al obtener el detalle del pedido" });
      }
      if (resultado.rows.length === 0) {
        return res.status(404).json({ mensaje: "Pedido no encontrado" });
      }
      res.status(200).json(resultado.rows[0]);
    }
  );
}

function verTodosLosPedidos(req, res) {
  pool.query(
    `SELECT id, numero_pedido, estado, fecha,
            (SELECT SUM(subtotal) FROM detalle_pedido WHERE pedido_id = pedidos.id) AS total,
            usuario_id
     FROM pedidos
     ORDER BY fecha DESC`,
    (error, resultado) => {
      if (error) {
        console.error("Error en verTodosLosPedidos:", error);
        return res.status(500).json({ mensaje: "Error al obtener pedidos" });
      }
      res.status(200).json(resultado.rows);
    }
  );
}

function verDetallePedidoAdmin(req, res) {
  const id = req.params.id;

  pool.query(
    `SELECT id, numero_pedido, estado, fecha,
            (SELECT SUM(subtotal) FROM detalle_pedido WHERE pedido_id = pedidos.id) AS total,
            usuario_id, qr
     FROM pedidos
     WHERE id = $1`,
    [id],
    (error, resultado) => {
      if (error) {
        console.error("Error en verDetallePedidoAdmin:", error);
        return res.status(500).json({ mensaje: "Error al obtener el pedido" });
      }
      if (resultado.rows.length === 0) {
        return res.status(404).json({ mensaje: "Pedido no encontrado" });
      }
      res.status(200).json(resultado.rows[0]);
    }
  );
}

function eliminarPedido(req, res) {
  const id = req.params.id;

  pool.query("DELETE FROM pedidos WHERE id = $1", [id], (error, resultado) => {
    if (error) {
      console.error("Error en eliminarPedido:", error);
      return res.status(500).json({ mensaje: "Error al eliminar el pedido" });
    }

    if (resultado.rowCount === 0) {
      return res
        .status(404)
        .json({ mensaje: "Pedido no encontrado o ya eliminado" });
    }

    res.status(200).json({ mensaje: "Pedido eliminado correctamente" });
  });
}
function obtenerProductosDelPedido(req, res) {
  const id_usuario = req.usuario.id;
  const id_pedido = req.params.id;

  pool.query(
    `SELECT dp.id, dp.cantidad, dp.subtotal,
            p.nombre, p.precio, p.imagen_url
     FROM detalle_pedido dp
     JOIN productos p ON p.id = dp.producto_id
     JOIN pedidos ped ON ped.id = dp.pedido_id
     WHERE dp.pedido_id = $1 AND ped.usuario_id = $2`,
    [id_pedido, id_usuario],
    (error, resultado) => {
      if (error) {
        console.error("Error en obtenerProductosDelPedido:", error);
        return res
          .status(500)
          .json({ mensaje: "Error al obtener productos del pedido" });
      }
      res.status(200).json(resultado.rows);
    }
  );
}

function obtenerQRDelPedido(req, res) {
  const id_usuario = req.usuario.id;
  const id_pedido = req.params.id;

  pool.query(
    "SELECT qr, numero_pedido FROM pedidos WHERE id = $1 AND usuario_id = $2",
    [id_pedido, id_usuario],
    (error, resultado) => {
      if (error) {
        console.error("Error al obtener QR:", error);
        return res
          .status(500)
          .json({ mensaje: "Error al obtener el QR del pedido" });
      }
      if (resultado.rows.length === 0) {
        return res.status(404).json({ mensaje: "QR no encontrado" });
      }

      const { qr, numero_pedido } = resultado.rows[0];
      res.status(200).json({ qr, numero_pedido });
    }
  );
}

function verificarEntregaPorQR(req, res) {
  const { codigo } = req.body;

  console.log("Código recibido:", codigo);

  pool.query(
    `SELECT id, numero_pedido, qr, estado FROM pedidos WHERE estado != 'Entregado'`,
    (error, resultado) => {
      if (error) {
        console.error("Error al buscar pedidos:", error);
        return res
          .status(500)
          .json({ mensaje: "Error al verificar el código" });
      }

      const pedidos = resultado.rows;
      console.log("Pedidos en BD:", pedidos.map(p => ({ id: p.id, numero_pedido: p.numero_pedido })));
      
      // Extraer numero_pedido del código si es una URL
      let codigoLimpio = codigo.trim();
      if (codigoLimpio.includes('/pedido/')) {
        const parts = codigoLimpio.split('/pedido/');
        codigoLimpio = parts[1];
      }
      
      console.log("Código limpio:", codigoLimpio);

      const pedidoCoincidente = pedidos.find(
        (p) => p.numero_pedido === codigoLimpio || p.numero_pedido === codigo || p.qr?.includes(codigoLimpio)
      );

      console.log("Pedido coincidente:", pedidoCoincidente);

      if (!pedidoCoincidente) {
        return res
          .status(404)
          .json({ mensaje: "Código no válido o ya entregado" });
      }

      pool.query(
        "UPDATE pedidos SET estado = 'Entregado' WHERE id = $1",
        [pedidoCoincidente.id],
        (error) => {
          if (error) {
            console.error("Error al actualizar estado:", error);
            return res
              .status(500)
              .json({ mensaje: "Error al marcar como entregado" });
          }

          res.status(200).json({
            mensaje: `Pedido ${pedidoCoincidente.numero_pedido} marcado como entregado`,
          });
        }
      );
    }
  );
}

module.exports = {
  generarPedido,
  actualizarEstadoPedido,
  obtenerEstadoPedido,
  verMisPedidos,
  verDetallePedido,
  verTodosLosPedidos,
  verDetallePedidoAdmin,
  eliminarPedido,
  obtenerProductosDelPedido,
  obtenerQRDelPedido,
  verificarEntregaPorQR,
};
