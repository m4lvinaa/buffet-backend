const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Listar todos los usuarios (solo admin)
exports.listarUsuarios = async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT id, nombre, email, rol FROM usuarios"
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    res.status(500).json({ mensaje: "Error al obtener usuarios" });
  }
};

// Ver usuario por ID (solo admin)
exports.listarUsuarioPorId = async (req, res) => {
  const id = req.params.id;

  try {
    const resultado = await pool.query(
      "SELECT id, nombre, email, rol FROM usuarios WHERE id = $1",
      [id]
    );
    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.json(resultado.rows[0]);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ mensaje: "Error al obtener usuario" });
  }
};

// Crear usuario (registro público)
exports.registrarUsuario = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    const existe = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);
    if (existe.rows.length > 0) {
      return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }

    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4)",
      [nombre, email, hash, rol || "user"]
    );

    res.status(201).json({ mensaje: "Usuario registrado correctamente" });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ mensaje: "Error al registrar usuario" });
  }
};

// Editar usuario por ID (solo admin)
exports.editarUsuario = async (req, res) => {
  const id = req.params.id;
  const { nombre, email, rol, password } = req.body;

  if (!nombre || !email || !rol) {
    return res.status(400).json({ mensaje: "Faltan datos para editar" });
  }

  try {
    let query, params;

    if (password) {
      const hash = await bcrypt.hash(password, 10);
      query =
        "UPDATE usuarios SET nombre = $1, email = $2, rol = $3, password = $4 WHERE id = $5 RETURNING id, nombre, email, rol";
      params = [nombre, email, rol, hash, id];
    } else {
      query =
        "UPDATE usuarios SET nombre = $1, email = $2, rol = $3 WHERE id = $4 RETURNING id, nombre, email, rol";
      params = [nombre, email, rol, id];
    }

    const resultado = await pool.query(query, params);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error("Error al editar usuario:", error);
    res.status(500).json({ mensaje: "Error al editar usuario" });
  }
};

// Eliminar usuario por ID (solo admin)
exports.eliminarUsuario = async (req, res) => {
  const id = req.params.id;

  if (!id || isNaN(id)) {
    return res.status(400).json({ mensaje: "ID inválido" });
  }

  try {
    const resultado = await pool.query(
      "DELETE FROM usuarios WHERE id = $1 RETURNING id, nombre, email, rol",
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json({ mensaje: "Usuario eliminado", usuario: resultado.rows[0] });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ mensaje: "Error interno al eliminar usuario" });
  }
};

// Login de usuario (público)
exports.loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const resultado = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );
    if (resultado.rows.length === 0) {
      return res.status(401).json({ mensaje: "Correo no registrado" });
    }

    const usuario = resultado.rows[0];
    const coincide = await bcrypt.compare(password, usuario.password);
    if (!coincide) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      mensaje: "Login exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ mensaje: "Error al iniciar sesión" });
  }
};
