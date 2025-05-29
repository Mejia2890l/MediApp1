const express = require('express');
const router = express.Router();

// ✅ Asegúrate de que estos archivos existen y exportan funciones correctamente
const authCtrl = require('../controllers/auth.controller');
const { verificarToken } = require('../middleware/auth.middleware');

// 🔐 Ruta para login sin token
router.post('/login', (req, res) => authCtrl.login(req, res));

// 🔐 Ruta para cambiar contraseña, requiere token
router.post('/cambiar-password', verificarToken, (req, res) => authCtrl.cambiarPassword(req, res));

module.exports = router;
