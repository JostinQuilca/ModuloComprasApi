// src/config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Lee las variables de entorno para conexión
const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  // Opcionalmente: DB_SCHEMA, DB_DIALECT si fuese necesario
} = process.env;

// Crea la instancia de Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: false, // O true si quieres ver logs SQL
  // schema: DB_SCHEMA, // si usas un schema específico
  define: {
    // Opciones globales para todos los modelos
    // Para evitar pluralización automática si no se desea:
    freezeTableName: false, // o true si quieres que el nombre de tabla sea exactamente igual al modelo
    timestamps: false,     // Por defecto, activamos manualmente en cada modelo si es necesario
  },
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}
//testConnection();

module.exports = sequelize;
