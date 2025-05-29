const pool = require('../db/connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
  const { numero_usuario, password } = req.body;
  console.log('🔐 LOGIN DEBUG');
  console.log('Usuario recibido:', numero_usuario);
  console.log('Contraseña recibida:', password);

  try {
    // 1. Busca el usuario
    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE numero_usuario = ?',
      [numero_usuario]
    );

    if (rows.length === 0) {
      console.log('❌ Usuario no encontrado en BD');
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const usuario = rows[0];
    console.log('Hash en BD:', usuario.password);

    // 2. Compara contraseñas
    const passwordValida = await bcrypt.compare(password, usuario.password);
    console.log('bcrypt.compare result:', passwordValida);

    if (!passwordValida) {
      console.log('❌ La contraseña NO coincide');
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // 3. Genera token si coincide
    const token = jwt.sign(
      {
        id: usuario.id,
        numero_usuario: usuario.numero_usuario,
        rol: usuario.rol,
        requiere_cambio_password: usuario.requiere_cambio_password
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    console.log('✅ Login exitoso, emito token');
    res.json({ token, usuario });
  } catch (error) {
    console.error('⚠️ Error en login:', error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
};
