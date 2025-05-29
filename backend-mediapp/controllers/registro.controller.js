const pool = require('../db/connection');

exports.crearRegistro = async (req, res) => {
  console.log('📥 Recibiendo solicitud para crear registro');
  console.log('➡️ Datos recibidos:', req.body);

  const { foto_url, latitud, longitud, datos_json } = req.body;
  const usuario_id = req.usuario?.id;

  if (!usuario_id || !foto_url || !latitud || !longitud || !datos_json) {
    console.log('❌ Datos incompletos');
    return res.status(400).json({ mensaje: 'Datos incompletos' });
  }

  try {
    const query = 'INSERT INTO registros (usuario_id, foto_url, latitud, longitud, datos_json) VALUES (?, ?, ?, ?, ?)';
    const values = [usuario_id, foto_url, latitud, longitud, JSON.stringify(datos_json)];

    await pool.query(query, values);

    console.log('✅ Registro guardado correctamente');
    res.json({ mensaje: 'Registro guardado correctamente' });
  } catch (error) {
    console.error('❌ Error al guardar registro:', error);
    res.status(500).json({ mensaje: 'Error al guardar registro', error });
  }
};

exports.obtenerRegistros = async (req, res) => {
  const usuario_id = req.usuario?.id;
  const rol = req.usuario?.rol;

  console.log('🔍 Listando registros para usuario:', usuario_id, '| rol:', rol);

  try {
    let registros;
    if (rol === 'admin') {
      [registros] = await pool.query('SELECT * FROM registros ORDER BY fecha DESC');
    } else {
      [registros] = await pool.query(
        'SELECT * FROM registros WHERE usuario_id = ? ORDER BY fecha DESC',
        [usuario_id]
      );
    }

    console.log('🔢 Registros encontrados:', registros.length);
    res.json(registros);
  } catch (error) {
    console.error('❌ Error al obtener registros:', error);
    res.status(500).json({ mensaje: 'Error al obtener registros' });
  }
};
