const express = require('express');
const router = express.Router();
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');
const { obtenerDashboardAdmin } = require('../controllers/dashboardController');

router.get('/admin', verificarToken, verificarAdmin, obtenerDashboardAdmin);

module.exports = router;
