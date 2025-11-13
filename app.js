const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Lista de orígenes permitidos
const allowedOrigins = [
  "https://buffet-ecommerce-two.vercel.app",
  "https://buffet-ecommerce-2t4sk4d1pj-brisa-valerio5s-projects.vercel.app",
  "http://localhost:5173",
];

// Configuración CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware CORS
app.use(cors(corsOptions));

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
