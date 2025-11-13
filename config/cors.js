const allowedOrigins = [
  "https://buffet-ecommerce-two.vercel.app",
  "https://buffet-ecommerce-2t4sk4d1pj-brisa-valerio5s-projects.vercel.app",
  "http://localhost:5173",
];

module.exports = {
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
