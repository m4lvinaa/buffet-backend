const jwt = require('jsonwebtoken');

// Verifica si el usuario tiene un token valido
function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ mensaje: 'Falta el token '});
    }

    const token = authHeader.split(' ')[1];

    try {
        const datos = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = datos; // Guarda los datos del usuario en la peticion
        next();
    } catch (error) {
        res.status(403).json({ mensaje: 'Token invalido' });
    }
}

// Verifica si el usuario tiene rol "admin"
function verificarAdmin(req, res, next) {
    if (req.usuario.rol !== 'admin') {
        return res.status(403).json({ mensaje: 'Solo los administradores pueden hacer esto' });
    }
    next();
}

module.exports = {
    verificarToken,
    verificarAdmin
};