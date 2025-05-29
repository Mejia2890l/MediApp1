const pool = require('../db/connection');
const bcrypt = require('bcryptjs');

exports.crearUsuario = async (req, res) => {
  const { nombre, area, puesto, numero_usuario, password, rol } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO usuarios (nombre, area, puesto, numero_usuario, password, rol, requiere_cambio_password) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, area, puesto, numero_usuario, hash, rol || 'usuario', true]
    );

    res.json({ mensaje: 'Usuario creado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear usuario', error });
  }
};

exports.listarUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, nombre, area, puesto, numero_usuario, rol FROM usuarios'
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error });
  }
};
