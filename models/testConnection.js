const pool = require('../config/db');

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
    } else {
        console.log ('Conexion exitosa:', res.rows);
    }
})