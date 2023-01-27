const express = require('express');
const mongoose = require('mongoose');
const { registerUser, userLogin } = require('./controllers/users');
const {
  validateUserRegistry,
  validateUserLogin,
} = require('./middleware/validation');
const routes = require('./routes/index');
const { errors } = require('celebrate');
const errorHandler = require('./middleware/errorHandler');

const { PORT = 3000, HOST = 'localhost' } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/smart-travel-app');

app.use(express.json());

app.post('/users/register', validateUserRegistry, registerUser);

app.post('/users/login', validateUserLogin, userLogin);

app.use(routes);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, HOST, () => console.log(`Listening on ${HOST}:${PORT}!`));
