const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dtmth7kli",
  api_key: process.env.CLOUDINARY_API_KEY || "533651449831898",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/upload", upload.single("imagen"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ mensaje: "No se encontró archivo" });

    const stream = cloudinary.uploader.upload_stream(
      { folder: "productos" },
      (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ mensaje: "Error al subir imagen" });
        }
        res.json({ url: result.secure_url });
      }
    );

    stream.end(req.file.buffer);
  } catch (error) {
    console.error("Error subiendo imagen:", error);
    res.status(500).json({ mensaje: "Error interno al subir imagen" });
  }
});

module.exports = router;
