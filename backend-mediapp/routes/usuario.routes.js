const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controllers/usuario.controller');

// Registro abierto, sin requerir token
router.post('/crear', usuarioCtrl.crearUsuario);

router.get('/listar', usuarioCtrl.listarUsuarios);

module.exports = router;
