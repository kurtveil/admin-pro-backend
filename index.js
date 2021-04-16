
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConection } = require('./database/config');

// Crear servidor express
const app = express();

// Configurar cors
app.use( cors() );

// Base de datos
dbConection();

// Rutas
app.get( '/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })

});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT)
});

