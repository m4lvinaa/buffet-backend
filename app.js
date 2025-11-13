const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS
const corsOptions = {
  origin: [
    "https://buffet-ecommerce-2t4sk4d1pj-brisa-valerio5s-projects.vercel.app",
    "https://buffet-ecommerce-two.vercel.app",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware CORS
app.use(cors(corsOptions));

// Responder preflight (para Railway)
app.options("*", cors(corsOptions));

// Refuerzo manual de encabezados CORS
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (corsOptions.origin.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

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
