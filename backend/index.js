if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const nocache = require('nocache');
const sequelize  = require('sequelize');

//Initoalization
const app = express();
require('./database/database');

//Setting
app.set('port', process.env.PORT || 8080);

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))//Iterpretar datos de formulario como obejtos JSON
app.use(express.json()) //Interpretar peticiones al servidor
app.use(nocache())
//Routes
app.use('/api/movements', require('./routes/movements.routes.js'));
app.use('/api/users', require('./routes/users.routes.js'));

//Static files
app.use(express.static(path.join(__dirname, 'public')))

//Start the server
app.listen(app.get('port'), async() => {
    console.log('Server on port', app.get('port'));
    try {
        await sequelize.authenticate;
        console.log('DB is connected');
      } catch (error) {
        console.error("DB NOT connected | ERROR |", error);
      }
});