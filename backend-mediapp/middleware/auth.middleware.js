const jwt = require('jsonwebtoken');
require('dotenv').config();

function verificarToken(req, res, next) {
  const token = req.headers['authorization'];
  console.log('🛡️ Token recibido:', token);

  if (!token) {
    console.log('❌ Token no enviado');
    return res.status(401).json({ mensaje: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.usuario = decoded;
    console.log('🔓 Token verificado. Usuario:', decoded);
    next();
  } catch (error) {
    console.error('❌ Token inválido:', error);
    return res.status(401).json({ mensaje: 'Token inválido' });
  }
}

module.exports = { verificarToken };
