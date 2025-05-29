const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS y JSON
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Log global
app.use((req, res, next) => {
  console.log(`📡 [Global] ${req.method} ${req.originalUrl}`);
  next();
});

// Importar rutas con validación
try {
  const authRoutes = require('./routes/auth.routes');
  const usuarioRoutes = require('./routes/usuario.routes');
  const registroRoutes = require('./routes/registro.routes');

  console.log('📂 registro.routes.js cargado correctamente ✅');

  app.use('/api/auth', authRoutes);
  app.use('/api/usuarios', usuarioRoutes);
  app.use('/api/registros', registroRoutes);
} catch (error) {
  console.error('❌ Error al cargar rutas:', error);
}

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
