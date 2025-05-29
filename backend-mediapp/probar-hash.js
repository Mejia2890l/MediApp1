const bcrypt = require('bcryptjs');

const passwordIngresada = '1234';
const hashEnBaseDeDatos = '$2b$10$1u6aooQKyY86O52KowBgg.1IEthuCAePbL9zUEn0/nrGkz9Jr3qm2'; // 👈 el nuevo generado

bcrypt.compare(passwordIngresada, hashEnBaseDeDatos)
  .then(resultado => {
    console.log('¿La contraseña coincide?', resultado); // true o false
  })
  .catch(error => {
    console.error('Error al comparar:', error);
  });
