# MediApp1

## Requisitos
- Node.js 18+
- NPM
- MySQL

## Instalación

### Backend
1. `cd backend-mediapp`
2. `npm install`
3. Copiar `.env.example` a `.env` y configurar variables de base de datos y `JWT_SECRET`.
4. `node app.js` o `npx nodemon app.js`

### Frontend
1. En la raíz del proyecto: `npm install`
2. `ionic serve` para desarrollo

## Uso
- La API quedará disponible en `http://localhost:3000/api` por defecto.
- La aplicación Ionic usa dicha URL configurada en los archivos de entorno.
