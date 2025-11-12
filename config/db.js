// Configuracion de conexion con PostgreSQL
/*const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

module.exports = pool;*/

// Configuracion de conexion con PostgreSQL en Railway
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DB_URI,
    ssl: { rejectUnauthorized: false } // Railway requiere SSL
});

module.exports = pool;
