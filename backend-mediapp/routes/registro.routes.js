const express = require('express');
const router = express.Router();
const registroCtrl = require('../controllers/registro.controller');
const { verificarToken } = require('../middleware/auth.middleware');

// Crear registro (requiere token)
router.post('/crear', verificarToken, (req, res) => {
  console.log('🔥 Solicitud POST /crear recibida, ejecutando controlador...');
  registroCtrl.crearRegistro(req, res);
});

// Listar registros (requiere token)
router.get('/listar', verificarToken, (req, res) => {
  console.log('✅ LLEGÓ AL ENDPOINT GET /api/registros/listar');
  registroCtrl.obtenerRegistros(req, res);
});

module.exports = router;
