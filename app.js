const express = require("express");
const cors = require("cors");
require("dotenv").config();

const corsOptions = require("./config/cors");

const app = express();
const PORT = process.env.PORT;

// Middleware CORS
app.use(cors(corsOptions));

// Middleware extra para asegurar respuesta CORS en preflight
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // responde inmediatamente al preflight
  }

  next();
});


// Middleware JSON
app.use(express.json());

// Rutas del backend
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/productos", require("./routes/productos"));
app.use("/api/carrito", require("./routes/carrito"));
app.use("/api/pedidos", require("./routes/pedido"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/categorias", require("./routes/categorias"));
app.use("/api", require("./routes/upload"));
app.use("/api/notificaciones", require("./routes/notificaciones"));

// Ruta base
app.get("/", (req, res) => {
  res.send("Servidor del buffet universitario funcionando correctamente 🚀");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
