const pool = require("../config/db");

function obtenerDashboardAdmin(req, res) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  Promise.all([
    pool.query("SELECT COUNT(*) FROM pedidos"),
    pool.query("SELECT COUNT(*) FROM productos"),
    pool.query("SELECT COUNT(*) FROM usuarios"),
    pool.query("SELECT COUNT(*) FROM pedidos WHERE fecha >= $1", [hoy]),
    pool.query(`SELECT COALESCE(SUM(dp.subtotal), 0) AS total
                FROM pedidos p
                JOIN detalle_pedido dp ON dp.pedido_id = p.id
                WHERE p.fecha >= $1`, [hoy]),
    pool.query("SELECT estado AS _id, COUNT(*) AS count FROM pedidos GROUP BY estado"),
    pool.query(`SELECT p.id AS _id, p.nombre, SUM(dp.cantidad) AS totalVendido
                FROM detalle_pedido dp
                JOIN productos p ON p.id = dp.producto_id
                GROUP BY p.id, p.nombre
                ORDER BY totalVendido DESC
                LIMIT 5`),
    pool.query(`SELECT p.id AS _id, u.nombre, u.email, p.fecha AS createdAt
                FROM pedidos p
                JOIN usuarios u ON u.id = p.usuario_id
                ORDER BY p.fecha DESC
                LIMIT 5`)
  ])
    .then(([
      totalOrders,
      totalProducts,
      totalUsers,
      todayOrders,
      todayRevenue,
      ordersByStatus,
      topProducts,
      recentOrders
    ]) => {
      res.status(200).json({
        stats: {
          totalOrders: Number(totalOrders.rows[0].count),
          totalProducts: Number(totalProducts.rows[0].count),
          totalUsers: Number(totalUsers.rows[0].count),
          todayOrders: Number(todayOrders.rows[0].count),
          todayRevenue: Number(todayRevenue.rows[0].total)
        },
        ordersByStatus: ordersByStatus.rows.map(r => ({ _id: r._id, count: Number(r.count) })),
        topProducts: topProducts.rows.map(r => ({
          _id: r._id,
          nombre: r.nombre,
          totalVendido: Number(r.totalvendido)
        })),
        recentOrders: recentOrders.rows.map(r => ({
          _id: r._id,
          usuario: { nombre: r.nombre, email: r.email },
          createdAt: r.createdat
        }))
      });
    })
    .catch((err) => {
      console.error("Error en obtenerDashboardAdmin:", err);
      res.status(500).json({ mensaje: "Error al obtener datos del dashboard" });
    });
}

module.exports = { obtenerDashboardAdmin };
