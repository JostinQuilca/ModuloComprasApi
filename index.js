const express = require('express');
const serverless = require('serverless-http');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../src/docs/swaggerConfig');
const app = require('../src/app');

// Cargar la documentación Swagger desde aquí
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Exportar como handler para Vercel
module.exports = serverless(app);
