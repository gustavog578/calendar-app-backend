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

//public directory
app.use( express.static('public') );

// Body Parser
app.use( express.json() );


//routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


//listen
app.listen( process.env.PORT, () => {
    console.log(`Server on port ${ process.env.PORT }`)
})