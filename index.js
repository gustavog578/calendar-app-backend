const express = require('express');
const { dbConnection } = require('./database/config');
const events = require('./routes/events')
require('dotenv').config();
const cors = require('cors');
//crear server

const app = express();

//Base de datos
dbConnection();

app.use( cors() );

//Directorio public
app.use( express.static('public') );

// Body Parser
app.use( express.json() );


//rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));



//TODO: CRUD Eventos

//escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Server on port ${ process.env.PORT }`)
})