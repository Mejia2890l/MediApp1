const bcrypt = require('bcryptjs');

async function generarHash() {
  const hash = await bcrypt.hash('1234', 10);
  console.log('Hash generado:', hash);
}

generarHash();
