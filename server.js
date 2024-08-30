const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'config.env') });
const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/db');
const coinsController = require('./controllers/coinsController')
const usersController = require('./controllers/userController')
const contactController = require('./controllers/contactController')

const server_app = express();
const port = 3000;

connectDB()

// server_app.set('view engine', 'pug');
// server_app.set('views', path.join(__dirname, 'views'));

// server_app.use(cors(corsOptions));
// server_app.options('*', cors(corsOptions))

server_app.use(express.json()); // for req.body (enable access to data that was sent to server)
server_app.use(cors())

//middlewares
server_app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})
server_app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

server_app.use('/coins', coinsController)
server_app.use('/users', usersController);
server_app.use('/contacts', contactController);

server_app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
});

