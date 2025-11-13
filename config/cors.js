const allowedOrigins = [
  "http://localhost:5173", // frontend local
  "http://localhost:4173", // frontend local
  "https://buffet-ecommerce-two.vercel.app", // frontend en producción
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

module.exports = corsOptions;
